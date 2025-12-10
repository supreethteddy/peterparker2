import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import logoDesign from '../../assets/Logo-design.svg';
import { ArrowLeft } from 'lucide-react';

export default function SendVerificationPage() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSendOTP = () => {
    if (emailOrPhone) {
      navigate('/phone-verify-otp');
    }
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom flex flex-col">
      {/* Status Bar Area */}
      <div className="flex items-center justify-between px-6 pt-safe-top pb-2">
        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900 rounded-sm" style={{ width: '65%' }}></div>
          </div>
          <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
          <div className="w-6 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900 rounded-sm m-0.5" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* Logo and Back Button */}
      <div className="px-6 mb-4 flex items-center justify-between pt-2">
        <button
          onClick={() => navigate('/login')}
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <img 
          src={logoDesign} 
          alt="quickParker Logo" 
          className="h-14 w-36 object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#0F1415] mb-8 tracking-tight">
            Verification email or phone number
          </h1>

          <div className="mb-8">
            <Input
              type="text"
              placeholder="Email or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>

          <div className="pb-safe-bottom">
            <Button 
              onClick={handleSendOTP} 
              disabled={!emailOrPhone} 
              fullWidth
              size="lg"
              className="text-lg font-bold"
            >
              Send OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

