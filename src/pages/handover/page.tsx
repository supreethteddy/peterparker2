
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

export default function HandoverPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [step, setStep] = useState(1);
  const [userSelfie, setUserSelfie] = useState(false);
  const [valetSelfie, setValetSelfie] = useState(false);
  const [checklist, setChecklist] = useState({
    exteriorCheck: false,
    interiorCheck: false,
    fuelLevel: false,
    documents: false
  });

  useEffect(() => {
    if (step === 1) {
      // Simulate valet arrival
      setTimeout(() => setStep(2), 2000);
    }
  }, [step]);

  const handleSelfieVerification = () => {
    setUserSelfie(true);
    setTimeout(() => {
      setValetSelfie(true);
      setStep(3);
    }, 1500);
  };

  const handleChecklistItem = (item: string) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleCompleteHandover = () => {
    navigate('/parking', { state: { valet } });
  };

  const allChecked = Object.values(checklist).every(Boolean);

  if (!valet) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Handover"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/')}
      />

      <div className="pt-20 px-4 pb-6">
        {/* Step 1: Valet Arriving */}
        {step === 1 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="ri-car-line text-blue-600 text-3xl"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">{valet.name} is arriving</h2>
            <p className="text-gray-600 mb-6">ETA: 2 minutes</p>
            
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={valet.photo}
                  alt={valet.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{valet.name}</h3>
                  <p className="text-sm text-gray-600">⭐ {valet.rating} • {valet.vehicle}</p>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  <i className="ri-phone-line mr-1"></i>
                  Call
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Selfie Verification */}
        {step === 2 && (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">Verification Required</h2>
            <p className="text-gray-600 mb-8">Both you and the valet need to take a selfie for security</p>
            
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                    userSelfie ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    {userSelfie ? (
                      <i className="ri-check-line text-green-600 text-2xl"></i>
                    ) : (
                      <i className="ri-user-line text-gray-400 text-2xl"></i>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">Your Selfie</h3>
                    <p className="text-sm text-gray-600">
                      {userSelfie ? 'Verified ✓' : 'Tap to capture'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                    valetSelfie ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    {valetSelfie ? (
                      <i className="ri-check-line text-green-600 text-2xl"></i>
                    ) : (
                      <i className="ri-user-line text-gray-400 text-2xl"></i>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">Valet Selfie</h3>
                    <p className="text-sm text-gray-600">
                      {valetSelfie ? 'Verified ✓' : 'Waiting for valet...'}
                    </p>
                  </div>
                </div>
              </Card>

              {!userSelfie && (
                <Button onClick={handleSelfieVerification} className="w-full py-4">
                  <i className="ri-camera-line mr-2"></i>
                  Take Selfie
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Digital Handover Checklist */}
        {step === 3 && (
          <div className="py-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Vehicle Handover</h2>
            <p className="text-gray-600 mb-6 text-center">Complete the checklist with your valet</p>
            
            <div className="space-y-4 mb-6">
              {[
                { key: 'exteriorCheck', label: 'Exterior Condition Check', icon: 'ri-car-line' },
                { key: 'interiorCheck', label: 'Interior Condition Check', icon: 'ri-steering-2-line' },
                { key: 'fuelLevel', label: 'Fuel Level Noted', icon: 'ri-gas-station-line' },
                { key: 'documents', label: 'Documents Verified', icon: 'ri-file-text-line' }
              ].map((item) => (
                <Card key={item.key} className="p-4">
                  <div 
                    onClick={() => handleChecklistItem(item.key)}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      checklist[item.key as keyof typeof checklist] ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      <i className={`${item.icon} text-xl ${
                        checklist[item.key as keyof typeof checklist] ? 'text-white' : 'text-gray-500'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.label}</h3>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      checklist[item.key as keyof typeof checklist] ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {checklist[item.key as keyof typeof checklist] && (
                        <i className="ri-check-line text-white text-sm"></i>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-blue-600"></i>
                <span className="text-blue-800 font-medium">30-minute timer starts after handover</span>
              </div>
            </div>

            <Button 
              onClick={handleCompleteHandover}
              disabled={!allChecked}
              className="w-full py-4"
            >
              Complete Handover & Start Timer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
