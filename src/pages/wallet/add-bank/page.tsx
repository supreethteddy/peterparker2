import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Input from '../../../components/base/Input';
import Button from '../../../components/base/Button';
import { ArrowLeft, ChevronDown, CreditCard } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  number: string;
  expiry?: string;
}

export default function AddBankPage() {
  const navigate = useNavigate();
  const [paymentMethodType, setPaymentMethodType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [existingMethods, setExistingMethods] = useState<PaymentMethod[]>([]);

  const paymentMethodTypes = [
    'Bank Account',
    'Credit Card',
    'Debit Card',
    'UPI',
    'Digital Wallet',
  ];

  useEffect(() => {
    // Load existing payment methods
    const savedMethods = localStorage.getItem('paymentMethods');
    if (savedMethods) {
      setExistingMethods(JSON.parse(savedMethods));
    }
  }, []);

  const handleSave = () => {
    if (paymentMethodType && accountNumber) {
      // Load existing payment methods
      const savedMethods = localStorage.getItem('paymentMethods');
      const methods = savedMethods ? JSON.parse(savedMethods) : [];

      // Create new payment method
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: paymentMethodType.toLowerCase().includes('card') ? 'card' : 'bank',
        name: paymentMethodType,
        number: accountNumber,
        expiry: '12/26',
      };

      // Add to list
      methods.push(newMethod);
      localStorage.setItem('paymentMethods', JSON.stringify(methods));

      // Navigate back to add amount page
      navigate('/wallet/add-amount');
    }
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-xl font-bold text-[#0F1415] flex-1 text-center">Amount</h1>
        <div className="w-20"></div>
      </div>

      <div className="px-6 pb-8">
        {/* Payment Method Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0F1415] mb-2">
            Select Payment Method
          </label>
          <div className="relative">
            <select
              value={paymentMethodType}
              onChange={(e) => setPaymentMethodType(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-base font-medium focus:outline-none focus:ring-4 focus:ring-[#66BD59]/10 focus:border-[#66BD59] appearance-none pr-10 transition-all duration-200"
            >
              <option value="">Select Payment Method</option>
              {paymentMethodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>
        </div>

        {/* Account Number Input */}
        <div className="mb-6">
          <Input
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!paymentMethodType || !accountNumber}
          fullWidth
          size="lg"
        >
          Save Payment Method
        </Button>

        {/* Existing Payment Methods Preview */}
        {existingMethods.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#0F1415] mb-4">Payment Methods</h2>
            <div className="space-y-3">
              {existingMethods.slice(0, 1).map((method) => (
                <Card
                  key={method.id}
                  className="p-4 bg-[#66BD59]/10 border-[#66BD59] border-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#66BD59]" />
                      <div>
                        <p className="font-semibold text-[#0F1415]">
                          {method.type === 'card' ? `${method.name} **** **** ${method.number}` : method.name}
                        </p>
                        {method.expiry && (
                          <p className="text-xs text-neutral-600">Expires: {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#66BD59] bg-[#66BD59] flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
