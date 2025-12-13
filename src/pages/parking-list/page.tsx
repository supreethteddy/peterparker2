import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';
import logoDesign from '../../assets/Logo-design.svg';
import { Car, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ParkingListPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [parkingSessions, setParkingSessions] = useState<any[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Load parking sessions from localStorage
    const savedParking = localStorage.getItem('parkingSessions');
    if (savedParking) {
      setParkingSessions(JSON.parse(savedParking));
    } else {
      // Sample data for demo
      const sampleSessions = [
        {
          id: 1,
          valet: {
            name: 'Rajesh Kumar',
            photo: 'https://i.pravatar.cc/150?img=12',
            rating: 4.8
          },
          parkingLocation: 'Phoenix MarketCity - Level 2, Zone B, Slot 45',
          startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
          timeLeft: 15 * 60, // 15 minutes in seconds
          status: 'ongoing',
          pickupLocation: '123 Main Street',
          dropLocation: 'Phoenix MarketCity'
        },
        {
          id: 2,
          valet: {
            name: 'Suresh Patel',
            photo: 'https://i.pravatar.cc/150?img=13',
            rating: 4.9
          },
          parkingLocation: 'UB City Mall - Level 1, Zone A, Slot 12',
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          timeLeft: 0,
          status: 'completed',
          pickupLocation: '456 Park Avenue',
          dropLocation: 'UB City Mall',
          completedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          totalAmount: 120
        }
      ];
      setParkingSessions(sampleSessions);
      localStorage.setItem('parkingSessions', JSON.stringify(sampleSessions));
    }
  }, []);

  // Update ongoing parking timers
  useEffect(() => {
    const timer = setInterval(() => {
      setParkingSessions(prev => {
        const updated = prev.map(session => {
          if (session.status === 'ongoing' && session.timeLeft > 0) {
            return {
              ...session,
              timeLeft: Math.max(0, session.timeLeft - 1)
            };
          }
          return session;
        });
        localStorage.setItem('parkingSessions', JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const filteredSessions = parkingSessions.filter(session => {
    if (activeTab === 'ongoing') return session.status === 'ongoing';
    if (activeTab === 'completed') return session.status === 'completed';
    return true;
  });

  const handleParkingClick = (session: any) => {
    if (session.status === 'ongoing') {
      navigate('/parking', { 
        state: { 
          valet: session.valet,
          parkingLocation: session.parkingLocation,
          timeLeft: session.timeLeft,
          pickupLocation: session.pickupLocation,
          dropLocation: session.dropLocation
        } 
      });
    } else {
      // For completed sessions, show details
      navigate('/trip-details', { state: { trip: session } });
    }
  };

  const ongoingCount = parkingSessions.filter(s => s.status === 'ongoing').length;
  const completedCount = parkingSessions.filter(s => s.status === 'completed').length;

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Logo */}
      <div className="px-6 mb-4 flex items-center justify-center pt-2">
        <img 
          src={logoDesign} 
          alt="quickParker Logo" 
          className="h-14 w-36 object-cover"
        />
      </div>

      <div className="px-6 pb-24">
        <h1 className="text-3xl font-bold text-[#0F1415] mb-6 tracking-tight">
          My Parking
        </h1>

        {/* Tab Switcher */}
        <div className="flex bg-neutral-100 rounded-xl p-1 mb-6">
          {[
            { key: 'ongoing', label: 'Ongoing', count: ongoingCount },
            { key: 'completed', label: 'Completed', count: completedCount }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-[#0F1415] shadow-sm'
                  : 'text-neutral-600'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Parking Sessions List */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <Card 
              key={session.id} 
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => handleParkingClick(session)}
            >
              <div className="flex items-start gap-4">
                {/* Valet Photo */}
                <div className="flex-shrink-0">
                  {session.valet.photo && !imageErrors.has(session.id) ? (
                    <img 
                      src={session.valet.photo} 
                      alt={session.valet.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#66BD59]/20"
                      onError={() => {
                        setImageErrors(prev => new Set(prev).add(session.id));
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white flex items-center justify-center font-bold text-lg border-2 border-[#66BD59]/20">
                      {session.valet.name.split(' ').map((n: string) => n.charAt(0)).join('').toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-[#0F1415] text-lg mb-1">
                        {session.valet.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <span>⭐ {session.valet.rating}</span>
                        <span>•</span>
                        <span>{formatDate(session.startTime)}</span>
                      </div>
                    </div>
                    {session.status === 'ongoing' ? (
                      <span className="px-3 py-1 bg-[#66BD59]/10 text-[#66BD59] rounded-full text-xs font-semibold flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-pulse"></div>
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Parking Location */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#66BD59] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-600 flex-1">
                      {session.parkingLocation}
                    </p>
                  </div>

                  {/* Time Left or Completed Info */}
                  {session.status === 'ongoing' ? (
                    <div className="flex items-center gap-2 p-3 bg-[#66BD59]/5 rounded-lg border border-[#66BD59]/20">
                      <Clock className="w-5 h-5 text-[#66BD59]" />
                      <div className="flex-1">
                        <p className="text-xs text-neutral-600 mb-1">Free time remaining</p>
                        <p className="text-xl font-bold text-[#66BD59]">
                          {formatTime(session.timeLeft)}
                        </p>
                      </div>
                      {session.timeLeft < 300 && (
                        <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Total Amount</p>
                        <p className="text-lg font-bold text-[#0F1415]">₹{session.totalAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-600 mb-1">Completed</p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {formatDate(session.completedAt || session.startTime)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#66BD59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-10 h-10 text-[#66BD59]" />
            </div>
            <h3 className="font-bold text-[#0F1415] text-lg mb-2">
              No {activeTab === 'ongoing' ? 'ongoing' : 'completed'} parking
            </h3>
            <p className="text-neutral-600 text-sm mb-6">
              {activeTab === 'ongoing' 
                ? 'You don\'t have any active parking sessions' 
                : 'You haven\'t completed any parking sessions yet'}
            </p>
            {activeTab === 'ongoing' && (
              <button
                onClick={() => navigate('/select-location')}
                className="px-6 py-3 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-[#2BA8B2] hover:to-[#52A547]"
              >
                Book Valet Service
              </button>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

