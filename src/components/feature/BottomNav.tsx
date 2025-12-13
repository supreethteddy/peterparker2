import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Car, Wallet, Tag, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/parking-list', icon: Car, label: 'Parking' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/promotions', icon: Tag, label: 'Offer' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 z-50 safe-bottom shadow-[0_-8px_32px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-5 h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1.5 transition-all duration-200 ${
                isActive ? 'text-[#66BD59]' : 'text-neutral-500'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
                <Icon className={`w-6 h-6 ${isActive ? 'text-[#66BD59]' : 'text-neutral-500'}`} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#66BD59] rounded-full"></div>
                )}
              </div>
              <span className={`text-xs font-bold tracking-wide ${isActive ? 'text-[#66BD59]' : 'text-neutral-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
