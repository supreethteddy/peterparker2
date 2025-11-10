
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'ri-home-line', label: 'Home' },
    { path: '/history', icon: 'ri-time-line', label: 'History' },
    { path: '/support', icon: 'ri-customer-service-line', label: 'Support' },
    { path: '/profile', icon: 'ri-user-line', label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center space-y-1 ${
              location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <i className={`${item.icon} text-lg`}></i>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
