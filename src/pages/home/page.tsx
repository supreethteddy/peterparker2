import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';
import LogoDesign from '../../assets/Logo-design.svg';
import { IoNotifications } from 'react-icons/io5';
import { FaCarSide } from 'react-icons/fa';
import { TbArrowBack } from 'react-icons/tb';
import { RiParkingBoxFill } from 'react-icons/ri';
import { HiLocationMarker, HiClock, HiShieldCheck, HiSparkles, HiLightningBolt, HiTrendingUp, HiArrowRight } from 'react-icons/hi';

export default function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Arjun');
  const [activeParking, setActiveParking] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, onboarding_status')
        .eq('id', session.user.id)
        .single();

      if (profile?.onboarding_status !== 'completed') {
        navigate('/welcome');
        return;
      }

      if (profile?.full_name) {
        setUserName(profile.full_name);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    let userId: string | null = null;

    const fetchActiveBooking = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;
      userId = userData.user.id;

      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userData.user.id)
        .in('status', ['searching', 'accepted', 'valet_enroute_pickup', 'valet_arrived_pickup', 'valet_enroute_drop', 'parked', 'valet_enroute_return'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        const booking = data[0];
        setActiveParking({
          ...booking,
          valet: null,
          parkingLocation: booking.parking_location || booking.pickup_location
        });

        if (booking.status === 'parked' && booking.parked_at) {
          const parkedTime = new Date(booking.parked_at).getTime();
          const now = new Date().getTime();
          const diffInSeconds = Math.floor((now - parkedTime) / 1000);
          const baseTime = 30 * 60; // 30 mins
          setTimeLeft(Math.max(0, baseTime - diffInSeconds));
        } else {
          setTimeLeft(30 * 60);
        }
      } else {
        setActiveParking(null);
        setTimeLeft(0);
      }
    };

    fetchActiveBooking();

    // Real-time subscription for booking changes
    const channel = supabase
      .channel('home-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        (payload: any) => {
          const updated = payload.new;
          // Only process bookings belonging to this user
          if (updated && updated.user_id === userId) {
            const activeStatuses = ['searching', 'accepted', 'valet_enroute_pickup', 'valet_arrived_pickup', 'valet_enroute_drop', 'parked', 'valet_enroute_return'];
            if (activeStatuses.includes(updated.status)) {
              setActiveParking({
                ...updated,
                valet: null,
                parkingLocation: updated.parking_location || updated.pickup_location
              });
              if (updated.status === 'parked' && updated.parked_at) {
                const parkedTime = new Date(updated.parked_at).getTime();
                const now = new Date().getTime();
                const diffInSeconds = Math.floor((now - parkedTime) / 1000);
                const baseTime = 30 * 60;
                setTimeLeft(Math.max(0, baseTime - diffInSeconds));
              }
            } else if (updated.status === 'completed' || updated.status === 'cancelled') {
              setActiveParking(null);
              setTimeLeft(0);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (activeParking?.status === 'parked' && activeParking?.parked_at) {
      timer = setInterval(() => {
        const parkedTime = new Date(activeParking.parked_at).getTime();
        const now = new Date().getTime();
        const diffInSeconds = Math.floor((now - parkedTime) / 1000);
        const baseTime = 30 * 60;
        setTimeLeft(Math.max(0, baseTime - diffInSeconds));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeParking?.status, activeParking?.parked_at]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'book':
        navigate('/select-location', { replace: false });
        break;
      case 'return':
        if (activeParking) {
          navigate('/return', {
            replace: false,
            state: {
              valet: activeParking.valet,
              parkingLocation: activeParking.parkingLocation
            }
          });
        } else {
          navigate('/parking-list', { replace: false });
        }
        break;
      case 'parking':
        navigate('/parking-list', { replace: false });
        break;
    }
  };

  const quickActions = [
    {
      id: 'book',
      title: 'Book Valet',
      subtitle: 'Instant Pickup',
      icon: FaCarSide,
      gradient: 'from-[#34C0CA] to-[#66BD59]',
      isPrimary: true,
      iconSize: 'w-6 h-6',
    },
    {
      id: 'return',
      title: 'Request Return',
      subtitle: activeParking ? 'Get your vehicle' : 'No active session',
      icon: TbArrowBack,
      gradient: 'from-[#66BD59] to-[#34C0CA]',
      disabled: !activeParking,
      isPrimary: true,
      iconSize: 'w-6 h-6',
    },
    {
      id: 'parking',
      title: 'My Parking',
      subtitle: 'View history',
      icon: RiParkingBoxFill,
      gradient: 'from-[#34C0CA] to-[#66BD59]',
      isPrimary: true,
      iconSize: 'w-6 h-6',
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7FAF8] safe-top safe-bottom">

      {/* Premium Light Header */}
      <div className="bg-white px-4 pt-safe-top pb-4 shadow-sm border-b border-[#E8F3EF]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img src={LogoDesign} alt="quickParker" className="h-12 w-28 object-cover" />

          {/* Notification */}
          <button
            onClick={() => navigate('/notifications')}
            className="w-11 h-11 rounded-full bg-[#F0F7F5] flex items-center justify-center shadow-sm active:scale-95 transition"
          >
            <IoNotifications className="w-5 h-5 text-[#34C0CA]" />
          </button>
        </div>

        <div className="mt-3 px-1">
          <p className="text-neutral-500 text-sm">Welcome back,</p>
          <h1 className="text-xl font-bold text-[#0F1415]">{userName}</h1>
        </div>
      </div>

      {/* Body Content */}
      <div className="px-4 pb-24 space-y-5 mt-3">

        {/* Active Parking */}
        {activeParking ? (
          <Card className="p-4 bg-white shadow-md border border-[#E8F3EF] rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-neutral-500">Active Parking</p>
                <h2 className="text-lg font-semibold text-[#0F1415]">
                  {activeParking.status === 'parked' ? 'Your Vehicle Is Parked' : 'Valet In Progress'}
                </h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E8F6E9] flex items-center justify-center">
                <HiShieldCheck className="w-5 h-5 text-[#66BD59]" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <HiLocationMarker className="w-4 h-4 text-[#34C0CA]" />
                <p>{activeParking.parkingLocation || 'Phoenix MarketCity'}</p>
              </div>

              <div className="p-3 bg-[#F4FBF8] rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">Free Time Left</p>
                  <p className="text-xl font-bold text-[#34C0CA]">{formatTime(timeLeft)}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    // Navigate to appropriate page based on status
                    if (['valet_assigned'].includes(activeParking.status)) {
                      navigate('/valet-assigned', { state: activeParking });
                    } else if (activeParking.status === 'valet_enroute_drop') {
                      navigate('/parking', { state: { booking: activeParking, valet: activeParking.valet } });
                    } else {
                      navigate('/parking', { state: { booking: activeParking, valet: activeParking.valet } });
                    }
                  }}
                  className="bg-[#34C0CA] text-white rounded-lg px-4 py-1.5 text-xs"
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          /* Premium Hero Booking Card */
          <Card className="p-5 bg-white shadow-md border border-[#E8F3EF] rounded-2xl relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-[#34C0CA]/20 to-[#66BD59]/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <h2 className="text-lg font-bold text-[#0F1415] mb-1">Need a Professional Valet?</h2>
              <p className="text-sm text-neutral-500 mb-4">Book a valet to pick, park & return your car safely</p>
              <Button
                onClick={() => navigate('/select-location')}
                fullWidth
                size="lg"
                icon="arrow-right"
              >
                Book Valet Now
              </Button>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-base font-bold text-[#0F1415] mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!action.disabled) {
                      handleQuickAction(action.id);
                    }
                  }}
                  disabled={action.disabled}
                  type="button"
                  className={`p-4 rounded-xl flex flex-col items-center text-center group
                    transition-all duration-200 active:scale-95 ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${action.isPrimary
                      ? 'bg-white border border-[#E8F3EF] shadow-md'
                      : 'bg-[#F8FDFC] border border-transparent'
                    }`}
                >
                  {action.isPrimary ? (
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-2 shadow-lg`}>
                      <Icon className={`${action.iconSize} text-white`} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                      <Icon className={`${action.iconSize} text-[#66BD59]`} />
                    </div>
                  )}
                  <p className={`text-xs text-[#0F1415] ${action.isPrimary ? 'font-bold' : 'font-medium'}`}>{action.title}</p>
                  <p className="text-[10px] text-neutral-500">{action.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <Card className="p-4 bg-white shadow-md border border-[#E8F3EF] rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-[#0F1415]">Why Choose Us</h3>
            <HiSparkles className="w-4 h-4 text-[#34C0CA]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <HiShieldCheck className="w-4 h-4 text-[#34C0CA] mb-1" />
              <p className="text-xs font-bold">Fully Insured</p>
              <p className="text-[11px] text-neutral-500">Your vehicle is protected</p>
            </div>
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <HiLightningBolt className="w-4 h-4 text-[#66BD59] mb-1" />
              <p className="text-xs font-bold">Fast Pickup</p>
              <p className="text-[11px] text-neutral-500">Quick & reliable service</p>
            </div>
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <HiTrendingUp className="w-4 h-4 text-[#34C0CA] mb-1" />
              <p className="text-xs font-bold">30 Min Free</p>
              <p className="text-[11px] text-neutral-500">Complimentary parking time</p>
            </div>
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <HiLocationMarker className="w-4 h-4 text-[#66BD59] mb-1" />
              <p className="text-xs font-bold">Live Tracking</p>
              <p className="text-[11px] text-neutral-500">Real-time valet updates</p>
            </div>
          </div>
        </Card>

        {/* Offers */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F1415]">Special Offers</h3>
          <button
            onClick={() => navigate('/promotions')}
            className="text-xs font-semibold text-[#34C0CA] flex items-center gap-1"
          >
            View All <HiArrowRight className="w-3 h-3" />
          </button>
        </div>

        <Card
          onClick={() => navigate('/promotions')}
          className="p-4 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white rounded-2xl shadow-md active:scale-95 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">First Ride Free</p>
              <p className="text-[11px] text-white/80">Get ₹100 off your first valet booking</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <HiSparkles className="w-5 h-5" />
            </div>
          </div>
        </Card>

      </div>

      <BottomNav />
    </div>
  );
}
