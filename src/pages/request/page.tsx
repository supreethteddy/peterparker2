
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { MapPin } from 'lucide-react';

export default function RequestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const locationData = location.state;
  const [pickupPoint, setPickupPoint] = useState(locationData?.from || 'Current Location');
  const [dropPoint, setDropPoint] = useState(locationData?.to || '');
  const [insurance, setInsurance] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmRequest = () => {
    // Navigate to searching for valet
    navigate('/searching-valet', { 
      state: { 
        from: pickupPoint,
        to: dropPoint,
        insurance 
      } 
    });
  };

  // Load location data from localStorage if not in state
  useEffect(() => {
    if (!locationData?.from || !locationData?.to) {
      const savedLocation = localStorage.getItem('bookingLocation');
      if (savedLocation) {
        try {
          const loc = JSON.parse(savedLocation);
          setPickupPoint(loc.from || 'Current Location');
          setDropPoint(loc.to || '');
        } catch (e) {
          console.error('Error parsing location data:', e);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header 
        title="Request Valet"
        onLeftClick={() => navigate('/home')}
      />

      <div className="pt-20 px-4 pb-6">
        {!showConfirm ? (
          <>
            {/* Selected Valet - Only show if valet exists */}
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

            {/* Pickup Point */}
            <Card className="p-4 mb-4">
              <h3 className="font-semibold text-[#0F1415] mb-3">Pickup Point</h3>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
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

            {/* Drop Point */}
            <Card className="p-4 mb-4">
              <h3 className="font-semibold text-[#0F1415] mb-3">Drop Point</h3>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
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

            {/* Insurance Add-on */}
            <Card className="p-4 mb-6">
              <div 
                onClick={() => setInsurance(!insurance)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold text-[#0F1415]">Vehicle Protection</h3>
                  <p className="text-sm text-neutral-600">₹20 coverage for damages</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  insurance ? 'border-[#66BD59] bg-[#66BD59]' : 'border-neutral-300'
                }`}>
                  {insurance && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            </Card>

            {/* Price Breakdown */}
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
              disabled={!dropPoint}
              fullWidth
              size="lg"
              className="text-lg font-bold"
            >
              Request Valet Service
            </Button>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#66BD59] to-[#52A547] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F1415] mb-2">Request Confirmed!</h2>
            <p className="text-neutral-600 mb-6">
              {valet?.name || 'Valet'} is on the way
            </p>
            
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 font-semibold">ETA</span>
                <span className="font-bold text-[#66BD59] text-lg">{valet?.eta || '5 min'}</span>
              </div>
            </Card>

            <div className="animate-pulse">
              <p className="text-sm text-neutral-500">Preparing handover screen...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
