import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import BottomNav from '../../components/feature/BottomNav';

export default function InsuranceSettingsPage() {
  const navigate = useNavigate();
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);
  const [coverageAmount, setCoverageAmount] = useState('50000');
  const [premiumAmount, setPremiumAmount] = useState('99');

  useEffect(() => {
    const saved = localStorage.getItem('insuranceEnabled');
    if (saved !== null) {
      setInsuranceEnabled(JSON.parse(saved));
    }
    const coverage = localStorage.getItem('insuranceCoverage');
    if (coverage) {
      setCoverageAmount(coverage);
    }
    const premium = localStorage.getItem('insurancePremium');
    if (premium) {
      setPremiumAmount(premium);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('insuranceEnabled', JSON.stringify(insuranceEnabled));
    localStorage.setItem('insuranceCoverage', coverageAmount);
    localStorage.setItem('insurancePremium', premiumAmount);
    navigate('/profile');
  };

  const coverageOptions = [
    { amount: '25000', premium: '49', label: 'Basic' },
    { amount: '50000', premium: '99', label: 'Standard' },
    { amount: '100000', premium: '199', label: 'Premium' },
    { amount: '200000', premium: '399', label: 'Ultra' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom animate-in">
      <Header 
        title="Insurance Settings" 
        onLeftClick={() => navigate(-1)}
      />

      <div className="pt-20 px-4 pb-24">
        {/* Insurance Toggle Card */}
        <Card className="p-6 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white shadow-lg">
              <i className="ri-shield-check-line text-2xl"></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#0F1415] mb-2">
                Trip Insurance
              </h2>
              <p className="text-sm text-neutral-600">
                Protect your vehicle during valet trips with comprehensive coverage.
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div>
              <p className="text-base font-medium text-[#0F1415]">Enable Insurance</p>
              <p className="text-sm text-neutral-600 mt-1">
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
                className={`w-14 h-7 rounded-full transition-all duration-300 ${
                  insuranceEnabled ? 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59]' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-7 h-7 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    insuranceEnabled ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Coverage Details */}
        {insuranceEnabled && (
          <>
            <Card className="p-6 mb-6 animate-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold text-[#0F1415] mb-4">Coverage Plan</h3>
              
              <div className="space-y-3 mb-6">
                {coverageOptions.map((option, index) => (
                  <button
                    key={option.amount}
                    onClick={() => {
                      setCoverageAmount(option.amount);
                      setPremiumAmount(option.premium);
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                      coverageAmount === option.amount
                        ? 'border-[#66BD59] bg-[#66BD59]/10 shadow-md'
                        : 'border-neutral-200 bg-white hover:border-[#34C0CA]/50'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          coverageAmount === option.amount
                            ? 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          <i className="ri-shield-star-line text-xl"></i>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-[#0F1415]">{option.label} Plan</p>
                          <p className="text-sm text-neutral-600">₹{parseInt(option.amount).toLocaleString()} coverage</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#66BD59]">₹{option.premium}</p>
                        <p className="text-xs text-neutral-500">per trip</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Coverage Benefits */}
            <Card className="p-6 mb-6 animate-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold text-[#0F1415] mb-4">What's Covered</h3>
              <div className="space-y-3">
                {[
                  { icon: 'ri-car-line', text: 'Vehicle damage protection' },
                  { icon: 'ri-shield-line', text: 'Theft and vandalism coverage' },
                  { icon: 'ri-time-line', text: '24/7 claim support' },
                  { icon: 'ri-file-list-line', text: 'Quick claim processing' },
                  { icon: 'ri-checkbox-circle-line', text: 'No deductibles' },
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#66BD59]/10 flex items-center justify-center">
                      <i className={`${benefit.icon} text-[#66BD59] text-xl`}></i>
                    </div>
                    <p className="text-sm font-medium text-[#0F1415] flex-1">{benefit.text}</p>
                    <i className="ri-check-line text-[#66BD59] text-xl"></i>
                  </div>
                ))}
              </div>
            </Card>

            {/* Current Plan Summary */}
            <Card className="p-6 mb-6 animate-in bg-gradient-to-r from-[#34C0CA]/10 to-[#66BD59]/10 border-2 border-[#66BD59]/20" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-semibold text-[#0F1415] mb-4">Current Plan</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-neutral-600">Coverage Amount</span>
                  <span className="text-base font-semibold text-[#0F1415]">₹{parseInt(coverageAmount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-neutral-600">Premium per Trip</span>
                  <span className="text-base font-semibold text-[#66BD59]">₹{premiumAmount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-neutral-600">Status</span>
                  <span className="px-3 py-1 text-xs font-medium text-[#66BD59] bg-[#66BD59]/10 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </Card>

            {/* Policy Details Link */}
            <Card className="p-4 mb-6 animate-in" style={{ animationDelay: '0.5s' }}>
              <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <i className="ri-file-text-line text-[#34C0CA] text-xl"></i>
                  <span className="text-sm font-medium text-[#0F1415]">View Policy Details</span>
                </div>
                <i className="ri-arrow-right-s-line text-neutral-400"></i>
              </button>
            </Card>
          </>
        )}

        {/* Save Button */}
        <div className="animate-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleSave}
            fullWidth
            size="lg"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

