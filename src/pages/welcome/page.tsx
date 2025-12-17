import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import logoDesign from '../../assets/Logo-design.svg';
import authImg from '../../assets/auth-img.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom flex flex-col">
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
            icon="arrow-right"
          >
            Create an account
          </Button>
          <Button 
            onClick={() => navigate('/login')} 
            variant="secondary"
            fullWidth 
            size="lg"
            icon="none"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

