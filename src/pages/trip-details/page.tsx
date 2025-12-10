import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import { MapPin, Clock, CreditCard, Share2, Download, Star, Phone, MessageCircle, Shield } from 'lucide-react';

export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const trip = location.state?.trip || {
    id: 1,
    date: '2024-01-15',
    time: '2:30 PM',
    valet: { name: 'Rajesh Kumar', photo: '', rating: 4.8, phone: '+91 98765 43210' },
    pickup: 'Koramangala 5th Block',
    dropoff: 'Phoenix MarketCity',
    duration: '45 min',
    distance: '8.5 km',
    amount: 120,
    status: 'completed',
    rating: 5,
    vehicle: 'Honda City',
    licensePlate: 'MH12AB1234',
    receiptNumber: 'PP240115001',
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Trip Details - ${trip.receiptNumber}`,
        text: `I took a trip with quickParker on ${trip.date} at ${trip.time}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header title="Trip Details" onLeftClick={() => navigate(-1)} />
      
      <div className="pt-20 pb-8 px-6 max-w-md mx-auto">
        {/* Status Badge */}
        <div className="mb-6">
          <Badge 
            variant={trip.status === 'completed' ? 'success' : trip.status === 'cancelled' ? 'error' : 'info'}
            size="md"
            className="text-base px-4 py-2"
          >
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Badge>
        </div>

        {/* Trip Summary Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-h1 font-semibold text-primary-dark mb-1">{trip.receiptNumber}</h2>
              <p className="text-body text-neutral-600">{trip.date} • {trip.time}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center hover:bg-primary-accent/20 transition-colors"
              >
                <Share2 className="w-5 h-5 text-primary-accent" />
              </button>
              <button className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center hover:bg-primary-accent/20 transition-colors">
                <Download className="w-5 h-5 text-primary-accent" />
              </button>
            </div>
          </div>

          {/* Route */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary-accent flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-caption text-neutral-500 mb-1">Pickup</p>
                <p className="text-body font-medium text-primary-dark">{trip.pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 ml-3">
              <div className="w-0.5 h-8 bg-neutral-300 ml-2.5" />
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-status-error flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-caption text-neutral-500 mb-1">Drop-off</p>
                <p className="text-body font-medium text-primary-dark">{trip.dropoff}</p>
              </div>
            </div>
          </div>

          {/* Trip Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
            <div>
              <p className="text-caption text-neutral-500 mb-1">Duration</p>
              <p className="text-body font-medium text-primary-dark">{trip.duration}</p>
            </div>
            <div>
              <p className="text-caption text-neutral-500 mb-1">Distance</p>
              <p className="text-body font-medium text-primary-dark">{trip.distance}</p>
            </div>
          </div>
        </Card>

        {/* Valet Info */}
        <Card className="p-4 mb-6">
          <h3 className="text-h2 font-semibold text-primary-dark mb-4">Your Peter Parker</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-accent to-secondary-accent flex items-center justify-center text-white text-xl font-bold">
              {trip.valet.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-body font-semibold text-primary-dark">{trip.valet.name}</h4>
                <Badge variant="success" size="sm">Verified</Badge>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-body text-primary-dark">{trip.valet.rating}</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-primary-accent/10 text-primary-accent rounded-button text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button className="px-3 py-1.5 bg-secondary-accent/10 text-secondary-accent rounded-button text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Vehicle Info */}
        <Card className="p-4 mb-6">
          <h3 className="text-h2 font-semibold text-primary-dark mb-4">Vehicle Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-body text-neutral-600">Vehicle</span>
              <span className="text-body font-medium text-primary-dark">{trip.vehicle}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body text-neutral-600">License Plate</span>
              <span className="text-body font-medium text-primary-dark">{trip.licensePlate}</span>
            </div>
          </div>
        </Card>

        {/* Payment Breakdown */}
        <Card className="p-6 mb-6">
          <h3 className="text-h2 font-semibold text-primary-dark mb-4">Payment Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-body text-neutral-600">Base Fare</span>
              <span className="text-body font-medium text-primary-dark">₹80</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body text-neutral-600">Overtime Charges</span>
              <span className="text-body font-medium text-primary-dark">₹20</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body text-neutral-600">Platform Fee</span>
              <span className="text-body font-medium text-primary-dark">₹20</span>
            </div>
            <div className="pt-3 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-h2 font-semibold text-primary-dark">Total</span>
                <span className="text-h2 font-bold text-primary-accent">₹{trip.amount}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Insurance Status */}
        <Card variant="outlined" className="p-4 mb-6 border-secondary-accent/20 bg-secondary-accent/5">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-secondary-accent" />
            <div className="flex-1">
              <p className="text-body font-medium text-primary-dark">Trip Insurance</p>
              <p className="text-caption text-neutral-600">Active • Coverage included</p>
            </div>
            <Badge variant="success" size="sm">Protected</Badge>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" fullWidth>
            Download Invoice
          </Button>
          <Button variant="outline" fullWidth>
            Report an Issue
          </Button>
          <Button variant="outline" fullWidth>
            Start Insurance Claim
          </Button>
        </div>
      </div>
    </div>
  );
}

