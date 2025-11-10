
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
      features: [
        { icon: 'ri-map-pin-user-line', text: 'Doorstep pickup' },
        { icon: 'ri-time-line', text: 'Fast arrival' },
        { icon: 'ri-verified-badge-line', text: 'Verified valets' }
      ],
      info: [
        'Share your location or pick a spot on the map',
        'Get ETA and valet details instantly',
        'Live updates from accept to handover'
      ]
    },
    {
      title: 'Safe Parking & Live Updates',
      subtitle: 'Track your car status in real‑time with secure handovers.',
      features: [
        { icon: 'ri-shield-check-line', text: 'Secure parking' },
        { icon: 'ri-route-line', text: 'Live tracking' },
        { icon: 'ri-survey-line', text: 'Photo proofs' }
      ],
      info: [
        'Every handover is logged with photos and time-stamps',
        'Track parking, movement and return in-app',
        '24×7 support for complete peace of mind'
      ]
    },
    {
      title: 'Seamless Payments & Rewards',
      subtitle: 'Pay with cards or UPI and earn points on every trip.',
      features: [
        { icon: 'ri-bank-card-line', text: 'Cards & UPI' },
        { icon: 'ri-gift-line', text: 'Earn rewards' },
        { icon: 'ri-price-tag-3-line', text: 'Clear pricing' }
      ],
      info: [
        'One-tap checkout with saved methods',
        'Transparent pricing before you confirm',
        'Earn points and redeem on future rides'
      ]
    }
  ];

  const finish = () => {
    localStorage.setItem('userOnboarded', 'true');
    navigate('/login');
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

        {/* Hero card - decorative gradient (no external images) */}
        <Card className="overflow-hidden p-0">
          <div className="relative h-64 bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Big icon per slide */}
              <i
                className={
                  [
                    'ri-map-pin-user-fill',
                    'ri-shield-check-fill',
                    'ri-bank-card-fill'
                  ][index] + ' text-white/90 text-7xl'
                }
              ></i>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-black/40 to-transparent">
              <h2 className="text-xl font-semibold">{slides[index].title}</h2>
              <p className="text-white/90 mt-1">{slides[index].subtitle}</p>
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

        {/* Feature highlights (cards) */}
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {slides[index].features.map((f) => (
              <Card key={f.text} className="p-3 text-center">
                <i className={`${f.icon} text-blue-600 text-xl block mb-1`}></i>
                <p className="text-xs text-gray-600">{f.text}</p>
              </Card>
            ))}
          </div>

          {/* Informative list */}
          <Card className="p-4">
            <h3 className="font-medium mb-2">How it helps</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {slides[index].info.map((item) => (
                <li key={item} className="flex items-start space-x-2">
                  <i className="ri-check-line text-green-600 mt-[2px]"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'ri-lock-2-line', text: 'Secure' },
              { icon: 'ri-customer-service-2-line', text: '24×7 support' },
              { icon: 'ri-star-smile-line', text: 'Loved by users' }
            ].map((b) => (
              <div key={b.text} className="text-center text-xs text-gray-600">
                <i className={`${b.icon} text-blue-600 text-lg block mb-1`}></i>
                {b.text}
              </div>
            ))}
          </div>
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
