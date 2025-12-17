import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiCreditCard } from 'react-icons/hi';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { valet, parkingLocation, distanceCharge = 0, totalTime = 45 } = location.state || {};
  const [showDispute, setShowDispute] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const basePrice = 80;
  const overtimeMinutes = Math.max(0, totalTime - 30);
  const overtimeCharge = Math.ceil(overtimeMinutes / 10) * 10;
  const platformFee = Math.round((basePrice + overtimeCharge + distanceCharge) * 0.2);
  const subtotal = basePrice + overtimeCharge + distanceCharge;
  const total = subtotal + platformFee;

  const handlePayment = () => {
    setPaymentComplete(true);
    setTimeout(() => {
      navigate('/review', { state: { valet, total } });
    }, 2000);
  };

  if (!valet) {
    navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header 
        title="Payment & Rating"
        onLeftClick={() => navigate(-1)}
      />

      <div className="pt-20 px-4 pb-6">
        {!paymentComplete ? (
          <>
            <Card className="p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-xl font-bold">
                  {valet.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[#0F1415] mb-1">{valet.name}</h3>
                  <p className="text-sm text-neutral-600">⭐ {valet.rating} ({valet.reviews} reviews)</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="font-bold text-[#0F1415] mb-4">Charge</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Valet/per hours</span>
                  <span className="font-semibold">₹{basePrice}</span>
                </div>
                {overtimeCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Overtime ({overtimeMinutes} min)</span>
                    <span className="font-semibold">₹{overtimeCharge}</span>
                  </div>
                )}
                {distanceCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Distance Charge</span>
                    <span className="font-semibold">₹{distanceCharge}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-600">Vat (x)</span>
                  <span className="font-semibold">₹{platformFee}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg text-[#0F1415]">Total</span>
                    <span className="font-bold text-lg bg-gradient-to-r from-[#34C0CA] to-[#66BD59] bg-clip-text text-transparent">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>
            </Card>


            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-[#0F1415] mb-4">Select payment method</h3>
              <div className="space-y-3">
                <button className="w-full p-4 border-2 border-[#66BD59] bg-gradient-to-r from-[#66BD59]/10 to-[#66BD59]/5 rounded-xl text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HiCreditCard className="w-5 h-5 text-[#66BD59]" />
                      <div>
                        <p className="font-semibold text-[#0F1415]">VISA •••• 8970</p>
                        <p className="text-xs text-neutral-600">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#66BD59] bg-[#66BD59] flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 border-2 border-neutral-200 rounded-xl text-left hover:border-[#34C0CA] transition-colors">
                  <div className="flex items-center gap-3">
                    <HiCreditCard className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-semibold text-[#0F1415]">VISA •••• 5678</p>
                      <p className="text-xs text-neutral-600">Expires 06/25</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 border-2 border-neutral-200 rounded-xl text-left hover:border-[#34C0CA] transition-colors">
                  <div className="flex items-center gap-3">
                    <HiCreditCard className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-semibold text-[#0F1415]">Cash</p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            <div className="space-y-3">
              <Button 
                onClick={handlePayment}
                fullWidth
                size="lg"
                icon="check"
              >
                Confirm Payment
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowDispute(true)}
                fullWidth
              >
                Report Issue
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#66BD59] to-[#52A547] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0F1415] mb-2">Payment Success</h2>
            <p className="text-neutral-600 mb-2">
              Your money has been successfully sent to {valet?.name || 'Valet'}
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[#34C0CA] to-[#66BD59] bg-clip-text text-transparent mb-6">
              ₹{total}
            </p>
            
            <Card className="p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Amount Paid</span>
                  <span className="font-bold">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Transaction ID</span>
                  <span className="text-sm font-semibold">PP{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#0F1415] mb-2">How is your trip?</p>
              <Button 
                onClick={() => navigate('/review', { state: { valet, total } })}
                fullWidth
                size="lg"
                className="text-lg font-bold"
              >
                Please Feedback
              </Button>
            </div>
          </div>
        )}

        {showDispute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
            <div className="bg-white w-full rounded-t-2xl p-6">
              <h3 className="font-semibold mb-4">Report an Issue</h3>
              <div className="space-y-3 mb-6">
                {[
                  'Vehicle damage',
                  'Incorrect charges',
                  'Poor service quality',
                  'Lost items',
                  'Other'
                ].map((issue) => (
                  <button
                    key={issue}
                    className="w-full p-3 border border-gray-200 rounded-lg text-left hover:border-blue-600"
                  >
                    {issue}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDispute(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1">
                  Submit Report
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
