import { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  className?: string;
}

export default function OTPInput({ length = 6, onComplete, className = '' }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === length) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    const filledLength = newOtp.filter(d => d).length;
    if (filledLength < length) {
      inputRefs.current[filledLength]?.focus();
    } else {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className={`flex gap-3 justify-center ${className}`}>
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
          onPaste={handlePaste}
          className="w-16 h-16 text-center text-3xl font-bold border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/20 focus:border-[#34C0CA] transition-all duration-200 bg-white shadow-sm hover:shadow-md"
        />
      ))}
    </div>
  );
}

