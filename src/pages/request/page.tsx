import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiLocationMarker } from 'react-icons/hi';

export default function RequestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const locationData = location.state;
  const [pickupPoint, setPickupPoint] = useState(locationData?.from || 'Current Location');
  const [dropPoint, setDropPoint] = useState(locationData?.to || '');
  const [insurance, setInsurance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmRequest = async () => {
    setIsSubmitting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        alert('You must be logged in to book a valet');
        setIsSubmitting(false);
        return;
      }

      // Create the booking in Supabase with status 'searching'
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: userData.user.id,
          status: 'searching',
          pickup_location: pickupPoint,
          parking_location: dropPoint || null,
          cost: insurance ? 100 : 80,
          vehicle_type: 'car',
        }])
        .select()
        .single();

      if (error) {
        alert('Failed to create booking: ' + error.message);
        setIsSubmitting(false);
        return;
      }

      // Navigate to searching page with the booking ID
      navigate('/searching-valet', {
        state: {
          bookingId: booking.id,
          from: pickupPoint,
          to: dropPoint,
          insurance
        }
      });
    } catch (err) {
      alert('An error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header
        title="Request Valet"
        onLeftClick={() => navigate('/home')}
      />

      <div className="pt-20 px-4 pb-6">
        {valet && (
          <Card className="p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-2xl font-bold">
                {valet.name?.charAt(0) || 'V'}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-[#0F1415]">{valet.name || 'Valet Driver'}</h3>
                  <span className="text-[#66BD59]">✓</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-neutral-600 mt-1">
                  <span>⭐ {valet.rating || '4.8'}</span>
                  <span>🚗 {valet.vehicle || 'Car'}</span>
                  <span>📍 {valet.eta || '5 min'}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-[#66BD59]/10 text-[#66BD59] px-2 py-1 rounded font-semibold">DL Verified</span>
                  <span className="text-xs bg-[#66BD59]/10 text-[#66BD59] px-2 py-1 rounded font-semibold">Police Verified</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 mb-4">
          <h3 className="font-semibold text-[#0F1415] mb-3">Pickup Point</h3>
          <div className="flex items-center gap-3">
            <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-[#0F1415]">{pickupPoint}</p>
              <p className="text-sm text-neutral-600">Current location</p>
            </div>
            <button
              onClick={() => navigate('/select-location')}
              className="text-[#66BD59] text-sm font-semibold hover:underline"
            >
              Change
            </button>
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h3 className="font-semibold text-[#0F1415] mb-3">Drop Point</h3>
          <div className="flex items-center gap-3">
            <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
            <div className="flex-1">
              {dropPoint ? (
                <>
                  <p className="font-medium text-[#0F1415]">{dropPoint}</p>
                  <p className="text-sm text-neutral-600">Parking destination</p>
                </>
              ) : (
                <p className="text-neutral-500">No destination selected</p>
              )}
            </div>
            <button
              onClick={() => navigate('/select-location')}
              className="text-[#66BD59] text-sm font-semibold hover:underline"
            >
              {dropPoint ? 'Change' : 'Select'}
            </button>
          </div>
        </Card>

        <Card className="p-4 mb-6">
          <div
            onClick={() => setInsurance(!insurance)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div>
              <h3 className="font-semibold text-[#0F1415]">Vehicle Protection</h3>
              <p className="text-sm text-neutral-600">₹20 coverage for damages</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${insurance ? 'border-[#66BD59] bg-[#66BD59]' : 'border-neutral-300'
              }`}>
              {insurance && <span className="text-white text-xs">✓</span>}
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-[#0F1415] mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-600">Pickup</span>
              <span className="font-semibold">₹40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Drop</span>
              <span className="font-semibold">₹40</span>
            </div>
            {insurance && (
              <div className="flex justify-between">
                <span className="text-neutral-600">Insurance</span>
                <span className="font-semibold">₹20</span>
              </div>
            )}
            <div className="border-t border-neutral-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-[#0F1415]">Total</span>
                <span className="text-[#66BD59]">
                  ₹{insurance ? 100 : 80}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Button
          onClick={handleConfirmRequest}
          disabled={!dropPoint || isSubmitting}
          fullWidth
          size="lg"
          icon="arrow-right"
        >
          {isSubmitting ? 'Creating Request...' : 'Request Valet Service'}
        </Button>
      </div>
    </div>
  );
}
