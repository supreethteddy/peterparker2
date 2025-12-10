import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import logoDesign from '../../assets/Logo-design.svg';
import authImg from '../../assets/auth-img.png';

export default function WelcomePage() {
  const navigate = useNavigate();

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

      {/* Logo */}
      <div className="px-6 mb-4 flex items-center pt-2">
        <img 
          src={logoDesign} 
          alt="quickParker Logo" 
          className="h-14 w-36 object-cover"
        />
      </div>

      {/* Illustration */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-4">
        <img 
          src={authImg} 
          alt="Welcome"
          className="w-full max-w-md h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold text-[#0F1415] mb-3 tracking-tight">
          Welcome
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed mb-8">
          Have a better sharing experience
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/signup')} 
            fullWidth 
            size="lg"
            className="text-lg font-bold"
          >
            Create an account
          </Button>
          <Button 
            onClick={() => navigate('/login')} 
            variant="outline"
            fullWidth 
            size="lg"
            className="text-lg font-bold border-2"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

