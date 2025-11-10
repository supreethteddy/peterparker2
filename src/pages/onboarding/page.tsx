
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { APP_NAME } from '../../config';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const slides = [
    {
      title: 'Request a Valet in Seconds',
      subtitle: 'Tap once and a verified valet reaches your location fast.',
      image: 'https://readdy.ai/api/search-image?query=Modern%20onboarding%20illustration%20of%20a%20user%20requesting%20a%20valet%20via%20mobile%20app%2C%20clean%20white%20and%20blue%20theme%2C%20minimal%20flat%20art&width=800&height=600&seq=ob1&orientation=landscape'
    },
    {
      title: 'Safe Parking & Live Updates',
      subtitle: 'Track your car status in real‑time with secure handovers.',
      image: 'https://readdy.ai/api/search-image?query=Illustration%20showing%20secure%20parking%20garage%20with%20tracking%20updates%20on%20phone%2C%20clean%20flat%20design%2C%20blue%20accents&width=800&height=600&seq=ob2&orientation=landscape'
    },
    {
      title: 'Seamless Payments & Rewards',
      subtitle: 'Pay with cards or UPI and earn points on every trip.',
      image: 'https://readdy.ai/api/search-image?query=Payment%20success%20illustration%20with%20UPI%20and%20card%2C%20confetti%2C%20modern%20mobile%20UI%2C%20flat%20style&width=800&height=600&seq=ob3&orientation=landscape'
    }
  ];

  const finish = () => {
    localStorage.setItem('userOnboarded', 'true');
    navigate('/');
  };

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-sm mx-auto px-4 pt-10 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-blue-600" style={{ fontFamily: "'Pacifico', cursive" }}>
            {APP_NAME}
          </h1>
          <button onClick={finish} className="text-sm text-gray-500 hover:text-gray-700">
            Skip
          </button>
        </div>

        {/* Hero card */}
        <Card className="overflow-hidden p-0">
          <div className="relative">
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h2 className="text-xl font-semibold">{slides[index].title}</h2>
              <p className="text-white/90 mt-2">{slides[index].subtitle}</p>
            </div>
          </div>
        </Card>

        {/* Bullets */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-6 space-y-3">
          {index === 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'ri-map-pin-user-line', text: 'Doorstep pickup' },
                { icon: 'ri-time-line', text: 'Fast arrival' },
                { icon: 'ri-verified-badge-line', text: 'Verified valets' }
              ].map((f) => (
                <Card key={f.text} className="p-3 text-center">
                  <i className={`${f.icon} text-blue-600 text-xl block mb-1`}></i>
                  <p className="text-xs text-gray-600">{f.text}</p>
                </Card>
              ))}
            </div>
          )}
          {index === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'ri-shield-check-line', text: 'Secure parking' },
                { icon: 'ri-route-line', text: 'Live tracking' }
              ].map((f) => (
                <Card key={f.text} className="p-3 text-center">
                  <i className={`${f.icon} text-blue-600 text-xl block mb-1`}></i>
                  <p className="text-xs text-gray-600">{f.text}</p>
                </Card>
              ))}
            </div>
          )}
          {index === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'ri-bank-card-line', text: 'Cards & UPI' },
                { icon: 'ri-gift-line', text: 'Earn rewards' }
              ].map((f) => (
                <Card key={f.text} className="p-3 text-center">
                  <i className={`${f.icon} text-blue-600 text-xl block mb-1`}></i>
                  <p className="text-xs text-gray-600">{f.text}</p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Button onClick={next} className="w-full py-4">
            {index < slides.length - 1 ? 'Next' : 'Get Started'}
          </Button>
          {index > 0 && (
            <button
              className="w-full mt-3 text-sm text-gray-500"
              onClick={() => setIndex(index - 1)}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
