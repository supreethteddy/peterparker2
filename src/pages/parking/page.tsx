
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

export default function ParkingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [showExtendOptions, setShowExtendOptions] = useState(false);
  const [parkingLocation, setParkingLocation] = useState('');

  useEffect(() => {
    // Simulate parking completion
    setTimeout(() => {
      setParkingLocation('Phoenix MarketCity - Level 2, Zone B, Slot 45');
    }, 3000);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExtendStay = (minutes: number) => {
    setTimeLeft(prev => prev + (minutes * 60));
    setShowExtendOptions(false);
  };

  const handleReturnRequest = () => {
    navigate('/return', { state: { valet, parkingLocation } });
  };

  if (!valet) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Parking & Wait"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/')}
      />

      <div className="pt-20 px-4 pb-6">
        {!parkingLocation ? (
          /* Parking in Progress */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="ri-parking-line text-blue-600 text-3xl"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">Parking Your Vehicle</h2>
            <p className="text-gray-600 mb-6">{valet.name} is finding a secure parking spot</p>
            
            <Card className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        ) : (
          /* Parked Successfully */
          <>
            {/* Timer */}
            <Card className="p-6 mb-6 text-center">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{formatTime(timeLeft)}</h2>
              <p className="text-gray-600">Free time remaining</p>
              {timeLeft < 300 && (
                <p className="text-red-600 text-sm mt-1">⚠️ Less than 5 minutes left</p>
              )}
            </Card>

            {/* Parking Details */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Vehicle Parked</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-map-pin-line text-green-600 text-xl mt-1"></i>
                  <div>
                    <p className="font-medium">Parking Location</p>
                    <p className="text-sm text-gray-600">{parkingLocation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-file-text-line text-blue-600 text-xl"></i>
                  <div>
                    <p className="font-medium">Parking Receipt</p>
                    <button className="text-blue-600 text-sm">View Receipt</button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map View */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Live Location</h3>
              <div className="h-32 bg-gray-200 rounded-lg relative overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Parking%20lot%20aerial%20view%20with%20car%20location%20pin%2C%20modern%20shopping%20mall%20parking%20area%2C%20clear%20markings%20and%20organized%20layout%2C%20satellite%20view%20style&width=400&height=128&seq=parking1&orientation=landscape"
                  alt="Parking location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    📍 Your Car
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                variant="outline" 
                onClick={() => setShowExtendOptions(true)}
                className="py-3"
              >
                <i className="ri-time-line mr-2"></i>
                Extend Stay
              </Button>
              <Button 
                variant="outline" 
                className="py-3"
              >
                <i className="ri-map-line mr-2"></i>
                Change Location
              </Button>
            </div>

            {/* Return Car Button */}
            <Button onClick={handleReturnRequest} className="w-full py-4 mb-6">
              <i className="ri-car-line mr-2"></i>
              Return My Car
            </Button>

            {/* Extend Stay Options */}
            {showExtendOptions && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
                <div className="bg-white w-full rounded-t-2xl p-6">
                  <h3 className="font-semibold mb-4">Extend Your Stay</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { time: 15, price: 25 },
                      { time: 30, price: 50 },
                      { time: 60, price: 90 }
                    ].map((option) => (
                      <button
                        key={option.time}
                        onClick={() => handleExtendStay(option.time)}
                        className="w-full p-4 border border-gray-200 rounded-lg text-left hover:border-blue-600"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">+{option.time} minutes</span>
                          <span className="text-blue-600">₹{option.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowExtendOptions(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Overtime Warning */}
            {timeLeft === 0 && (
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="flex items-center space-x-3">
                  <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
                  <div>
                    <h3 className="font-medium text-red-800">Overtime Charges Apply</h3>
                    <p className="text-sm text-red-600">₹10 per 10 minutes after free time</p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
