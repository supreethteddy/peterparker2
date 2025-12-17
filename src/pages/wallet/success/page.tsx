import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';
import { HiArrowLeft, HiX, HiCheckCircle } from 'react-icons/hi';

export default function WalletSuccessPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Load transaction data
    const transactionData = localStorage.getItem('pendingWalletTransaction');
    if (transactionData) {
      const data = JSON.parse(transactionData);
      setAmount(data.amount);

      // Update wallet balance
      const walletData = localStorage.getItem('walletData');
      const currentData = walletData ? JSON.parse(walletData) : { balance: 500, totalExpend: 200 };
      currentData.balance = (currentData.balance || 500) + data.amount;
      localStorage.setItem('walletData', JSON.stringify(currentData));

      // Add transaction to history
      const transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
      transactions.unshift({
        id: Date.now(),
        type: 'credit',
        amount: data.amount,
        description: 'Top-up',
        date: 'Today',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase(),
        icon: 'green',
      });
      localStorage.setItem('walletTransactions', JSON.stringify(transactions));

      // Clear pending transaction
      localStorage.removeItem('pendingWalletTransaction');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-12 left-0 right-0 px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/wallet')}
          className="text-base text-neutral-600 hover:text-[#0F1415] font-semibold flex items-center gap-2"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-xl font-bold text-[#0F1415] flex-1 text-center">Amount</h1>
        <div className="w-20"></div>
      </div>

      {/* Success Modal */}
      <Card className="mx-6 p-8 bg-white border-2 border-neutral-200 rounded-xl max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={() => navigate('/wallet')}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
        >
          <HiX className="w-5 h-5 text-neutral-600" />
        </button>

        {/* Success Content */}
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#66BD59]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle className="w-12 h-12 text-[#66BD59]" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#0F1415] mb-2">Add Success</h2>

          {/* Message */}
          <p className="text-base text-neutral-600 mb-6">
            Your money has been add successfully
          </p>

          {/* Amount */}
          <div className="mb-8">
            <p className="text-sm text-neutral-600 mb-2">Amount</p>
            <p className="text-4xl font-bold text-[#0F1415]">${amount.toFixed(2)}</p>
          </div>

          {/* Back Home Button */}
          <Button
            onClick={() => navigate('/wallet')}
            fullWidth
            size="lg"
          >
            Back Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
