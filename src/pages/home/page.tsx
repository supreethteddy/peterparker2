import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';
import LogoDesign from '../../assets/Logo-design.svg';
import { Bell, Car, MapPin, Clock, Shield, Sparkles, TrendingUp, Zap, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [userName] = useState('Arjun');
  const [activeParking, setActiveParking] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const isOnboarded = localStorage.getItem('userOnboarded') === 'true';
    const isAuthed = localStorage.getItem('userAuthenticated') === 'true';
    if (!isOnboarded) navigate('/welcome');
    else if (!isAuthed) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const checkActiveParking = () => {
      const savedParking = localStorage.getItem('parkingSessions');
      if (savedParking) {
        const sessions = JSON.parse(savedParking);
        const ongoing = sessions.find((s: any) => s.status === 'ongoing');
        if (ongoing) {
          setActiveParking(ongoing);
          setTimeLeft(ongoing.timeLeft || 0);
        } else {
          setActiveParking(null);
          setTimeLeft(0);
        }
      } else {
        setActiveParking(null);
        setTimeLeft(0);
      }
    };

    checkActiveParking();

    const timer = setInterval(() => {
      if (activeParking) {
        setTimeLeft(prev => {
          const newTime = Math.max(0, prev - 1);
          const savedParking = localStorage.getItem('parkingSessions');
          if (savedParking) {
            const sessions = JSON.parse(savedParking);
            const updatedSessions = sessions.map((s: any) =>
              s.status === 'ongoing' && s.id === activeParking.id
                ? { ...s, timeLeft: newTime }
                : s
            );
            localStorage.setItem('parkingSessions', JSON.stringify(updatedSessions));
          }
          return newTime;
        });
      } else {
        checkActiveParking();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeParking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'book':
        navigate('/select-location');
        break;
      case 'return':
        if (activeParking) {
          navigate('/return', {
            state: {
              valet: activeParking.valet,
              parkingLocation: activeParking.parkingLocation
            }
          });
        } else {
          navigate('/parking-list');
        }
        break;
      case 'parking':
        navigate('/parking-list');
        break;
    }
  };

  const quickActions = [
    {
      id: 'book',
      title: 'Book Valet',
      subtitle: 'Instant Pickup',
      icon: Car,
      gradient: 'from-[#34C0CA] to-[#66BD59]',
    },
    {
      id: 'return',
      title: 'Request Return',
      subtitle: activeParking ? 'Get your vehicle' : 'No active session',
      icon: MapPin,
      gradient: 'from-[#66BD59] to-[#34C0CA]',
      disabled: !activeParking,
    },
    {
      id: 'parking',
      title: 'My Parking',
      subtitle: 'View history',
      icon: Clock,
      gradient: 'from-[#34C0CA] via-[#66BD59] to-[#34C0CA]',
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
            <Bell className="w-5 h-5 text-[#34C0CA]" />
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
                <h2 className="text-lg font-semibold text-[#0F1415]">Your Vehicle Is Parked</h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E8F6E9] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#66BD59]" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 text-[#34C0CA]" />
                <p>{activeParking.parkingLocation || 'Phoenix MarketCity'}</p>
              </div>

              <div className="p-3 bg-[#F4FBF8] rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">Free Time Left</p>
                  <p className="text-xl font-bold text-[#34C0CA]">{formatTime(timeLeft)}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate('/parking', { state: activeParking })}
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
                className="bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white rounded-xl shadow-lg"
              >
                Book Valet
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
                  onClick={() => handleQuickAction(action.id)}
                  disabled={action.disabled}
                  className={`p-4 bg-white border border-[#E8F3EF] rounded-xl shadow-sm flex flex-col items-center text-center 
                    transition active:scale-95 ${action.disabled ? 'opacity-50' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-2 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-bold text-[#0F1415]">{action.title}</p>
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
            <Sparkles className="w-4 h-4 text-[#34C0CA]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <Shield className="w-4 h-4 text-[#34C0CA] mb-1" />
              <p className="text-xs font-bold">Fully Insured</p>
              <p className="text-[11px] text-neutral-500">Your vehicle is protected</p>
            </div>
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <Zap className="w-4 h-4 text-[#66BD59] mb-1" />
              <p className="text-xs font-bold">Fast Pickup</p>
              <p className="text-[11px] text-neutral-500">Quick & reliable service</p>
            </div>
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <TrendingUp className="w-4 h-4 text-[#34C0CA] mb-1" />
              <p className="text-xs font-bold">30 Min Free</p>
              <p className="text-[11px] text-neutral-500">Complimentary parking time</p>
            </div>
            <div className="p-3 bg-[#F8FDFC] border border-[#E8F3EF] rounded-xl">
              <MapPin className="w-4 h-4 text-[#66BD59] mb-1" />
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
            View All <ArrowRight className="w-3 h-3" />
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
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </Card>

      </div>

      <BottomNav />
    </div>
  );
}
