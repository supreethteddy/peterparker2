import { useState } from 'react';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import BottomNav from '../../components/feature/BottomNav';
import { MapPin, Home, Briefcase, Heart, Plus, Edit2, Trash2, Star } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'favorite' | 'other';
  isDefault: boolean;
}

export default function SavedAddressesPage() {
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      address: '123, Koramangala 5th Block, Bangalore - 560095',
      type: 'home',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      address: 'UB City, Vittal Mallya Road, Bangalore - 560001',
      type: 'work',
      isDefault: false,
    },
    {
      id: '3',
      name: 'Phoenix MarketCity',
      address: 'Whitefield Main Road, Mahadevapura, Bangalore',
      type: 'favorite',
      isDefault: false,
    },
    {
      id: '4',
      name: 'Forum Mall',
      address: 'Hosur Road, Koramangala, Bangalore - 560095',
      type: 'favorite',
      isDefault: false,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      case 'favorite':
        return <Heart className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-primary-accent bg-primary-accent/10';
      case 'work':
        return 'text-secondary-accent bg-secondary-accent/10';
      case 'favorite':
        return 'text-status-error bg-status-error/10';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header title="Saved Addresses" />
      
      <div className="pt-20 pb-24 px-6 max-w-md mx-auto">
        {/* Quick Add */}
        <Button
          variant="primary"
          fullWidth
          size="lg"
          className="mb-6"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add New Address
        </Button>

        {/* Addresses List */}
        <div className="space-y-3">
          {addresses.map((address) => (
            <Card key={address.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getColor(address.type)}`}>
                  {getIcon(address.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-body font-semibold text-primary-dark">{address.name}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-primary-accent/10 text-primary-accent rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-caption text-neutral-600 line-clamp-2">{address.address}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
                    <Edit2 className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-status-error/10 flex items-center justify-center transition-colors">
                    <Trash2 className="w-4 h-4 text-status-error" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no addresses) */}
        {addresses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-h2 font-semibold text-primary-dark mb-2">No saved addresses</h3>
            <p className="text-body text-neutral-600 mb-6">
              Add your frequently visited places for faster booking
            </p>
            <Button variant="primary">
              <Plus className="mr-2 w-5 h-5" />
              Add Address
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

