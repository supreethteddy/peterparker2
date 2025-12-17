import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaCarSide } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';

export default function ValetEnroutePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [eta, setEta] = useState(10);
  const [distance, setDistance] = useState(800);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          navigate('/handover', { state: { valet, ...location.state } });
          return 0;
        }
        return prev - 1;
      });
      setDistance(prev => Math.max(0, prev - 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    navigate('/calling', { state: { valet } });
  };

  const handleMessage = () => {
    navigate('/message', { state: { valet } });
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this request?')) {
      navigate('/home');
    }
  };

  if (!valet) {
    navigate('/home');
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
            <FaCarSide className="w-8 h-8 text-[#66BD59]" />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <Header 
          title="Your Peter Parker is coming"
          onLeftClick={() => navigate('/confirm-pickup')}
        />
      </div>

      <div className="absolute top-20 left-0 right-0 z-10 px-4">
        <Card className="p-4 bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-1">Your driver is coming in</p>
            <p className="text-3xl font-bold text-[#66BD59]">
              {formatTime(eta)}
            </p>
            <p className="text-xs text-neutral-500 mt-1">{distance}m away</p>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100">
          <div className="px-6 pt-6 pb-6">
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {valet.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#0F1415] mb-1">{valet.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <span>⭐ {valet.rating} ({valet.reviews} reviews)</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <FaCarSide className="w-6 h-6 text-[#66BD59]" />
                </div>
              </div>
            </Card>

            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3">
                <HiLocationMarker className="w-5 h-5 text-[#66BD59] flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-neutral-600 mb-1">Pickup location</p>
                  <p className="font-semibold text-[#0F1415]">{location.state?.pickupLocation || 'Current Location'}</p>
                </div>
                <button
                  onClick={() => navigate('/select-location')}
                  className="text-[#66BD59] text-sm font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
            </Card>

            <div className="flex gap-3 mb-4">
              <Button
                onClick={handleCall}
                variant="secondary"
                className="flex-1"
              >
                <HiPhone className="w-5 h-5 mr-2" />
                Call
              </Button>
              <Button
                onClick={handleMessage}
                className="flex-1"
              >
                <BiMessageDetail className="w-5 h-5 mr-2" />
                Message
              </Button>
            </div>

            <Button
              onClick={handleCancel}
              variant="secondary"
              fullWidth
              className="text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444]/10"
            >
              Cancel Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
