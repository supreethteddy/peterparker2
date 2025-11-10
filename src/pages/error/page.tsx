
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

interface ErrorPageProps {
  type: 'no-valets' | 'driver-cancelled' | 'verification-failed' | 'payment-declined';
}

export default function ErrorPage({ type = 'no-valets' }: ErrorPageProps) {
  const navigate = useNavigate();

  const errorConfig = {
    'no-valets': {
      icon: 'ri-user-search-line',
      title: 'No Valets Available',
      message: 'Sorry, no Peter Parkers are available in your area right now.',
      suggestions: [
        'Try again in a few minutes',
        'Check nearby locations',
        'Schedule for later'
      ],
      primaryAction: { text: 'Try Again', action: () => navigate('/') },
      secondaryAction: { text: 'Schedule Later', action: () => navigate('/schedule') }
    },
    'driver-cancelled': {
      icon: 'ri-close-circle-line',
      title: 'Valet Cancelled',
      message: 'Your assigned valet had to cancel due to an emergency.',
      suggestions: [
        'We\'ll find you another valet',
        'No charges applied',
        'Priority booking for next request'
      ],
      primaryAction: { text: 'Find New Valet', action: () => navigate('/') },
      secondaryAction: { text: 'Contact Support', action: () => navigate('/support') }
    },
    'verification-failed': {
      icon: 'ri-shield-cross-line',
      title: 'Verification Failed',
      message: 'We couldn\'t verify your identity. Please try again.',
      suggestions: [
        'Ensure good lighting for selfie',
        'Remove sunglasses/hat',
        'Try again with clear photo'
      ],
      primaryAction: { text: 'Retry Verification', action: () => navigate('/handover') },
      secondaryAction: { text: 'Contact Support', action: () => navigate('/support') }
    },
    'payment-declined': {
      icon: 'ri-bank-card-line',
      title: 'Payment Declined',
      message: 'Your payment method was declined. Please update and try again.',
      suggestions: [
        'Check card details',
        'Ensure sufficient balance',
        'Try different payment method'
      ],
      primaryAction: { text: 'Update Payment', action: () => navigate('/payment-methods') },
      secondaryAction: { text: 'Use Different Card', action: () => navigate('/payment') }
    }
  };

  const config = errorConfig[type];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Service Issue"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/')}
      />

      <div className="pt-20 px-4 pb-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className={`${config.icon} text-red-600 text-3xl`}></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">{config.title}</h2>
          <p className="text-gray-600 mb-8">{config.message}</p>
        </div>

        {/* Suggestions */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">What you can do:</h3>
          <div className="space-y-2">
            {config.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={config.primaryAction.action} className="w-full py-4">
            {config.primaryAction.text}
          </Button>
          <Button 
            variant="outline" 
            onClick={config.secondaryAction.action}
            className="w-full py-3"
          >
            {config.secondaryAction.text}
          </Button>
        </div>

        {/* Emergency Contact */}
        {type === 'verification-failed' && (
          <Card className="p-4 mt-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-center space-x-3">
              <i className="ri-phone-line text-yellow-600 text-xl"></i>
              <div>
                <h3 className="font-medium text-yellow-800">Need immediate help?</h3>
                <p className="text-sm text-yellow-700">Call our 24/7 support: +91 80-4567-8900</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
