import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { HiStar } from 'react-icons/hi';

export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ratingLabels: { [key: number]: string } = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  };

  const handleTipSelect = (amount: number) => {
    setTip(amount);
    setCustomTip('');
  };

  const handleCustomTip = () => {
    const amount = parseInt(customTip);
    if (!isNaN(amount) && amount > 0) {
      setTip(amount);
    }
  };

  const finalTip = customTip && parseInt(customTip) > 0 ? parseInt(customTip) : tip;

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 safe-top safe-bottom flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#66BD59] to-[#52A547] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#0F1415] mb-2 text-center">Thank you</h2>
        <p className="text-neutral-600 mb-8 text-center">
          Thank you for your valuable feedback and tip
        </p>
        <Button
          onClick={() => navigate('/home')}
          fullWidth
          size="lg"
          className="text-lg font-bold"
        >
          Back Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header 
        title="Review"
        onLeftClick={() => navigate('/home')}
      />

      <div className="pt-20 px-4 pb-6">
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-xl font-bold">
              {valet?.name?.charAt(0) || 'V'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#0F1415] mb-1">{valet?.name || 'Valet Driver'}</h3>
              <p className="text-sm text-neutral-600">⭐ {valet?.rating || '4.9'} ({valet?.reviews || 531} reviews)</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="font-bold text-[#0F1415] mb-4 text-center">Rate Your Experience</h3>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`w-12 h-12 transition-transform hover:scale-110 ${
                  star <= rating ? 'text-yellow-400' : 'text-neutral-300'
                }`}
              >
                <HiStar className={`w-full h-full ${star <= rating ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center font-semibold text-[#0F1415] text-lg">
              {ratingLabels[rating]}
            </p>
          )}
          {rating > 0 && (
            <p className="text-center text-sm text-neutral-600 mt-2">
              You rated {valet?.name || 'Valet'} {rating} star{rating !== 1 ? 's' : ''}
            </p>
          )}
        </Card>

        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-[#0F1415] mb-3">Write Your Feedback</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your text"
            rows={4}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/10 focus:border-[#34C0CA] text-base resize-none"
          />
        </Card>

        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-[#0F1415] mb-4">
            Give some tips to {valet?.name || 'Valet'}
          </h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 5, 10, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => handleTipSelect(amount)}
                className={`py-3 px-2 rounded-xl font-semibold transition-all ${
                  tip === amount && !customTip
                    ? 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white shadow-lg'
                    : 'bg-white border-2 border-neutral-200 text-[#0F1415] hover:border-[#34C0CA]'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter other amount"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value);
                if (e.target.value) setTip(0);
              }}
              className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/10 focus:border-[#34C0CA] text-base"
            />
            {customTip && (
              <Button
                onClick={handleCustomTip}
                className="px-6"
              >
                Apply
              </Button>
            )}
          </div>
        </Card>

        <Button
          onClick={handleSubmit}
          disabled={rating === 0}
          fullWidth
          size="lg"
          className="text-lg font-bold"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
