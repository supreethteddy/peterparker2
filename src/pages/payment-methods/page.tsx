import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import BottomNav from '../../components/feature/BottomNav';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet';
  name: string;
  details: string;
  isDefault: boolean;
  last4?: string;
  expiry?: string;
}

export default function PaymentMethodsPage() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa Card',
      details: '**** **** **** 1234',
      isDefault: true,
      last4: '1234',
      expiry: '12/25',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'card' | 'upi' | 'wallet'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
    walletType: 'Paytm',
  });

  useEffect(() => {
    const saved = localStorage.getItem('paymentMethods');
    if (saved) {
      setPaymentMethods(JSON.parse(saved));
    }
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleAddPaymentMethod = () => {
    let newMethod: PaymentMethod;

    if (formType === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) return;
      const last4 = formData.cardNumber.replace(/\s/g, '').slice(-4);
      newMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: formData.cardName,
        details: `**** **** **** ${last4}`,
        isDefault: paymentMethods.length === 0,
        last4,
        expiry: formData.expiry,
      };
    } else if (formType === 'upi') {
      if (!formData.upiId) return;
      newMethod = {
        id: Date.now().toString(),
        type: 'upi',
        name: 'UPI',
        details: formData.upiId,
        isDefault: paymentMethods.length === 0,
      };
    } else {
      newMethod = {
        id: Date.now().toString(),
        type: 'wallet',
        name: formData.walletType,
        details: `${formData.walletType} Wallet`,
        isDefault: paymentMethods.length === 0,
      };
    }

    if (newMethod.isDefault) {
      setPaymentMethods(prev => prev.map(p => ({ ...p, isDefault: false })));
    }

    const updated = [...paymentMethods, newMethod];
    setPaymentMethods(updated);
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
    resetForm();
  };

  const handleDeletePayment = (id: string) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      const updated = paymentMethods.filter(p => p.id !== id);
      setPaymentMethods(updated);
      localStorage.setItem('paymentMethods', JSON.stringify(updated));
    }
  };

  const handleSetDefault = (id: string) => {
    const updated = paymentMethods.map(p => ({
      ...p,
      isDefault: p.id === id
    }));
    setPaymentMethods(updated);
    localStorage.setItem('paymentMethods', JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      upiId: '',
      walletType: 'Paytm',
    });
    setShowAddForm(false);
    setFormType('card');
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return 'ri-bank-card-line';
      case 'upi':
        return 'ri-qr-code-line';
      case 'wallet':
        return 'ri-wallet-line';
      default:
        return 'ri-money-rupee-circle-line';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom animate-in">
      <Header 
        title="Payment Methods" 
        onLeftClick={() => navigate(-1)}
      />

      <div className="pt-20 px-4 pb-24">
        {/* Payment Methods List */}
        {!showAddForm && (
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method, index) => (
              <Card 
                key={method.id} 
                className="p-5 animate-in hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md ${
                      method.type === 'card' 
                        ? 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59]'
                        : method.type === 'upi'
                        ? 'bg-gradient-to-r from-[#66BD59] to-[#34C0CA]'
                        : 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59]'
                    }`}>
                      <i className={`${getPaymentIcon(method.type)} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-[#0F1415]">{method.name}</h3>
                        {method.isDefault && (
                          <span className="px-2 py-0.5 text-xs font-medium text-[#66BD59] bg-[#66BD59]/10 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">{method.details}</p>
                      {method.expiry && (
                        <p className="text-xs text-neutral-500 mt-1">Expires {method.expiry}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="px-3 py-1.5 text-xs font-medium text-[#66BD59] bg-[#66BD59]/10 rounded-lg hover:bg-[#66BD59]/20 transition-colors"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePayment(method.id)}
                      className="px-3 py-1.5 text-xs font-medium text-[#EF4444] bg-[#EF4444]/10 rounded-lg hover:bg-[#EF4444]/20 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Payment Method Form */}
        {showAddForm ? (
          <Card className="p-6 mb-6 animate-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F1415]">Add Payment Method</h2>
              <button
                onClick={resetForm}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-all transform hover:scale-110 active:scale-95"
              >
                <i className="ri-close-line text-2xl text-neutral-600"></i>
              </button>
            </div>

            {/* Payment Type Selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {(['card', 'upi', 'wallet'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFormType(type)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 ${
                    formType === type
                      ? 'border-[#66BD59] bg-[#66BD59]/10 text-[#66BD59] font-semibold shadow-md'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#34C0CA]/50'
                  }`}
                >
                  <i className={`${getPaymentIcon(type)} text-2xl mb-1 block`}></i>
                  <span className="text-xs font-medium capitalize">{type}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {formType === 'card' && (
                <>
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                    maxLength={19}
                    leftIcon={<i className="ri-bank-card-line"></i>}
                    required
                  />
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    leftIcon={<i className="ri-user-line"></i>}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setFormData({ ...formData, expiry: value });
                      }}
                      maxLength={5}
                      required
                    />
                    <Input
                      label="CVV"
                      type="password"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                      maxLength={3}
                      required
                    />
                  </div>
                </>
              )}

              {formType === 'upi' && (
                <Input
                  label="UPI ID"
                  placeholder="yourname@paytm"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  leftIcon={<i className="ri-qr-code-line"></i>}
                  required
                />
              )}

              {formType === 'wallet' && (
                <div>
                  <label className="block text-sm font-medium text-[#0F1415] mb-3">Wallet Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                      <button
                        key={wallet}
                        onClick={() => setFormData({ ...formData, walletType: wallet })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 ${
                          formData.walletType === wallet
                            ? 'border-[#66BD59] bg-[#66BD59]/10 text-[#66BD59] font-semibold shadow-md'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#34C0CA]/50'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={resetForm}
                  variant="secondary"
                  fullWidth
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPaymentMethod}
                  fullWidth
                  size="lg"
                  disabled={
                    (formType === 'card' && (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv)) ||
                    (formType === 'upi' && !formData.upiId)
                  }
                >
                  Add Payment Method
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button
            onClick={() => setShowAddForm(true)}
            variant="secondary"
            fullWidth
            size="lg"
            className="mb-6"
          >
            <i className="ri-add-line mr-2 text-xl"></i>
            Add Payment Method
          </Button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

