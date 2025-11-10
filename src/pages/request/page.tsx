
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

export default function RequestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [pickupPoint, setPickupPoint] = useState('Current Location');
  const [dropPoint, setDropPoint] = useState('');
  const [insurance, setInsurance] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmRequest = () => {
    setShowConfirm(true);
    setTimeout(() => {
      navigate('/handover', { state: { valet } });
    }, 3000);
  };

  if (!valet) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Request Valet"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/')}
      />

      <div className="pt-20 px-4 pb-6">
        {!showConfirm ? (
          <>
            {/* Selected Valet */}
            <Card className="p-4 mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={valet.photo}
                  alt={valet.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{valet.name}</h3>
                    <i className="ri-verified-badge-fill text-green-500"></i>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>⭐ {valet.rating}</span>
                    <span>🚗 {valet.vehicle}</span>
                    <span>📍 {valet.eta}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">DL Verified</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Police Verified</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pickup Point */}
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-3">Pickup Point</h3>
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-green-600 text-xl"></i>
                <div className="flex-1">
                  <p className="font-medium">{pickupPoint}</p>
                  <p className="text-sm text-gray-600">Koramangala 5th Block, Bangalore</p>
                </div>
                <button className="text-blue-600 text-sm">
                  <i className="ri-camera-line mr-1"></i>
                  Photo
                </button>
              </div>
            </Card>

            {/* Drop Point */}
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-3">Drop Point</h3>
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-2-line text-red-600 text-xl"></i>
                <input
                  type="text"
                  placeholder="Enter parking destination"
                  value={dropPoint}
                  onChange={(e) => setDropPoint(e.target.value)}
                  className="flex-1 text-base focus:outline-none"
                />
              </div>
            </Card>

            {/* Insurance Add-on */}
            <Card className="p-4 mb-6">
              <div 
                onClick={() => setInsurance(!insurance)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h3 className="font-medium">Vehicle Protection</h3>
                  <p className="text-sm text-gray-600">₹20 coverage for damages</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  insurance ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                }`}>
                  {insurance && <i className="ri-check-line text-white text-sm"></i>}
                </div>
              </div>
            </Card>

            {/* Price Breakdown */}
            <Card className="p-4 mb-6">
              <h3 className="font-medium mb-3">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup</span>
                  <span>₹40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Drop</span>
                  <span>₹40</span>
                </div>
                {insurance && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance</span>
                    <span>₹20</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{insurance ? 100 : 80}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button onClick={handleConfirmRequest} className="w-full py-4">
              Request Valet Service
            </Button>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-green-600 text-3xl"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">Request Confirmed!</h2>
            <p className="text-gray-600 mb-6">{valet.name} is on the way</p>
            
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ETA</span>
                <span className="font-semibold text-blue-600">{valet.eta}</span>
              </div>
            </Card>

            <div className="animate-pulse">
              <p className="text-sm text-gray-500">Preparing handover screen...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
