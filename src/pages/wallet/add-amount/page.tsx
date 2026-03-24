import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import Input from '../../../components/base/Input';
import Button from '../../../components/base/Button';
import { HiArrowLeft, HiCreditCard } from 'react-icons/hi';

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
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchMethods = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data } = await supabase.from('payment_methods').select('*').eq('user_id', userData.user.id);

      if (data && data.length > 0) {
        const methods = data.map((dbMethod: any) => ({
          id: dbMethod.id,
          type: dbMethod.type,
          name: dbMethod.details?.name || dbMethod.provider,
          number: dbMethod.details?.number || '',
          expiry: dbMethod.details?.expiry
        }));
        setPaymentMethods(methods);
        setSelectedPaymentMethod(methods[0].id);
      } else {
        setPaymentMethods([]);
      }
    };
    fetchMethods();
  }, []);

  const handleConfirm = async () => {
    if (amount && selectedPaymentMethod) {
      setIsProcessing(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        setIsProcessing(false);
        return;
      }

      let { data: walletData } = await supabase.from('wallets').select('id, balance').eq('user_id', userData.user.id).single();

      if (!walletData) {
        // Create wallet if needed
        const { data: newWallet } = await supabase.from('wallets').insert({ user_id: userData.user.id, balance: 0 }).select().single();
        walletData = newWallet;
      }

      const addedAmount = parseFloat(amount);
      const newBalance = Number(walletData?.balance || 0) + addedAmount;

      if (walletData?.id) {
        await supabase.from('wallets').update({ balance: newBalance }).eq('id', walletData.id);

        await supabase.from('wallet_transactions').insert({
          wallet_id: walletData.id,
          amount: addedAmount,
          type: 'credit',
          status: 'completed',
          description: 'Top-up'
        });
      }

      setIsProcessing(false);
      navigate('/wallet/success', { state: { amount: addedAmount } });
    }
  };

  const formatCardNumber = (number: string) => {
    if (!number) return '';
    return `**** **** ${number}`;
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold flex items-center gap-2"
        >
          <HiArrowLeft className="w-5 h-5" />
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
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedPaymentMethod === method.id
                    ? 'bg-[#66BD59]/10 border-[#66BD59]'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' && <HiCreditCard className="w-5 h-5 text-[#66BD59]" />}
                    {method.type === 'email' && (
                      <div className="w-8 h-8 rounded-full bg-[#66BD59]/10 flex items-center justify-center">
                        <span className="text-[#66BD59] font-bold text-sm">P</span>
                      </div>
                    )}
                    {method.type === 'cash' && (
                      <div className="w-8 h-8 rounded-full bg-[#66BD59]/10 flex items-center justify-center">
                        <span className="text-[#66BD59] font-bold text-lg">$</span>
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
                    <div className="w-5 h-5 rounded-full border-2 border-[#66BD59] bg-[#66BD59] flex items-center justify-center">
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
          disabled={!amount || !selectedPaymentMethod || isProcessing}
          fullWidth
          size="lg"
        >
          {isProcessing ? 'Processing...' : 'Confirm'}
        </Button>
      </div>
    </div>
  );
}
