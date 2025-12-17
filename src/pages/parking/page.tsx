import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import logoDesign from '../../assets/Logo-design.svg';
import { HiLocationMarker, HiClock, HiShieldCheck } from 'react-icons/hi';
import { FaCarSide } from 'react-icons/fa';
import { HiArrowLeft } from 'react-icons/hi';

export default function ParkingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const parkingLocationFromState = location.state?.parkingLocation;
  const timeLeftFromState = location.state?.timeLeft;
  
  const [timeLeft, setTimeLeft] = useState(timeLeftFromState || 30 * 60);
  const [showExtendOptions, setShowExtendOptions] = useState(false);
  const [parkingLocation, setParkingLocation] = useState(parkingLocationFromState || '');

  useEffect(() => {
    if (!parkingLocationFromState) {
      setTimeout(() => {
        const parkingLoc = 'Phoenix MarketCity - Level 2, Zone B, Slot 45';
        setParkingLocation(parkingLoc);
        
        if (valet) {
          const savedParking = localStorage.getItem('parkingSessions');
          const sessions = savedParking ? JSON.parse(savedParking) : [];
          const existingSession = sessions.find((s: any) => 
            s.status === 'ongoing' && s.valet?.name === valet.name
          );
          
          if (!existingSession) {
            const newSession = {
              id: Date.now(),
              valet: valet,
              parkingLocation: parkingLoc,
              startTime: new Date().toISOString(),
              timeLeft: timeLeft,
              status: 'ongoing',
              pickupLocation: location.state?.pickupLocation || location.state?.from || '',
              dropLocation: location.state?.dropLocation || location.state?.to || ''
            };
            sessions.push(newSession);
            localStorage.setItem('parkingSessions', JSON.stringify(sessions));
          }
        }
      }, 3000);
    } else {
      const savedParking = localStorage.getItem('parkingSessions');
      if (savedParking && valet) {
        const sessions = JSON.parse(savedParking);
        const updatedSessions = sessions.map((session: any) => {
          if (session.status === 'ongoing' && session.valet?.name === valet.name) {
            return {
              ...session,
              parkingLocation: parkingLocationFromState,
              timeLeft: timeLeftFromState || session.timeLeft
            };
          }
          return session;
        });
        localStorage.setItem('parkingSessions', JSON.stringify(updatedSessions));
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        const newTime = prev <= 0 ? 0 : prev - 1;
        
        const savedParking = localStorage.getItem('parkingSessions');
        if (savedParking && valet) {
          const sessions = JSON.parse(savedParking);
          const updatedSessions = sessions.map((session: any) => {
            if (session.status === 'ongoing' && session.valet?.name === valet.name) {
              return {
                ...session,
                timeLeft: newTime
              };
            }
            return session;
          });
          localStorage.setItem('parkingSessions', JSON.stringify(updatedSessions));
        }
        
        if (newTime <= 0) {
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [parkingLocationFromState, valet, timeLeftFromState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExtendStay = (minutes: number) => {
    setTimeLeft((prev: number) => prev + (minutes * 60));
    setShowExtendOptions(false);
    
    const savedParking = localStorage.getItem('parkingSessions');
    if (savedParking) {
      const sessions = JSON.parse(savedParking);
      const updatedSessions = sessions.map((session: any) => {
        if (session.status === 'ongoing' && session.valet?.name === valet?.name) {
          return {
            ...session,
            timeLeft: timeLeft + (minutes * 60)
          };
        }
        return session;
      });
      localStorage.setItem('parkingSessions', JSON.stringify(updatedSessions));
    }
  };

  const handleReturnRequest = () => {
    navigate('/return', { state: { valet, parkingLocation } });
  };

  useEffect(() => {
    if (!valet) {
      const savedParking = localStorage.getItem('parkingSessions');
      if (savedParking) {
        const sessions = JSON.parse(savedParking);
        const ongoingSession = sessions.find((s: any) => s.status === 'ongoing');
        if (ongoingSession) {
          setParkingLocation(ongoingSession.parkingLocation || '');
          setTimeLeft(ongoingSession.timeLeft || 30 * 60);
        }
      }
    }
  }, [valet]);

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Logo and Back Button */}
      <div className="px-6 mb-4 flex items-center justify-between pt-2">
        <button
          onClick={() => navigate('/parking-list')}
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold flex items-center gap-2"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back
        </button>
        <img 
          src={logoDesign} 
          alt="quickParker Logo" 
          className="h-14 w-36 object-cover"
        />
      </div>

      <div className="px-6 pb-6">
        {!parkingLocation ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <FaCarSide className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F1415] mb-2">Parking in progress...</h2>
            <p className="text-neutral-600 mb-6">{valet?.name || 'Valet'} is finding a secure parking spot</p>
            
            <Card className="p-4 bg-white border border-neutral-200">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <Card className="p-6 mb-6 text-center">
              <h2 className="text-4xl font-bold text-[#66BD59] mb-2">
                {formatTime(timeLeft)}
              </h2>
              <p className="text-neutral-600 font-semibold">Free time remaining</p>
              {timeLeft < 300 && (
                <p className="text-[#EF4444] text-sm mt-2 font-semibold">⚠️ Less than 5 minutes left</p>
              )}
            </Card>

            <Card className="p-4 mb-6 bg-white border border-neutral-200">
              <h3 className="font-bold text-[#0F1415] mb-4">Vehicle Parked</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F1415] mb-1">Parking Location</p>
                    <p className="text-sm text-neutral-600">{parkingLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HiShieldCheck className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F1415] mb-1">Parking Receipt</p>
                    <button className="text-[#66BD59] text-sm font-semibold hover:underline">
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 mb-6 bg-white border border-neutral-200">
              <h3 className="font-semibold mb-3 text-[#0F1415]">Live Location</h3>
              <div className="h-32 bg-gray-200 rounded-lg relative overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Parking%20lot%20aerial%20view%20with%20car%20location%20pin%2C%20modern%20shopping%20mall%20parking%20area%2C%20clear%20markings%20and%20organized%20layout%2C%20satellite%20view%20style&width=400&height=128&seq=parking1&orientation=landscape"
                  alt="Parking location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    📍 Your Car
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl p-[2px] bg-gradient-to-r from-[#34C0CA] to-[#66BD59]">
                <button 
                  onClick={() => setShowExtendOptions(true)}
                  className="w-full h-full bg-white rounded-[10px] px-4 py-3 font-semibold text-[#0F1415] flex items-center justify-center hover:bg-neutral-50 transition-all min-h-[48px]"
                >
                  <HiClock className="w-5 h-5 mr-2" />
                  Extend Stay
                </button>
              </div>
              <div className="rounded-xl p-[2px] bg-gradient-to-r from-[#34C0CA] to-[#66BD59]">
                <button 
                  onClick={() => navigate('/select-location')}
                  className="w-full h-full bg-white rounded-[10px] px-4 py-3 font-semibold text-[#0F1415] flex items-center justify-center hover:bg-neutral-50 transition-all min-h-[48px]"
                >
                  <HiLocationMarker className="w-5 h-5 mr-2" />
                  Change Location
                </button>
              </div>
            </div>

            <Button 
              onClick={handleReturnRequest} 
              fullWidth
              size="lg"
              className="text-lg font-bold mb-6"
            >
              <FaCarSide className="w-5 h-5 mr-2" />
              Return My Car
            </Button>

            {showExtendOptions && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 safe-bottom">
                <div className="bg-white w-full rounded-t-3xl p-6 shadow-[0_-8px_32px_rgba(0,0,0,0.2)]">
                  <h3 className="text-xl font-bold text-[#0F1415] mb-4">Extend Your Stay</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { time: 15, price: 25 },
                      { time: 30, price: 50 },
                      { time: 60, price: 90 }
                    ].map((option) => (
                      <button
                        key={option.time}
                        onClick={() => handleExtendStay(option.time)}
                        className="w-full p-4 border-2 border-neutral-200 rounded-xl text-left hover:border-[#66BD59] transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#0F1415]">+{option.time} minutes</span>
                          <span className="font-bold text-[#66BD59]">
                            ₹{option.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowExtendOptions(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {timeLeft === 0 && (
              <Card className="p-4 bg-gradient-to-r from-[#EF4444]/10 to-[#EF4444]/5 border-2 border-[#EF4444]/20">
                <div className="flex items-center gap-3">
                  <HiShieldCheck className="w-5 h-5 text-[#EF4444]" />
                  <div>
                    <h3 className="font-semibold text-[#EF4444]">Overtime Charges Apply</h3>
                    <p className="text-sm text-[#EF4444]">₹10 per 10 minutes after free time</p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
