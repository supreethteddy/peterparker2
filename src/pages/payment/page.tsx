
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { valet, parkingLocation, distanceCharge = 0, totalTime = 45 } = location.state || {};
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState(0);
  const [showDispute, setShowDispute] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const basePrice = 80;
  const overtimeMinutes = Math.max(0, totalTime - 30);
  const overtimeCharge = Math.ceil(overtimeMinutes / 10) * 10;
  const platformFee = Math.round((basePrice + overtimeCharge + distanceCharge) * 0.2);
  const subtotal = basePrice + overtimeCharge + distanceCharge;
  const total = subtotal + platformFee + tip;

  const handlePayment = () => {
    setPaymentComplete(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  if (!valet) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Payment & Rating"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/')}
      />

      <div className="pt-20 px-4 pb-6">
        {!paymentComplete ? (
          <>
            {/* Trip Summary */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Trip Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Duration</span>
                  <span>{totalTime} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valet</span>
                  <span>{valet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking Location</span>
                  <span className="text-right">{parkingLocation?.split(' - ')[0] || 'Phoenix MarketCity'}</span>
                </div>
              </div>
            </Card>

            {/* Price Breakdown */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Service (Pickup + Drop)</span>
                  <span>₹{basePrice}</span>
                </div>
                {overtimeCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overtime ({overtimeMinutes} min)</span>
                    <span>₹{overtimeCharge}</span>
                  </div>
                )}
                {distanceCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance Change</span>
                    <span>₹{distanceCharge}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (20%)</span>
                  <span>₹{platformFee}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tip</span>
                    <span>₹{tip}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">₹{total}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tip Options */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Add Tip (Optional)</h3>
              <div className="grid grid-cols-4 gap-2">
                {[0, 20, 30, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTip(amount)}
                    className={`py-2 px-3 rounded-lg border text-sm ${
                      tip === amount 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {amount === 0 ? 'No Tip' : `₹${amount}`}
                  </button>
                ))}
              </div>
            </Card>

            {/* Rate Your Valet */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-3">Rate Your Experience</h3>
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={valet.photo}
                  alt={valet.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{valet.name}</h4>
                  <p className="text-sm text-gray-600">How was your service?</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-bank-card-line text-xl text-gray-600"></i>
                  <div>
                    <h3 className="font-medium">Payment Method</h3>
                    <p className="text-sm text-gray-600">•••• •••• •••• 1234</p>
                  </div>
                </div>
                <button className="text-blue-600 text-sm">Change</button>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handlePayment}
                disabled={rating === 0}
                className="w-full py-4"
              >
                Pay ₹{total}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDispute(true)}
                className="w-full py-3"
              >
                Report Issue
              </Button>
            </div>
          </>
        ) : (
          /* Payment Success */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-green-600 text-3xl"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for using Peter Parker</p>
            
            <Card className="p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-semibold">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="text-sm">PP{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Download Receipt
              </Button>
              <p className="text-sm text-gray-500">Redirecting to home...</p>
            </div>
          </div>
        )}

        {/* Dispute Modal */}
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
                  variant="outline" 
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
