import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import logoDesign from '../../assets/Logo-design.svg';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+880');
  const [gender, setGender] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = () => {
    if (name && email && phone && gender && agreeToTerms) {
      // Save signup data to localStorage for profile setup
      const signupData = {
        fullName: name,
        email: email,
        phone: phone,
        countryCode: countryCode,
        gender: gender,
      };
      localStorage.setItem('signupData', JSON.stringify(signupData));
      navigate('/verify-otp');
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
          onClick={() => navigate('/welcome')}
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
            Sign up with your email or phone number
          </h1>

          <div className="space-y-5 mb-6">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-base font-semibold focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/10 focus:border-[#34C0CA] appearance-none pr-10 transition-all duration-200 w-24"
                >
                  <option value="+880">+880</option>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#34C0CA] pointer-events-none" />
              </div>
              <Input
                type="tel"
                placeholder="Your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-1"
              />
            </div>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-base font-semibold focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/10 focus:border-[#34C0CA] appearance-none pr-10 transition-all duration-200"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#34C0CA] pointer-events-none" />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-neutral-300 text-[#34C0CA] focus:ring-[#34C0CA]"
              />
              <span className="text-sm text-neutral-600">
                By signing up, you agree to the{' '}
                <a href="#" className="text-[#34C0CA] hover:underline font-semibold">Terms of service</a>
                {' '}and{' '}
                <a href="#" className="text-[#34C0CA] hover:underline font-semibold">Privacy policy</a>
              </span>
            </label>
          </div>

          <Button 
            onClick={handleSignUp} 
            disabled={!name || !email || !phone || !gender || !agreeToTerms} 
            fullWidth
            size="lg"
            className="text-lg font-bold mb-6"
          >
            Sign Up
          </Button>

          {/* Separator */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-neutral-200"></div>
            <span className="px-4 text-sm text-neutral-500 font-medium">or</span>
            <div className="flex-1 border-t border-neutral-200"></div>
          </div>

          {/* Social Sign-in */}
          <div className="space-y-3 mb-6">
            <button className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-[#0F1415] font-semibold hover:bg-neutral-50 transition-all duration-200 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Gmail
            </button>
            <button className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-[#0F1415] font-semibold hover:bg-neutral-50 transition-all duration-200 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign up with Facebook
            </button>
            <button className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-[#0F1415] font-semibold hover:bg-neutral-50 transition-all duration-200 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.083 3.792 3.077 1.52-.008 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.156-.183-3.35 1.258-4.03 1.258zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Sign up with Apple
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-safe-bottom mb-6 text-center">
          <p className="text-base text-neutral-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#34C0CA] hover:text-[#2BA8B2] font-semibold underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

