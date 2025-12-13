import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { MapPin, Phone, MessageCircle, Car } from 'lucide-react';

export default function ValetAssignedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const locationData = location.state;

  if (!valet) {
    navigate('/request');
    return null;
  }

  const handleConfirmPickup = () => {
    navigate('/confirm-pickup', { 
      state: { 
        valet,
        ...locationData 
      } 
    });
  };

  const handleCall = () => {
    // Handle call action
    console.log('Call valet');
  };

  const handleMessage = () => {
    navigate('/message', { state: { valet } });
  };

  return (
    <div className="relative min-h-screen bg-neutral-100 safe-top safe-bottom">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://readdy.ai/api/search-image?query=Bangalore%20city%20map%20view%20with%20location%20pins%2C%20modern%20urban%20area%2C%20streets%20and%20buildings%20visible%2C%20satellite%20view%20style%2C%20clean%20and%20detailed&width=800&height=1200&seq=map1&orientation=portrait"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-safe-top">
        <Header 
          title="Valet Assigned"
          onLeftClick={() => navigate('/searching-valet')}
        />
      </div>

      {/* Bottom Card */}
      <div className="fixed bottom-0 left-0 right-0 z-20 safe-bottom">
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.2)] border-t border-neutral-100">
          <div className="px-6 pt-6 pb-6">
            {/* Valet Info */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {valet.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-[#0F1415]">{valet.name}</h3>
                    <span className="text-[#66BD59]">✓</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                    <span>⭐ {valet.rating} ({valet.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-[#66BD59]/10 text-[#66BD59] px-2 py-1 rounded font-semibold">
                      DL Verified
                    </span>
                    <span className="text-xs bg-[#66BD59]/10 text-[#66BD59] px-2 py-1 rounded font-semibold">
                      Police Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <Car className="w-5 h-5 text-[#66BD59]" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0F1415]">Mode: {valet.vehicle}</p>
                  <p className="text-xs text-neutral-600">Arriving in {valet.eta}</p>
                </div>
              </div>
            </Card>

            {/* Price Summary */}
            <Card className="p-4 mb-4">
              <h3 className="font-semibold text-[#0F1415] mb-3">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Base price</span>
                  <span className="font-semibold">₹80</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">30 min included</span>
                    <span className="text-[#66BD59] font-semibold">Free</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#0F1415]">Starting from</span>
                    <span className="font-bold text-[#66BD59]">
                      ₹80
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                onClick={handleCall}
                variant="outline"
                className="flex-1"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call
              </Button>
              <Button
                onClick={handleMessage}
                className="flex-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Message
              </Button>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmPickup}
              fullWidth
              size="lg"
              className="text-lg font-bold"
            >
              Confirm Pickup Point
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

