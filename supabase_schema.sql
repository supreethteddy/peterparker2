-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  name text, -- Alias for display name
  email text unique,
  phone text unique,
  country_code text,
  gender text check (gender in ('male', 'female', 'other')),
  avatar_url text,
  role text default 'user' check (role in ('user', 'partner')),
  status text default 'offline', -- online, offline, ontrip, suspended
  is_online boolean default false,
  kyc_status text default 'pending' check (kyc_status in ('pending', 'approved', 'rejected')),
  city text,
  zone text,
  is_onboarded boolean default false,
  onboarding_status text default 'pending',
  insurance_enabled boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile." on profiles for insert with check (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    new.email,
    new.phone
  );
  
  -- Create empty wallet for user
  insert into public.wallets (user_id, balance) values (new.id, 0);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Vehicles Table
create table if not exists public.vehicles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  make text not null,
  model text not null,
  year integer,
  license_plate text not null,
  type text not null check (type in ('car', 'bike')),
  is_primary boolean default false,
  insurance_doc_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for vehicles
alter table public.vehicles enable row level security;
create policy "Users can view own vehicles." on vehicles for select using (auth.uid() = user_id);
create policy "Users can insert own vehicles." on vehicles for insert with check (auth.uid() = user_id);
create policy "Users can update own vehicles." on vehicles for update using (auth.uid() = user_id);
create policy "Users can delete own vehicles." on vehicles for delete using (auth.uid() = user_id);

-- 3. Wallets Table
create table if not exists public.wallets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  balance numeric(10, 2) default 0.00 not null check (balance >= 0),
  currency text default 'INR' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.wallets enable row level security;
create policy "Users can view own wallet." on wallets for select using (auth.uid() = user_id);
create policy "Users can update own wallet." on wallets for update using (auth.uid() = user_id);

-- 4. Payment Methods Table
create table if not exists public.payment_methods (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'UPI', 'Debit Card', 'Credit Card', 'Net Banking'
  provider text, -- 'Google Pay', 'PhonePe', 'HDFC', etc.
  details jsonb, -- e.g. { "upi_id": "user@upi" } or { "last4": "1234" }
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payment_methods enable row level security;
create policy "Users can view own payment methods." on payment_methods for select using (auth.uid() = user_id);
create policy "Users can manage own payment methods." on payment_methods for all using (auth.uid() = user_id);

-- 5. Wallet Transactions Table
create table if not exists public.wallet_transactions (
  id uuid default uuid_generate_v4() primary key,
  wallet_id uuid references public.wallets(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  type text not null check (type in ('credit', 'debit')),
  status text not null check (status in ('pending', 'completed', 'failed')),
  description text,
  reference_id text, -- payment gateway tx id
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.wallet_transactions enable row level security;
create policy "Users can view own transactions." on wallet_transactions
  for select using (
    wallet_id in (select id from public.wallets where user_id = auth.uid())
  );
create policy "Users can insert own transactions." on wallet_transactions
  for insert with check (
    wallet_id in (select id from public.wallets where user_id = auth.uid())
  );

-- 6. Bookings (Valet Sessions) Table — UNIFIED schema
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  partner_id uuid references auth.users on delete set null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  vehicle_number text,
  vehicle_type text,
  status text not null check (status in ('searching', 'accepted', 'valet_enroute_pickup', 'valet_arrived_pickup', 'valet_enroute_drop', 'parked', 'valet_enroute_return', 'completed', 'cancelled')),
  pickup_location text not null,
  parking_location text,
  cost numeric(10, 2),
  distance text,
  duration text,
  started_at timestamp with time zone default timezone('utc'::text, now()),
  parked_at timestamp with time zone,
  ended_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Function to handle booking settlement
create or replace function public.handle_booking_settlement()
returns trigger as $$
declare
  user_wallet_id uuid;
  partner_wallet_id uuid;
begin
  if new.status = 'completed' and old.status <> 'completed' then
    -- Get user wallet
    select id into user_wallet_id from public.wallets where user_id = new.user_id;
    
    -- Get partner wallet
    select id into partner_wallet_id from public.wallets where user_id = new.partner_id;
    
    if user_wallet_id is not null and partner_wallet_id is not null and new.cost > 0 then
      -- 1. Debit user
      update public.wallets set balance = balance - new.cost where id = user_wallet_id;
      insert into public.wallet_transactions (wallet_id, amount, type, status, description, reference_id)
      values (user_wallet_id, new.cost, 'debit', 'completed', 'Payment for booking #' || new.id, new.id::text);
      
      -- 2. Credit partner
      update public.wallets set balance = balance + new.cost where id = partner_wallet_id;
      insert into public.wallet_transactions (wallet_id, amount, type, status, description, reference_id)
      values (partner_wallet_id, new.cost, 'credit', 'completed', 'Earnings from booking #' || new.id, new.id::text);
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for booking settlement
drop trigger if exists on_booking_completed on public.bookings;
create trigger on_booking_completed
  after update on public.bookings
  for each row execute procedure public.handle_booking_settlement();

alter table public.bookings enable row level security;
-- Users can view their own bookings
create policy "Users can view own bookings." on bookings for select using (auth.uid() = user_id);
-- Partners can view bookings assigned to them OR bookings that are searching
create policy "Partners can view assigned or searching bookings." on bookings for select using (auth.uid() = partner_id or status = 'searching');
-- Users can create bookings
create policy "Users can create own bookings." on bookings for insert with check (auth.uid() = user_id);
-- Involved parties can update bookings
create policy "Involved parties can update bookings." on bookings for update using (auth.uid() = user_id or auth.uid() = partner_id);

-- 7. Parking Locations (Partner's managed spots)
create table if not exists public.parking_locations (
  id uuid default uuid_generate_v4() primary key,
  partner_id uuid references auth.users on delete cascade,
  name text,
  address text,
  total_slots integer default 0,
  available_slots integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.parking_locations enable row level security;
create policy "Parking locations are viewable by everyone." on parking_locations for select using (true);
create policy "Partners can manage their own locations." on parking_locations for all using (auth.uid() = partner_id);

-- 8. Support Tickets
create table if not exists public.support_tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  subject text,
  category text,
  description text,
  status text default 'open' check (status in ('open', 'resolved', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.support_tickets enable row level security;
create policy "Users can manage their own tickets." on support_tickets for all using (auth.uid() = user_id);

-- 9. Messages (Chat)
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references public.bookings on delete cascade,
  sender_id uuid references auth.users on delete cascade,
  text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;
create policy "Messages are viewable by involved parties." on messages for select using (
  exists (
    select 1 from bookings 
    where bookings.id = messages.booking_id 
    and (bookings.user_id = auth.uid() or bookings.partner_id = auth.uid())
  )
);
create policy "Users can insert their own messages." on messages for insert with check (auth.uid() = sender_id);

-- Real-time publication
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table messages;

-- 10. Partners Table (Mock data for valets)
create table if not exists public.partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  rating numeric(2,1) default 4.8,
  reviews integer default 0,
  eta text default '5 min',
  vehicle text default 'Bike',
  distance text default '1.0km',
  verified boolean default true,
  status text default 'online',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.partners enable row level security;
create policy "Anyone can view online partners." on partners for select using (status = 'online');

-- Insert mock partners
insert into public.partners (name, rating, reviews, eta, vehicle, distance, verified) values
  ('Rajesh Kumar', 4.9, 531, '3 min', 'Bike', '800m', true),
  ('Amit Sharma', 4.8, 423, '5 min', 'Bike', '1.2km', true),
  ('Vikram Singh', 4.9, 312, '7 min', 'Walk', '1.5km', true)
on conflict do nothing;
