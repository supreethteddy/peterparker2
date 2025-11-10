
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

export default function ReturnPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { valet, parkingLocation } = location.state || {};
  const [eta, setEta] = useState('8 min');
  const [newPickupPoint, setNewPickupPoint] = useState('');
  const [showLocationChange, setShowLocationChange] = useState(false);
  const [distanceCharge, setDistanceCharge] = useState(0);

  useEffect(() => {
    // Simulate ETA updates
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
    setDistanceCharge(30); // Additional charge for distance
    setShowLocationChange(false);
  };

  const handleCarArrived = () => {
    navigate('/payment', { 
      state: { 
        valet, 
        parkingLocation, 
        distanceCharge,
        totalTime: 45 // minutes
      } 
    });
  };

  if (!valet) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Return Request"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/parking')}
      />

      <div className="pt-20 px-4 pb-6">
        {/* Return Status */}
        <Card className="p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-car-line text-blue-600 text-2xl"></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">Car Return Requested</h2>
          <p className="text-gray-600">{valet.name} is bringing your car back</p>
        </Card>

        {/* ETA Card */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="ri-time-line text-blue-600 text-xl"></i>
              <div>
                <h3 className="font-medium">Estimated Arrival</h3>
                <p className="text-sm text-gray-600">Your valet is en route</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{eta}</p>
            </div>
          </div>
        </Card>

        {/* Live Tracking */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Live Tracking</h3>
          <div className="h-40 bg-gray-200 rounded-lg relative overflow-hidden">
            <img 
              src="https://readdy.ai/api/search-image?query=Live%20GPS%20tracking%20map%20showing%20route%20from%20parking%20to%20pickup%20location%2C%20modern%20navigation%20interface%2C%20clear%20path%20markers%20and%20location%20pins&width=400&height=160&seq=tracking1&orientation=landscape"
              alt="Live tracking"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <div className="bg-white px-2 py-1 rounded text-xs font-medium shadow">
                📍 Valet Location
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                🎯 Your Location
              </div>
            </div>
          </div>
        </Card>

        {/* Valet Info */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src={valet.photo}
              alt={valet.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{valet.name}</h3>
              <p className="text-sm text-gray-600">⭐ {valet.rating} • Returning from {parkingLocation?.split(' - ')[0]}</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              <i className="ri-phone-line mr-1"></i>
              Call
            </button>
          </div>
        </Card>

        {/* Pickup Location */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="ri-map-pin-line text-green-600 text-xl"></i>
              <div>
                <h3 className="font-medium">Pickup Location</h3>
                <p className="text-sm text-gray-600">
                  {newPickupPoint || 'Original drop-off location'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleLocationChange}
              className="text-blue-600 text-sm"
            >
              Change
            </button>
          </div>
          {distanceCharge > 0 && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                Additional distance charge: ₹{distanceCharge}
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleCarArrived} className="w-full py-4">
            Car Arrived - Complete Return
          </Button>
          <Button variant="outline" className="w-full py-3">
            <i className="ri-message-line mr-2"></i>
            Message Valet
          </Button>
        </div>

        {/* Location Change Modal */}
        {showLocationChange && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
            <div className="bg-white w-full rounded-t-2xl p-6">
              <h3 className="font-semibold mb-4">Change Pickup Location</h3>
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Enter new pickup address"
                  value={newPickupPoint}
                  onChange={(e) => setNewPickupPoint(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Additional charges may apply for distance changes
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
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
    </div>
  );
}
