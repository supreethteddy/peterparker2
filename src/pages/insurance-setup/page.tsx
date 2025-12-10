import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Header from '../../components/feature/Header';
import { Shield, Check, ArrowRight, Info } from 'lucide-react';

export default function InsuranceSetupPage() {
  const navigate = useNavigate();
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);

  const handleContinue = () => {
    localStorage.setItem('insuranceEnabled', JSON.stringify(insuranceEnabled));
    localStorage.setItem('userOnboarded', 'true');
    localStorage.setItem('userAuthenticated', 'true');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header 
        title="Trip Insurance" 
        onLeftClick={() => navigate(-1)}
      />
      
      <div className="pt-20 pb-8 px-6 max-w-md mx-auto rounded-2xl">
        <Card className="p-6 mb-6 bg-green-50/100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary-accent" />
            </div>
            <div className="flex-1">
              <h2 className="text-h2 font-semibold text-primary-dark mb-2">
                Protect Your Car
              </h2>
              <p className="text-body text-neutral-600">
                Protect your car during valet trips for a small fee per booking.
              </p>
            </div>
          </div>

          {/* Toggle */}
          <div className="mb-6">
            <label className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-card">
              <div>
                <p className="text-body font-medium text-primary-dark">Trip Insurance</p>
                <p className="text-caption text-neutral-600 mt-1">
                  {insuranceEnabled ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={insuranceEnabled}
                  onChange={(e) => setInsuranceEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-7 rounded-full transition-colors ${
                    insuranceEnabled ? 'bg-primary-accent' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 bg-white rounded-full shadow-sm transition-transform p-2 ${
                      insuranceEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Coverage Details */}
          {insuranceEnabled && (
            <Card variant="outlined" className="p-4 bg-secondary-accent/5 border-secondary-accent/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-secondary-accent mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-body font-medium text-primary-dark mb-2">Coverage Includes:</p>
                  <ul className="space-y-2 text-caption text-neutral-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary-accent mt-0.5 flex-shrink-0" />
                      <span>Vehicle damage protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary-accent mt-0.5 flex-shrink-0" />
                      <span>Theft and vandalism coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary-accent mt-0.5 flex-shrink-0" />
                      <span>24/7 claim support</span>
                    </li>
                  </ul>
                  <button className="text-primary-accent text-sm font-medium mt-3 hover:underline">
                    View policy details →
                  </button>
                </div>
              </div>
            </Card>
          )}
        </Card>

        <Button onClick={handleContinue} fullWidth size="lg">
          Complete Setup
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

