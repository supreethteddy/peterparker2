import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiLocationMarker, HiX } from 'react-icons/hi';

export default function SearchingValetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location.state;
  const bookingId = locationData?.bookingId;
  const [searchTime, setSearchTime] = useState(0);
  const [booking, setBooking] = useState<any>(null);

  // Timer for search duration display
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time subscription to watch for driver acceptance
  useEffect(() => {
    if (!bookingId) return;

    // Fetch initial booking state
    const fetchBooking = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();
      if (data) {
        setBooking(data);
        // If already accepted, navigate immediately
        if (data.status === 'accepted' && data.partner_id) {
          navigateToAssigned(data);
        }
      }
    };
    fetchBooking();

    // Subscribe to real-time changes on this booking
    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${bookingId}`,
        },
        (payload: any) => {
          const updated = payload.new;
          setBooking(updated);

          // Driver accepted the booking
          if (updated.status === 'accepted' && updated.partner_id) {
            navigateToAssigned(updated);
          }
          // Booking was cancelled
          if (updated.status === 'cancelled') {
            navigate('/error/driver-cancelled');
          }
        }
      )
      .subscribe();

    // Auto-cancel after 5 minutes if no driver found
    const timeout = setTimeout(async () => {
      await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('status', 'searching');
      navigate('/error/no-valets');
    }, 5 * 60 * 1000);

    return () => {
      supabase.removeChannel(channel);
      clearTimeout(timeout);
    };
  }, [bookingId]);

  const navigateToAssigned = async (bookingData: any) => {
    // Fetch partner/valet profile details
    let valetInfo = null;
    if (bookingData.partner_id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', bookingData.partner_id)
        .single();
      if (profile) {
        valetInfo = {
          id: profile.id,
          name: profile.name || profile.full_name || 'Valet Driver',
          rating: 4.8,
          reviews: 150,
          eta: '5 min',
          vehicle: 'Bike',
          distance: '1.2km',
          verified: true,
        };
      }
    }

    navigate('/valet-assigned', {
      state: {
        valet: valetInfo || { name: 'Valet Driver', rating: 4.8, reviews: 150, eta: '5 min', vehicle: 'Bike', verified: true },
        booking: bookingData,
        ...locationData
      }
    });
  };

  const handleCancel = async () => {
    if (bookingId) {
      await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
    }
    navigate('/home');
  };

  const formatSearchTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen bg-neutral-100 safe-top safe-bottom">
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Bangalore%20city%20map%20view%20with%20location%20pins%2C%20modern%20urban%20area%2C%20streets%20and%20buildings%20visible%2C%20satellite%20view%20style%2C%20clean%20and%20detailed&width=800&height=1200&seq=map1&orientation=portrait"
          alt="Map"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 w-8 h-8 bg-[#66BD59] rounded-full animate-ping opacity-75"></div>
            <div className="relative w-8 h-8 bg-white rounded-full border-4 border-[#66BD59] shadow-lg"></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-[#66BD59]"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleCancel}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <HiX className="w-5 h-5 text-[#0F1415]" />
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100">
          <div className="px-6 pt-6 pb-6">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <HiLocationMarker className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F1415] mb-2">
                Finding a Peter Parker near you...
              </h2>
              <p className="text-neutral-600 mb-2">
                Searching for available valets
              </p>
              <p className="text-sm text-neutral-500 mb-4">
                Search time: {formatSearchTime(searchTime)}
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>

              {booking && (
                <Card className="p-4 mb-4 text-left">
                  <div className="flex items-center gap-3">
                    <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500">Pickup</p>
                      <p className="text-sm font-semibold text-[#0F1415]">{booking.pickup_location}</p>
                    </div>
                  </div>
                </Card>
              )}

              <Button
                onClick={handleCancel}
                variant="secondary"
                fullWidth
              >
                Cancel Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
