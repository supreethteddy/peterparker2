import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Header from '../../components/feature/Header';
import { CreditCard, Wallet } from 'lucide-react';

export default function PaymentSetupPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'wallet'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isDefault, setIsDefault] = useState(true);

  const handleSaveCard = () => {
    if (cardData.number && cardData.name && cardData.expiry && cardData.cvv) {
      localStorage.setItem('paymentMethod', JSON.stringify({
        type: 'card',
        ...cardData,
        isDefault,
      }));
      navigate('/insurance-setup');
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      <Header 
        title="Set Up Payment" 
        onLeftClick={() => navigate(-1)}
      />
      
      <div className="pt-20 pb-8 px-6 max-w-md mx-auto">
        {/* Payment Methods */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setSelectedMethod('card')}
            className={`p-4 bg-white border-2 rounded-xl transition-all text-center ${
              selectedMethod === 'card' 
                ? 'border-green-700 shadow-md bg-green-50/100' 
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <CreditCard className={`w-8 h-8 mb-2 mx-auto ${
              selectedMethod === 'card' ? 'text-green-700 bg-green-50/100' : 'text-neutral-400'
            }`} />
            <p className={`text-base font-medium ${
              selectedMethod === 'card' ? 'text-green-700' : 'text-[#0F1415]'
            }`}>Card</p>
          </button>
          
          <button
            onClick={() => setSelectedMethod('wallet')}
            className={`p-4 bg-white border-2 rounded-xl transition-all text-center ${
              selectedMethod === 'wallet' 
                ? 'border-green-700 shadow-md bg-green-50/100' 
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <Wallet className={`w-8 h-8 mb-2 mx-auto ${
              selectedMethod === 'wallet' ? 'text-green-700' : 'text-neutral-400'
            }`} />
            <p className={`text-base font-medium ${
              selectedMethod === 'wallet' ? 'text-green-700' : 'text-[#0F1415]'
            }`}>Wallet/UPI</p>
          </button>
        </div>

        {/* Card Form */}
        {selectedMethod === 'card' && (
          <Card className="p-6 bg-green-50/100 border-neutral-200 border-2 rounded-xl">
            <h2 className="text-xl font-bold mb-6 text-[#0F1415]">Add Card</h2>
            
            <div className="space-y-4">
              <Input
                placeholder="Card Number"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                maxLength={19}
              />

              <Input
                placeholder="Name on Card"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Expiry"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                  maxLength={5}
                />

                <Input
                  type="password"
                  placeholder="CVV"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                  maxLength={3}
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-5 h-5 rounded border-neutral-300 text-green-700 focus:ring-green-700 focus:ring-2"
                />
                <span className="text-base text-[#0F1415] font-medium">Set as default payment method</span>
              </label>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  fullWidth
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCard}
                  disabled={!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv}
                  fullWidth
                  size="lg"
                >
                  Save
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Wallet/UPI Option */}
        {selectedMethod === 'wallet' && (
          <Card className="p-6 bg-green-50/100 border-neutral-200 border-2 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-[#0F1415]">Wallet/UPI</h2>
            <p className="text-base text-neutral-600 mb-6">
              You can add your wallet or UPI ID during checkout. For now, let's continue.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                fullWidth
                size="lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => navigate('/insurance-setup')}
                fullWidth
                size="lg"
              >
                Continue
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

