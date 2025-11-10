
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import Card from '../../components/base/Card';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    vehicleMake: '',
    vehicleModel: '',
    plateNumber: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [insurance, setInsurance] = useState(false);

  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep(2);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setStep(3);
    }
  };

  const handleProfileSubmit = () => {
    if (profile.name && profile.vehicleMake && profile.vehicleModel && profile.plateNumber) {
      setStep(4);
    }
  };

  const handlePaymentSubmit = () => {
    setStep(5);
  };

  const handleComplete = () => {
    localStorage.setItem('userOnboarded', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-sm mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600" style={{ fontFamily: '"Pacifico", serif' }}>
            Peter Parker
          </h1>
          <p className="text-gray-600 mt-2">Valet On Go</p>
        </div>

        {/* Progress Bar */}
        <div className="flex mb-8">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex-1">
              <div className={`h-2 rounded-full ${step >= num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
          ))}
        </div>

        {/* Step 1: Phone Number */}
        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Enter your phone number</h2>
            <p className="text-gray-600 mb-6">We'll send you a verification code</p>
            <div className="space-y-4">
              <div className="flex">
                <div className="bg-gray-100 px-3 py-3 rounded-l-lg border border-r-0 border-gray-200">
                  <span className="text-gray-700">+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  className="rounded-l-none"
                />
              </div>
              <Button 
                onClick={handlePhoneSubmit}
                disabled={phone.length !== 10}
                className="w-full"
              >
                Send OTP
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Enter verification code</h2>
            <p className="text-gray-600 mb-6">Code sent to +91 {phone}</p>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <Button 
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6}
                className="w-full"
              >
                Verify
              </Button>
              <button className="w-full text-blue-600 text-sm">Resend code</button>
            </div>
          </Card>
        )}

        {/* Step 3: Profile Setup */}
        {step === 3 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Complete your profile</h2>
            <div className="space-y-4">
              <Input
                placeholder="Full name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
              <Input
                placeholder="Vehicle make (e.g., Honda)"
                value={profile.vehicleMake}
                onChange={(e) => setProfile({...profile, vehicleMake: e.target.value})}
              />
              <Input
                placeholder="Vehicle model (e.g., City)"
                value={profile.vehicleModel}
                onChange={(e) => setProfile({...profile, vehicleModel: e.target.value})}
              />
              <Input
                placeholder="License plate number"
                value={profile.plateNumber}
                onChange={(e) => setProfile({...profile, plateNumber: e.target.value})}
              />
              <Button 
                onClick={handleProfileSubmit}
                disabled={!profile.name || !profile.vehicleMake || !profile.vehicleModel || !profile.plateNumber}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Payment Method */}
        {step === 4 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add payment method</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
                    paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <i className="ri-bank-card-line text-xl"></i>
                  <span>Credit/Debit Card</span>
                  {paymentMethod === 'card' && <i className="ri-check-line text-blue-600 ml-auto"></i>}
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
                    paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <i className="ri-smartphone-line text-xl"></i>
                  <span>UPI/Digital Wallet</span>
                  {paymentMethod === 'upi' && <i className="ri-check-line text-blue-600 ml-auto"></i>}
                </button>
              </div>
              <Button onClick={handlePaymentSubmit} className="w-full">
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 5: Insurance Add-on */}
        {step === 5 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Insurance protection</h2>
            <p className="text-gray-600 mb-6">Optional coverage for your vehicle during valet service</p>
            <div className="space-y-4">
              <div 
                onClick={() => setInsurance(!insurance)}
                className={`p-4 border rounded-lg cursor-pointer ${
                  insurance ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vehicle Protection</h3>
                    <p className="text-sm text-gray-600">₹20 per trip</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    insurance ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                  }`}>
                    {insurance && <i className="ri-check-line text-white text-sm"></i>}
                  </div>
                </div>
              </div>
              <Button onClick={handleComplete} className="w-full">
                Get Started
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
