import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import BottomNav from '../../components/feature/BottomNav';
import { Gift, Tag, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function PromotionsPage() {
  const promotions = [
    {
      id: 1,
      title: 'First Ride Free',
      description: 'Get ₹100 off on your first valet booking',
      code: 'FIRST100',
      validUntil: '2024-02-15',
      discount: '₹100',
      type: 'first-ride',
      gradient: 'from-primary-accent to-secondary-accent',
    },
    {
      id: 2,
      title: 'Weekend Special',
      description: '20% off on all weekend bookings',
      code: 'WEEKEND20',
      validUntil: '2024-02-20',
      discount: '20%',
      type: 'discount',
      gradient: 'from-secondary-accent to-primary-accent',
    },
    {
      id: 3,
      title: 'Refer & Earn',
      description: 'Get ₹50 for each friend you refer',
      code: 'REFER50',
      validUntil: '2024-03-01',
      discount: '₹50',
      type: 'referral',
      gradient: 'from-primary-accent via-secondary-accent to-primary-accent',
    },
    {
      id: 4,
      title: 'Loyalty Bonus',
      description: 'Extra ₹30 off for loyal customers',
      code: 'LOYAL30',
      validUntil: '2024-02-28',
      discount: '₹30',
      type: 'loyalty',
      gradient: 'from-secondary-accent to-primary-accent',
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Could show a toast notification here
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      <Header title="Promotions & Offers" />
      
      <div className="pt-20 pb-24 px-6 max-w-md mx-auto">
        {/* Header Banner */}
        <Card className="p-6 mb-6 bg-white border-2 border-green-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-700/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-green-700" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1 text-[#0F1415]">Special Offers</h2>
              <p className="text-base text-neutral-600">Save more on every trip</p>
            </div>
          </div>
          <Badge variant="info" size="md" className="bg-green-700/10 text-green-700 border-green-700/30">
            {promotions.length} Active Offers
          </Badge>
        </Card>

        {/* Promotions List */}
        <div className="space-y-4 mb-6">
          {promotions.map((promo) => (
            <Card key={promo.id} className="p-0 overflow-hidden">
              <div className="bg-green-700 p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-5 h-5" />
                      <h3 className="text-xl font-semibold">{promo.title}</h3>
                    </div>
                    <p className="text-base opacity-90 mb-3">{promo.description}</p>
                    <div className="flex items-center gap-4 text-sm opacity-80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Valid until {promo.validUntil}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold mb-1">{promo.discount}</div>
                    <Badge variant="neutral" size="sm" className="bg-white/20 text-white border-white/30">
                      OFF
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Promo Code</p>
                    <p className="text-base font-mono font-semibold text-[#0F1415]">{promo.code}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCode(promo.code)}
                  >
                    Copy Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* How to Use */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-[#0F1415] mb-4">How to Use</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                1
              </div>
              <div className="flex-1">
                <p className="text-base text-[#0F1415]">Copy the promo code</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                2
              </div>
              <div className="flex-1">
                <p className="text-base text-[#0F1415]">Book your valet service</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                3
              </div>
              <div className="flex-1">
                <p className="text-base text-[#0F1415]">Apply code at checkout</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}

