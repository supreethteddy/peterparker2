import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import splashScreen1 from '../../assets/splash-screen-1.png';
import splashScreen2 from '../../assets/splash-screen-2.png';
import splashScreen3 from '../../assets/splash-screen-3.png';
import logoDesign from '../../assets/Logo-design.svg';

export default function SplashPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState(0);
  
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

  useEffect(() => {
    if (isDirectAccess) {
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

  useEffect(() => {
    if (isDirectAccess) {
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

      <div className="relative flex-1 flex items-center justify-center px-6 py-4">
        <img 
          src={slides[index].illustration} 
          alt={slides[index].title}
          className="w-full max-w-md h-full object-contain"
        />
      </div>

      <div className="px-6 mb-6">
        <h1 className="text-3xl font-bold text-[#0F1415] mb-3 tracking-tight">
          {slides[index].title}
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          {slides[index].description}
        </p>
      </div>

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

      <div className="px-6 pb-safe-bottom mb-6">
        <div className="flex justify-end">
          <button
            onClick={next}
            className="w-16 h-16 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
          >
            {index < slides.length - 1 ? (
              <HiChevronRight className="w-6 h-6 text-white" />
            ) : (
              <span className="text-white font-bold text-sm">Go</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
