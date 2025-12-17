import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaCarSide } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';

export default function ReturnPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { valet, parkingLocation } = location.state || {};
  const [eta, setEta] = useState('8 min');
  const [newPickupPoint, setNewPickupPoint] = useState('');
  const [showLocationChange, setShowLocationChange] = useState(false);
  const [distanceCharge, setDistanceCharge] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => {
        const current = parseInt(prev);
        if (current > 1) {
          return `${current - 1} min`;
        }
        return '1 min';
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleLocationChange = () => {
    setShowLocationChange(true);
  };

  const handleConfirmLocationChange = () => {
    setDistanceCharge(30);
    setShowLocationChange(false);
  };

  const handleCarArrived = () => {
    navigate('/payment', { 
      state: { 
        valet, 
        parkingLocation, 
        distanceCharge,
        totalTime: 45
      } 
    });
  };

  if (!valet) {
    navigate('/');
    return null;
  }

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

        <div className="absolute top-[45%] left-[60%] z-10">
          <div className="relative">
            <FaCarSide className="w-8 h-8 text-[#34C0CA]" />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <Header 
          title="Car Return"
          onLeftClick={() => navigate('/parking')}
        />
      </div>

      <div className="absolute top-20 left-0 right-0 z-10 px-4">
        <Card className="p-4 bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-1">Your car is on the way</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[#34C0CA] to-[#66BD59] bg-clip-text text-transparent">
              {eta}
            </p>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100">
          <div className="px-6 pt-6 pb-6">
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {valet.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0F1415] mb-1">{valet.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <span>⭐ {valet.rating}</span>
                    <span>•</span>
                    <span>Returning from {parkingLocation?.split(' - ')[0] || 'Parking'}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Pickup location</p>
                    <p className="font-semibold text-[#0F1415]">
                      {newPickupPoint || 'Current Location'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleLocationChange}
                  className="text-[#34C0CA] text-sm font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
              {distanceCharge > 0 && (
                <div className="mt-3 p-3 bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 rounded-xl border border-[#F59E0B]/20">
                  <p className="text-sm font-semibold text-[#F59E0B]">
                    Additional distance charge: ₹{distanceCharge}
                  </p>
                </div>
              )}
            </Card>

            <div className="flex gap-3 mb-4">
              <Button
                onClick={() => navigate('/calling', { state: { valet } })}
                variant="secondary"
                className="flex-1"
              >
                <HiPhone className="w-5 h-5 mr-2" />
                Call
              </Button>
              <Button
                onClick={() => navigate('/message', { state: { valet } })}
                className="flex-1"
              >
                <BiMessageDetail className="w-5 h-5 mr-2" />
                Message
              </Button>
            </div>

            <Button
              onClick={handleCarArrived}
              fullWidth
              size="lg"
              icon="check"
            >
              Car Arrived - Complete Return
            </Button>
          </div>
        </div>
      </div>

      {showLocationChange && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 safe-bottom">
          <div className="bg-white w-full rounded-t-3xl p-6 shadow-[0_-8px_32px_rgba(0,0,0,0.2)]">
            <h3 className="text-xl font-bold text-[#0F1415] mb-4">Change Pickup Location</h3>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Enter new pickup address"
                value={newPickupPoint}
                onChange={(e) => setNewPickupPoint(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/10 focus:border-[#34C0CA] text-base"
              />
              <div className="p-3 bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 rounded-xl border border-[#F59E0B]/20">
                <p className="text-sm font-semibold text-[#F59E0B]">
                  ⚠️ Additional charges may apply for distance changes
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowLocationChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmLocationChange}
                disabled={!newPickupPoint}
                className="flex-1"
              >
                Confirm Change
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
