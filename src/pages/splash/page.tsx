import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import splashScreen1 from '../../assets/splash-screen-1.png';
import splashScreen2 from '../../assets/splash-screen-2.png';
import splashScreen3 from '../../assets/splash-screen-3.png';
import logoDesign from '../../assets/Logo-design.svg';

export default function SplashPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState(0);
  
  // Check if this is accessed via /splash route (for testing/preview)
  const isDirectAccess = location.pathname === '/splash';

  const slides = [
    {
      id: '01',
      title: 'Anywhere you are',
      description: 'Find verified valet parking services wherever you go. No more circling blocks or worrying about finding a spot.',
      illustration: splashScreen1,
    },
    {
      id: '02',
      title: 'At anytime',
      description: '24/7 valet service available round the clock. Book a valet whenever you need, day or night.',
      illustration: splashScreen2,
    },
    {
      id: '03',
      title: 'Book your car',
      description: 'Quick and easy booking. Let our verified valets handle your parking while you focus on what matters.',
      illustration: splashScreen3,
    }
  ];

  const finish = useCallback(() => {
    const isOnboarded = localStorage.getItem('userOnboarded') === 'true';
    const isAuthed = localStorage.getItem('userAuthenticated') === 'true';
    
    if (!isOnboarded) {
      navigate('/welcome');
    } else if (!isAuthed) {
      navigate('/login');
    } else {
      navigate('/home');
    }
  }, [navigate]);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  // Auto-advance after 5 seconds if user doesn't interact (only for root path)
  useEffect(() => {
    if (isDirectAccess) {
      // If accessed via /splash, don't auto-advance - allow manual navigation
      return;
    }
    
    const timer = setTimeout(() => {
      if (index < slides.length - 1) {
        setIndex(index + 1);
      } else {
        finish();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, finish, isDirectAccess]);

  // Check if user should skip splash screens (only for root path, not /splash)
  useEffect(() => {
    if (isDirectAccess) {
      // If accessed via /splash, don't auto-redirect - allow viewing
      return;
    }
    
    const isOnboarded = localStorage.getItem('userOnboarded') === 'true';
    const isAuthed = localStorage.getItem('userAuthenticated') === 'true';
    
    if (isOnboarded && isAuthed) {
      navigate('/home');
    }
  }, [navigate, isDirectAccess]);

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom flex flex-col">
      {/* Status Bar Area */}
      <div className="flex items-center justify-between px-6 pt-safe-top pb-2">
        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900 rounded-sm" style={{ width: '65%' }}></div>
          </div>
          <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
          <div className="w-6 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900 rounded-sm m-0.5" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* Logo and Skip Button Container */}
      <div className="px-6 mb-4 flex items-center justify-between pt-safe-top">
        <img 
          src={logoDesign} 
          alt="quickParker Logo" 
          className="h-14 w-36 object-cover"
        />
        <button 
          onClick={finish} 
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-all duration-200"
        >
          Skip
        </button>
      </div>

      {/* Illustration - Takes more space */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-4">
        <img 
          src={slides[index].illustration} 
          alt={slides[index].title}
          className="w-full max-w-md h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-6 mb-6">
        <h1 className="text-3xl font-bold text-[#0F1415] mb-3 tracking-tight">
          {slides[index].title}
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          {slides[index].description}
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center justify-center space-x-2 mb-6 px-6">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-gradient-to-r from-[#34C0CA] to-[#66BD59]' : 'w-2 bg-neutral-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation Button - Bottom Right */}
      <div className="px-6 pb-safe-bottom mb-6">
        <div className="flex justify-end">
          <button
            onClick={next}
            className="w-16 h-16 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
          >
            {index < slides.length - 1 ? (
              <ChevronRight className="w-6 h-6 text-white" />
            ) : (
              <span className="text-white font-bold text-sm">Go</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

