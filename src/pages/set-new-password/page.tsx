import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import logoDesign from '../../assets/Logo-design.svg';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function SetNewPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    if (password && confirmPassword && password === confirmPassword) {
      navigate('/login');
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
          onClick={() => navigate('/phone-verify-otp')}
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
          <h1 className="text-3xl font-bold text-[#0F1415] mb-2 tracking-tight">
            Set New password
          </h1>
          <p className="text-base text-neutral-600 mb-8">
            Set your new password
          </p>

          <div className="space-y-5 mb-6">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightIcon={
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />
            </div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                rightIcon={
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />
            </div>
            <p className="text-sm text-neutral-500">
              Atleast 1 number or a special character
            </p>
          </div>

          <div className="pb-safe-bottom">
            <Button 
              onClick={handleSave} 
              disabled={!password || !confirmPassword || password !== confirmPassword} 
              fullWidth
              size="lg"
              className="text-lg font-bold"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

