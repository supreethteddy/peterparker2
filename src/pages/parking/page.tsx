import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import logoDesign from '../../assets/Logo-design.svg';
import { HiLocationMarker, HiClock, HiShieldCheck } from 'react-icons/hi';
import { FaCarSide } from 'react-icons/fa';
import { HiArrowLeft } from 'react-icons/hi';

export default function ParkingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valetState = location.state?.valet;
  const bookingState = location.state?.booking;

  const [booking, setBooking] = useState<any>(bookingState);
  const [valet, setValet] = useState<any>(valetState);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showExtendOptions, setShowExtendOptions] = useState(false);
  const [parkingLocation, setParkingLocation] = useState(bookingState?.parking_location || '');

  // Fetch active session if not provided via state
  useEffect(() => {
    const fetchActiveSession = async () => {
      if (bookingState) return;
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userData.user.id)
        .in('status', ['valet_enroute_drop', 'parked'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setBooking(data);
        if (data.parking_location) {
          setParkingLocation(data.parking_location);
        }
      }
    };
    fetchActiveSession();
  }, [bookingState]);

  // Real-time subscription to track booking changes (partner marking as parked, etc.)
  useEffect(() => {
    if (!booking?.id) return;

    const channel = supabase
      .channel(`parking-booking-${booking.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${booking.id}`,
        },
        (payload: any) => {
          const updated = payload.new;
          setBooking(updated);
          if (updated.parking_location) {
            setParkingLocation(updated.parking_location);
          }
          if (updated.status === 'valet_enroute_return') {
            navigate('/return', { state: { valet, booking: updated, parkingLocation: updated.parking_location } });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [booking?.id, valet, navigate]);

  // Timer logic based on parked_at
  useEffect(() => {
    let timer: any;
    if (booking?.status === 'parked' && booking?.parked_at) {
      const updateTimer = () => {
        const parkedTime = new Date(booking.parked_at).getTime();
        const now = new Date().getTime();
        const diffInSeconds = Math.floor((now - parkedTime) / 1000);

        const baseTime = 30 * 60; // 30 mins
        const remaining = Math.max(0, baseTime - diffInSeconds);
        setTimeLeft(remaining);
      };

      updateTimer();
      timer = setInterval(updateTimer, 1000);
    } else {
      setTimeLeft(30 * 60);
    }

    return () => clearInterval(timer);
  }, [booking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExtendStay = async (minutes: number) => {
    // In a real app, charge the wallet, update `cost` and `parked_at` or `extensions` array
    // Here we'll just fake it by moving parked_at forward in time
    if (booking?.id) {
      const currentParkedAt = new Date(booking.parked_at || new Date());
      // Moving parked_at into the future extends the remaining time
      currentParkedAt.setMinutes(currentParkedAt.getMinutes() + minutes);

      const { data } = await supabase
        .from('bookings')
        .update({ parked_at: currentParkedAt.toISOString(), cost: (booking.cost || 80) + minutes })
        .eq('id', booking.id)
        .select()
        .single();

      if (data) setBooking(data);
    }
    setShowExtendOptions(false);
  };

  const handleReturnRequest = () => {
    navigate('/return', { state: { valet, booking, parkingLocation } });
  };

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
