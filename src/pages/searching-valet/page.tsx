import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { MapPin, X } from 'lucide-react';

export default function SearchingValetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location.state;
  const [searchTime, setSearchTime] = useState(0);
  const [foundValets, setFoundValets] = useState<any[]>([]);

  useEffect(() => {
    // Simulate searching
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);

    // Simulate finding valets after 3 seconds
    setTimeout(() => {
      setFoundValets([
        {
          id: 1,
          name: 'Rajesh Kumar',
          rating: 4.9,
          reviews: 531,
          eta: '3 min',
          vehicle: 'Bike',
          distance: '800m',
          verified: true,
          photo: null
        },
        {
          id: 2,
          name: 'Amit Sharma',
          rating: 4.8,
          reviews: 423,
          eta: '5 min',
          vehicle: 'Bike',
          distance: '1.2km',
          verified: true,
          photo: null
        },
        {
          id: 3,
          name: 'Vikram Singh',
          rating: 4.9,
          reviews: 312,
          eta: '7 min',
          vehicle: 'Walk',
          distance: '1.5km',
          verified: true,
          photo: null
        }
      ]);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleCancel = () => {
    navigate('/request');
  };

  const handleSelectValet = (valet: any) => {
    navigate('/valet-assigned', { 
      state: { 
        valet,
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
        
        {/* Pulsing Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 w-8 h-8 bg-[#66BD59] rounded-full animate-ping opacity-75"></div>
            <div className="relative w-8 h-8 bg-white rounded-full border-4 border-[#66BD59] shadow-lg"></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-[#66BD59]"></div>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleCancel}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <X className="w-5 h-5 text-[#0F1415]" />
          </button>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100">
          <div className="px-6 pt-6 pb-6">
            {foundValets.length === 0 ? (
              <>
                {/* Searching State */}
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F1415] mb-2">
                    Finding a Peter Parker near you...
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    Estimated wait time: 2-5 minutes
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#66BD59] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    fullWidth
                  >
                    Cancel Request
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Valets Found */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#0F1415] mb-1">
                    {foundValets.length} Peter Parkers found
                  </h2>
                  <p className="text-sm text-neutral-600">Select a valet to continue</p>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                  {foundValets.map((valet) => (
                    <Card
                      key={valet.id}
                      className="p-4 cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => handleSelectValet(valet)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                          {valet.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-[#0F1415]">{valet.name}</h3>
                            {valet.verified && (
                              <span className="text-[#66BD59] text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-1">
                            <span>⭐ {valet.rating} ({valet.reviews})</span>
                            <span>•</span>
                            <span>{valet.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-[#66BD59]/10 text-[#66BD59] px-2 py-0.5 rounded font-semibold">
                              DL Verified
                            </span>
                            <span className="text-xs bg-[#66BD59]/10 text-[#66BD59] px-2 py-0.5 rounded font-semibold">
                              Police Verified
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-[#66BD59] text-lg">{valet.eta}</p>
                          <p className="text-xs text-neutral-500">{valet.vehicle}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={handleCancel}
                  variant="outline"
                  fullWidth
                >
                  Cancel Request
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

