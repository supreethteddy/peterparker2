
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';
import { APP_NAME } from '../../config';

export default function HomePage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [showValets, setShowValets] = useState(false);
  const [selectedValet, setSelectedValet] = useState<any>(null);

  useEffect(() => {
    const isOnboarded = localStorage.getItem('userOnboarded') === 'true';
    const isAuthed = localStorage.getItem('userAuthenticated') === 'true';
    if (!isOnboarded) navigate('/onboarding');
    else if (!isAuthed) navigate('/login');
  }, [navigate]);

  const valets = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 4.8,
      eta: '3 min',
      distance: '0.5 km',
      vehicle: 'Honda City',
      verified: true,
      photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20valet%20driver%20in%20uniform%2C%20friendly%20smile%2C%20standing%20next%20to%20car%2C%20realistic%20portrait%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=valet1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Suresh Patel',
      rating: 4.9,
      eta: '5 min',
      distance: '0.8 km',
      vehicle: 'Maruti Swift',
      verified: true,
      photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20valet%20driver%20in%20uniform%2C%20confident%20pose%2C%20standing%20next%20to%20car%2C%20realistic%20portrait%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=valet2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Amit Singh',
      rating: 4.7,
      eta: '7 min',
      distance: '1.2 km',
      vehicle: 'Hyundai i20',
      verified: true,
      photo: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20valet%20driver%20in%20uniform%2C%20friendly%20expression%2C%20standing%20next%20to%20car%2C%20realistic%20portrait%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=valet3&orientation=squarish'
    }
  ];

  const handleFindValet = () => {
    setShowValets(true);
  };

  const handleSelectValet = (valet: any) => {
    setSelectedValet(valet);
    navigate('/request', { state: { valet } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 pt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-blue-600" style={{ fontFamily: "'Pacifico', cursive" }}>{APP_NAME}</h2>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-notification-line text-gray-600"></i>
          </button>
        </div>
        <div className="mt-2">
          <h1 className="text-xl font-semibold">Hello, Arjun!</h1>
          <p className="text-gray-600">Where do you need valet service?</p>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-64 bg-gray-200 mx-4 rounded-xl overflow-hidden">
        <img 
          src="https://readdy.ai/api/search-image?query=Bangalore%20city%20map%20view%20with%20location%20pins%2C%20modern%20urban%20area%2C%20streets%20and%20buildings%20visible%2C%20satellite%20view%20style%2C%20clean%20and%20detailed&width=400&height=256&seq=map1&orientation=landscape"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-medium">📍 Current Location</p>
          </div>
        </div>
      </div>

      {/* Location Input */}
      <div className="px-4 mt-6">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <i className="ri-map-pin-line text-blue-600 text-xl"></i>
            <input
              type="text"
              placeholder="Enter destination or tap 'I'm here'"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 text-base focus:outline-none"
            />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleFindValet} className="py-4">
            <i className="ri-map-pin-user-line mr-2"></i>
            I'm Here
          </Button>
          <Button variant="outline" className="py-4">
            <i className="ri-time-line mr-2"></i>
            Schedule
          </Button>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="px-4 mt-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Service Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Pickup</span>
              <span className="font-medium">₹40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Drop</span>
              <span className="font-medium">₹40</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Base Price</span>
                <span className="font-semibold text-blue-600">₹80</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Includes 30 min short stay</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Available Valets */}
      {showValets && (
        <div className="px-4 mt-6">
          <h3 className="font-semibold mb-4">Available Peter Parkers</h3>
          <div className="space-y-3">
            {valets.map((valet) => (
              <Card key={valet.id} className="p-4" onClick={() => handleSelectValet(valet)}>
                <div className="flex items-center space-x-3">
                  <img 
                    src={valet.photo}
                    alt={valet.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{valet.name}</h4>
                      {valet.verified && (
                        <i className="ri-verified-badge-fill text-green-500 text-sm"></i>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>⭐ {valet.rating}</span>
                      <span>🚗 {valet.vehicle}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{valet.eta}</p>
                    <p className="text-xs text-gray-500">{valet.distance}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="h-20"></div>
      <BottomNav />
    </div>
  );
}
