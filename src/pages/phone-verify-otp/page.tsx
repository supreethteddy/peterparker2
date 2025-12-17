import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import logoDesign from '../../assets/Logo-design.svg';
import { FaArrowLeft, FaBackspace } from 'react-icons/fa';

export default function PhoneVerifyOTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(5).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(60);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeypadClick = (digit: string) => {
    const emptyIndex = otp.findIndex(d => d === '');
    if (emptyIndex !== -1) {
      handleChange(emptyIndex, digit);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = otp.findLastIndex(d => d !== '');
    if (lastFilledIndex !== -1) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = '';
      setOtp(newOtp);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleVerify = (otpValue: string) => {
    if (otpValue.length === 5) {
      navigate('/set-new-password');
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom flex flex-col">
      {/* Logo and Back Button */}
      <div className="px-6 mb-4 flex items-center justify-between pt-2">
        <button
          onClick={() => navigate('/send-verification')}
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold flex items-center gap-2"
        >
          <FaArrowLeft className="w-5 h-5" />
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
            Phone verification
          </h1>
          <p className="text-base text-neutral-600 mb-8">
            Enter your OTP code
          </p>

          {/* OTP Input */}
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-center text-3xl font-bold border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/20 focus:border-[#34C0CA] transition-all duration-200 bg-white shadow-sm"
              />
            ))}
          </div>

          {/* Resend Link */}
          <div className="text-center mb-8">
            {resendTimer > 0 ? (
              <p className="text-base text-neutral-600">
                Didn't receive code? Resend again in {resendTimer}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-base text-[#34C0CA] hover:text-[#2BA8B2] font-semibold underline"
              >
                Didn't receive code? Resend again
              </button>
            )}
          </div>

          <Button 
            onClick={() => handleVerify(otp.join(''))} 
            disabled={otp.some(d => d === '')} 
            fullWidth
            size="lg"
            className="text-lg font-bold mb-8"
          >
            Verify
          </Button>
        </div>

        {/* Numeric Keypad */}
        <div className="pb-safe-bottom mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeypadClick(digit.toString())}
                className="h-14 bg-white border-2 border-neutral-200 rounded-xl text-2xl font-bold text-[#0F1415] hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-200"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() => handleKeypadClick('0')}
              className="h-14 bg-white border-2 border-neutral-200 rounded-xl text-2xl font-bold text-[#0F1415] hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-200"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-14 bg-white border-2 border-neutral-200 rounded-xl text-[#0F1415] hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-200 flex items-center justify-center"
            >
              <FaBackspace className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

