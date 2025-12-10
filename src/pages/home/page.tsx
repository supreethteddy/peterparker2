import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';
import LogoDesign from '../../assets/Logo-design.svg';
import { Search, Bell, Navigation, Car, Heart } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('Honda City (MH12AB1234)');
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);
  const [userName] = useState('Arjun');
  const [serviceType, setServiceType] = useState<'transport' | 'delivery'>('transport');

  useEffect(() => {
    const isOnboarded = localStorage.getItem('userOnboarded') === 'true';
    const isAuthed = localStorage.getItem('userAuthenticated') === 'true';
    if (!isOnboarded) navigate('/welcome');
    else if (!isAuthed) navigate('/login');
  }, [navigate]);

  const vehicles = [
    'Honda City (MH12AB1234)',
    'Maruti Swift (MH12CD5678)',
  ];

  const handleRequestValet = () => {
    navigate('/request');
  };

  return (
    <div className="relative min-h-screen bg-neutral-100 safe-top safe-bottom">
      {/* Full Screen Map - Takes up entire screen */}
       <div className="absolute inset-0 z-0">
        {/* <img 
          src="https://readdy.ai/api/search-image?query=Bangalore%20city%20map%20view%20with%20location%20pins%2C%20modern%20urban%20area%2C%20streets%20and%20buildings%20visible%2C%20satellite%20view%20style%2C%20clean%20and%20detailed&width=800&height=1200&seq=map1&orientation=portrait"
          alt="Map"
          className="w-full h-full object-cover"
        /> */}
        
        {/* Current Location Marker - Center of map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Pulse animation */}
            <div className="absolute inset-0 w-6 h-6 bg-[#66BD59] rounded-full animate-ping opacity-75"></div>
            {/* Main marker */}
            <div className="relative w-6 h-6 bg-white rounded-full border-4 border-[#66BD59] shadow-lg"></div>
            {/* Pin point */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-[#66BD59]"></div>
          </div>
        </div>

        {/* Nearby Valet Markers (Example) */}
        <div className="absolute top-[45%] left-[60%] z-10">
          <div className="w-8 h-8 bg-white rounded-full border-2 border-[#66BD59] shadow-lg flex items-center justify-center">
            <Car className="w-4 h-4 text-[#66BD59]" />
          </div>
        </div>
        <div className="absolute top-[55%] left-[40%] z-10">
          <div className="w-8 h-8 bg-white rounded-full border-2 border-[#66BD59] shadow-lg flex items-center justify-center">
            <Car className="w-4 h-4 text-[#66BD59]" />
          </div>
        </div>
      </div> 
  

      {/* Minimal Top Bar - Like Uber/Ola */}
      <div className=" h-20 w-full absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo - Left Side */}
          <img src={LogoDesign} alt="quickParker" className="h-14 w-36 object-cover" />
          
          {/* Notifications - Right Side */}
          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors relative">
            <Bell className="w-5 h-5 text-[#0F1415]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#66BD59] rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Search Bar and Service Type Selector */}
      <div className="absolute top-20 left-0 right-0 z-10 px-4 space-y-3">
        {/* Search Bar */}
        <Card 
          className="p-4 shadow-2xl cursor-pointer hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 border border-neutral-100"
          onClick={() => navigate('/select-location')}
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-base text-neutral-600">
                {destination || 'Where would you go?'}
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Handle favorites
              }}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-[#66BD59] transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Service Type Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setServiceType('transport')}
            className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
              serviceType === 'transport'
                ? 'bg-green-700 text-white shadow-lg'
                : 'bg-white text-green-700 border-2 border-green-700'
            }`}
          >
            Transport
          </button>
          <button
            onClick={() => setServiceType('delivery')}
            className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
              serviceType === 'delivery'
                ? 'bg-green-700 text-white shadow-lg'
                : 'bg-white text-green-700 border-2 border-green-700'
            }`}
          >
            Delivery
          </button>
        </div>

        {/* Rental Button */}
        <Button
          onClick={() => navigate('/request')}
          className="w-full"
        >
          Rental
        </Button>
      </div>

      {/* Floating Action Button - Current Location (Like Uber) */}
      <div className="absolute bottom-32 right-4 z-10">
        <button className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-neutral-100">
          <Navigation className="w-6 h-6 text-[#66BD59]" />
        </button>
      </div>


      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
