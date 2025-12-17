import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiLocationMarker, HiX } from 'react-icons/hi';

interface RecentPlace {
  name: string;
  address: string;
  distance: string;
}

export default function SelectLocationPage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('Current Location');
  const [to, setTo] = useState('');
  const [showFromOptions, setShowFromOptions] = useState(false);
  const [showToOptions, setShowToOptions] = useState(false);

  const recentPlaces: RecentPlace[] = [
    { name: 'Office', address: '123 Business Street', distance: '2.7km' },
    { name: 'Coffee shop', address: '456 Main Avenue', distance: '1.1km' },
    { name: 'Shopping center', address: '789 Mall Road', distance: '4.8km' },
    { name: 'Shopping mall', address: '321 Plaza Street', distance: '4.0km' },
  ];

  const handleConfirm = () => {
    if (from && to) {
      // Save location data and navigate to request page
      localStorage.setItem('bookingLocation', JSON.stringify({ from, to }));
      navigate('/request', { state: { from, to } });
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-100 safe-top safe-bottom">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://readdy.ai/api/search-image?query=Bangalore%20city%20map%20view%20with%20location%20pins%2C%20modern%20urban%20area%2C%20streets%20and%20buildings%20visible%2C%20satellite%20view%20style%2C%20clean%20and%20detailed&width=800&height=1200&seq=map1&orientation=portrait"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <HiX className="w-5 h-5 text-[#0F1415]" />
          </button>
        </div>
      </div>

      {/* Bottom Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <h2 className="text-xl font-bold text-[#0F1415]">Select address</h2>
            <button
              onClick={() => navigate('/home')}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-[#0F1415]"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 pb-6 space-y-4">
            {/* From Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <HiLocationMarker className="w-5 h-5 text-[#66BD59]" />
              </div>
              <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => setShowFromOptions(true)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-[#66BD59] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#66BD59]/10 focus:border-[#66BD59] text-base bg-white"
              />
              {showFromOptions && (
                <Card className="absolute top-full left-0 right-0 mt-2 p-4 z-20 shadow-xl">
                  <button
                    onClick={() => {
                      setFrom('Current Location');
                      setShowFromOptions(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <HiLocationMarker className="w-5 h-5 text-[#66BD59]" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[#0F1415]">Current location</p>
                    </div>
                  </button>
                </Card>
              )}
            </div>

            {/* Recent Places (when not focused) */}
            {!showToOptions && !showFromOptions && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-neutral-600 mb-2">Recent places</p>
                <div className="space-y-2">
                  {recentPlaces.map((place, index) => (
                    <button
                      key={index}
                      onClick={() => setTo(`${place.name} - ${place.address}`)}
                      className="w-full flex items-center gap-3 p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors text-left"
                    >
                      <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0F1415]">{place.name}</p>
                        <p className="text-sm text-neutral-600 truncate">{place.address}</p>
                      </div>
                      <span className="text-sm text-neutral-500 whitespace-nowrap">{place.distance}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <Button
              onClick={handleConfirm}
              disabled={!from || !to}
              fullWidth
              size="lg"
              className="mt-6"
              icon="check"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
