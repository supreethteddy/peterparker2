import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { MapPin, Camera } from 'lucide-react';

export default function ConfirmPickupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const locationData = location.state;

  const [pickupPhoto, setPickupPhoto] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState(locationData?.from || 'Current Location');

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPickupPhoto(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleConfirm = () => {
    navigate('/valet-enroute', { 
      state: { 
        valet,
        pickupLocation,
        pickupPhoto,
        ...locationData 
      } 
    });
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
        
        {/* Pickup Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-8 h-8 bg-white rounded-full border-4 border-[#66BD59] shadow-lg"></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-[#66BD59]"></div>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <Header 
          title="Confirm Pickup Point"
          onLeftClick={() => navigate('/valet-assigned')}
        />
      </div>

      {/* Bottom Card */}
      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100">
          <div className="px-6 pt-6 pb-6">
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-[#0F1415]">{pickupLocation}</p>
                  <p className="text-sm text-neutral-600">Drag pin to adjust location</p>
                </div>
                <button
                  onClick={() => navigate('/select-location')}
                  className="text-[#66BD59] text-sm font-semibold hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Photo Upload */}
              <div className="border-t border-neutral-200 pt-4">
                <button
                  onClick={handlePhotoUpload}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-neutral-300 rounded-xl hover:border-[#66BD59] transition-colors"
                >
                  <Camera className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm font-semibold text-neutral-600">
                    {pickupPhoto ? 'Change Photo' : 'Upload Pickup Location Photo (Optional)'}
                  </span>
                </button>
                {pickupPhoto && (
                  <div className="mt-3 relative">
                    <img 
                      src={pickupPhoto} 
                      alt="Pickup location" 
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            </Card>

            <Button
              onClick={handleConfirm}
              fullWidth
              size="lg"
              className="text-lg font-bold"
            >
              Confirm Pickup Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

