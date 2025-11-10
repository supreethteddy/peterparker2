import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import { APP_NAME } from '../../config';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const sendOtp = () => {
    if (phone.length === 10) setStep(2);
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      localStorage.setItem('userAuthenticated', 'true');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl text-blue-600" style={{ fontFamily: "'Pacifico', cursive" }}>
            {APP_NAME}
          </h1>
          <p className="text-gray-600 mt-1">Welcome back</p>
        </div>

        <div className="flex mb-6 justify-center space-x-2">
          {[1, 2].map((n) => (
            <span
              key={n}
              className={`h-2 rounded-full ${step >= n ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Enter your phone number</h2>
            <p className="text-gray-600 mb-4">We’ll send a 6‑digit verification code</p>
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
            <Button onClick={sendOtp} disabled={phone.length !== 10} className="w-full mt-4">
              Send OTP
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Enter verification code</h2>
            <p className="text-gray-600 mb-4">Code sent to +91 {phone}</p>
            <Input
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            <Button onClick={verifyOtp} disabled={otp.length !== 6} className="w-full mt-4">
              Verify & Continue
            </Button>
            <button className="w-full text-blue-600 text-sm mt-3" onClick={sendOtp}>
              Resend code
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}

