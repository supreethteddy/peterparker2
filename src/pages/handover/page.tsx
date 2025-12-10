
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { Camera, CheckCircle2, Car, Fuel, FileText, Shield } from 'lucide-react';

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
  const [confirmHandover, setConfirmHandover] = useState(false);

  useEffect(() => {
    // Auto-advance to handover start after showing arrival
    if (step === 1) {
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
    navigate('/parking', { state: { valet, ...location.state } });
  };

  const allChecked = Object.values(checklist).every(Boolean);

  if (!valet) {
    navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header 
        title="Secure Handover"
        onLeftClick={() => navigate('/valet-enroute')}
      />

      <div className="pt-20 px-4 pb-6">
        {/* Step 1: Valet Arrived */}
        {step === 1 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#66BD59] to-[#52A547] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F1415] mb-2">{valet.name} has arrived</h2>
            <p className="text-neutral-600 mb-8">Let's begin the secure handover process</p>
            
            <Card className="p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-xl font-bold">
                  {valet.name.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-[#0F1415]">{valet.name}</h3>
                  <p className="text-sm text-neutral-600">⭐ {valet.rating} ({valet.reviews} reviews)</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Selfie Verification */}
        {step === 2 && (
          <div className="py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0F1415] mb-2">Begin Secure Handover</h2>
              <p className="text-neutral-600">Both you and the valet need to take a selfie for security verification</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                    userSelfie ? 'border-[#66BD59] bg-[#66BD59]/10' : 'border-neutral-300 bg-neutral-50'
                  }`}>
                    {userSelfie ? (
                      <CheckCircle2 className="w-10 h-10 text-[#66BD59]" />
                    ) : (
                      <Camera className="w-10 h-10 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-[#0F1415] mb-1">Your Selfie</h3>
                    <p className="text-sm text-neutral-600">
                      {userSelfie ? 'Verified ✓' : 'Tap to capture your selfie'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                    valetSelfie ? 'border-[#66BD59] bg-[#66BD59]/10' : 'border-neutral-300 bg-neutral-50'
                  }`}>
                    {valetSelfie ? (
                      <CheckCircle2 className="w-10 h-10 text-[#66BD59]" />
                    ) : (
                      <Camera className="w-10 h-10 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-[#0F1415] mb-1">Valet Selfie</h3>
                    <p className="text-sm text-neutral-600">
                      {valetSelfie ? 'Verified ✓' : 'Waiting for valet to take selfie...'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {!userSelfie && (
              <Button 
                onClick={handleSelfieVerification} 
                fullWidth
                size="lg"
                className="text-lg font-bold"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Selfie Together
              </Button>
            )}
          </div>
        )}

        {/* Step 3: Handover Checklist */}
        {step === 3 && (
          <div className="py-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#0F1415] mb-2">Vehicle Handover Checklist</h2>
              <p className="text-neutral-600">Complete the checklist with your valet</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {[
                { key: 'exteriorCheck', label: 'Exterior Condition Check', description: 'Check for scratches or dents', icon: Car },
                { key: 'interiorCheck', label: 'Interior Condition Check', description: 'Check interior items', icon: Shield },
                { key: 'fuelLevel', label: 'Fuel Level Noted', description: 'Current fuel level recorded', icon: Fuel },
                { key: 'documents', label: 'Documents Verified', description: 'RC, Insurance verified', icon: FileText }
              ].map((item) => {
                const Icon = item.icon;
                const isChecked = checklist[item.key as keyof typeof checklist];
                return (
                  <Card 
                    key={item.key} 
                    className="p-4 cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => handleChecklistItem(item.key)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isChecked ? 'bg-gradient-to-br from-[#34C0CA] to-[#66BD59]' : 'bg-neutral-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${isChecked ? 'text-white' : 'text-neutral-500'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0F1415] mb-1">{item.label}</h3>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked ? 'border-[#66BD59] bg-[#66BD59]' : 'border-neutral-300'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Final Confirmation */}
            <Card className="p-4 mb-6 bg-gradient-to-r from-[#34C0CA]/5 to-[#66BD59]/5 border-2 border-[#34C0CA]/20">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmHandover}
                  onChange={(e) => setConfirmHandover(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-neutral-300 text-[#34C0CA] focus:ring-[#34C0CA]"
                />
                <div>
                  <p className="font-semibold text-[#0F1415] mb-1">I confirm handing over my vehicle</p>
                  <p className="text-sm text-neutral-600">Vehicle details and condition have been verified</p>
                </div>
              </label>
            </Card>

            <div className="bg-gradient-to-r from-[#34C0CA]/10 to-[#66BD59]/10 p-4 rounded-xl mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#34C0CA]" />
                <span className="text-sm font-semibold text-[#0F1415]">
                  30-minute timer starts after handover completion
                </span>
              </div>
            </div>

            <Button 
              onClick={handleCompleteHandover}
              disabled={!allChecked || !confirmHandover}
              fullWidth
              size="lg"
              className="text-lg font-bold"
            >
              Complete Handover & Start Timer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
