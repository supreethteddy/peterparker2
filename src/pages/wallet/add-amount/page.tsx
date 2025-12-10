import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Input from '../../../components/base/Input';
import Button from '../../../components/base/Button';
import { ArrowLeft, CreditCard } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'cash' | 'email';
  name: string;
  number: string;
  expiry?: string;
  icon?: string;
}

export default function AddAmountPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    // Load payment methods from localStorage
    const savedMethods = localStorage.getItem('paymentMethods');
    if (savedMethods) {
      const methods = JSON.parse(savedMethods);
      setPaymentMethods(methods);
      // Auto-select first method if available
      if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].id);
      }
    } else {
      // Default payment methods
      const defaultMethods: PaymentMethod[] = [
        {
          id: '1',
          type: 'card',
          name: 'VISA',
          number: '8970',
          expiry: '12/26',
        },
        {
          id: '2',
          type: 'card',
          name: 'Mastercard',
          number: '5678',
          expiry: '06/25',
        },
        {
          id: '3',
          type: 'email',
          name: 'Email',
          number: 'mailaddress@mail.com',
          expiry: '12/26',
        },
        {
          id: '4',
          type: 'cash',
          name: 'Cash',
          number: '',
          expiry: '12/26',
        },
      ];
      setPaymentMethods(defaultMethods);
      setSelectedPaymentMethod(defaultMethods[0].id);
      localStorage.setItem('paymentMethods', JSON.stringify(defaultMethods));
    }
  }, []);

  const handleConfirm = () => {
    if (amount && selectedPaymentMethod) {
      // Store transaction data
      const transactionData = {
        amount: parseFloat(amount),
        paymentMethodId: selectedPaymentMethod,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('pendingWalletTransaction', JSON.stringify(transactionData));
      navigate('/wallet/success');
    }
  };

  const formatCardNumber = (number: string) => {
    if (!number) return '';
    return `**** **** ${number}`;
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Status Bar Area */}
      <div className="flex items-center justify-between px-6 pt-safe-top pb-2">
        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900 rounded-sm" style={{ width: '65%' }}></div>
          </div>
          <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
          <div className="w-6 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900 rounded-sm m-0.5" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

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
        {/* Amount Input */}
        <div className="mb-6">
          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl"
          />
        </div>

        {/* Add Payment Method Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/wallet/add-bank')}
            className="text-blue-600 text-sm font-medium underline"
          >
            Add payment Method
          </button>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#0F1415] mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedPaymentMethod === method.id
                    ? 'bg-green-50/100 border-green-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' && <CreditCard className="w-5 h-5 text-green-700" />}
                    {method.type === 'email' && (
                      <div className="w-8 h-8 rounded-full bg-green-700/10 flex items-center justify-center">
                        <span className="text-green-700 font-bold text-sm">P</span>
                      </div>
                    )}
                    {method.type === 'cash' && (
                      <div className="w-8 h-8 rounded-full bg-green-700/10 flex items-center justify-center">
                        <span className="text-green-700 font-bold text-lg">$</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[#0F1415]">
                        {method.type === 'card' ? `${method.name} ${formatCardNumber(method.number)}` : method.name}
                      </p>
                      {method.type === 'email' && (
                        <p className="text-sm text-neutral-600">{method.number}</p>
                      )}
                      {method.expiry && (
                        <p className="text-xs text-neutral-600">Expires: {method.expiry}</p>
                      )}
                    </div>
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <div className="w-5 h-5 rounded-full border-2 border-green-700 bg-green-700 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          disabled={!amount || !selectedPaymentMethod}
          fullWidth
          size="lg"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
