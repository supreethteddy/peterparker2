import { useNavigate, useLocation } from 'react-router-dom';
import { IoHomeSharp, IoHome } from 'react-icons/io5';
import { RiParkingBoxFill, RiParkingBoxLine } from 'react-icons/ri';
import { IoWallet, IoWalletOutline } from 'react-icons/io5';
import { HiGift, HiOutlineGift } from 'react-icons/hi2';
import { FaUserCircle, FaRegUserCircle } from 'react-icons/fa';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', iconFilled: IoHomeSharp, iconOutline: IoHome, label: 'Home' },
    { path: '/parking-list', iconFilled: RiParkingBoxFill, iconOutline: RiParkingBoxLine, label: 'Parking' },
    { path: '/wallet', iconFilled: IoWallet, iconOutline: IoWalletOutline, label: 'Wallet' },
    { path: '/promotions', iconFilled: HiGift, iconOutline: HiOutlineGift, label: 'Offers' },
    { path: '/profile', iconFilled: FaUserCircle, iconOutline: FaRegUserCircle, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 z-50 safe-bottom shadow-[0_-8px_32px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-5 h-20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.iconFilled : item.iconOutline;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 ${
                isActive ? 'text-[#66BD59]' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <div className={`relative transition-all duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                <Icon className={`transition-all duration-300 ${isActive ? 'w-7 h-7 text-[#66BD59] drop-shadow-sm' : 'w-6 h-6 text-neutral-400'}`} />
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full animate-pulse"></div>
                )}
              </div>
              <span className={`text-xs tracking-wide transition-all duration-300 ${isActive ? 'font-bold text-[#66BD59]' : 'font-medium text-neutral-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
