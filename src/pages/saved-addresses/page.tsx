import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import BottomNav from '../../components/feature/BottomNav';
import { FaMapMarkerAlt, FaHome, FaBriefcase, FaHeart, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Address {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'favorite' | 'other';
  isDefault: boolean;
}

export default function SavedAddressesPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([
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
        return <FaHome className="w-5 h-5" />;
      case 'work':
        return <FaBriefcase className="w-5 h-5" />;
      case 'favorite':
        return <FaHeart className="w-5 h-5" />;
      default:
        return <FaMapMarkerAlt className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-[#34C0CA] bg-[#34C0CA]/10';
      case 'work':
        return 'text-[#66BD59] bg-[#66BD59]/10';
      case 'favorite':
        return 'text-[#EF4444] bg-[#EF4444]/10';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  const handleAddAddress = () => {
    // Navigate to add address page or show modal
    console.log('Add new address');
  };

  const handleEditAddress = (id: string) => {
    // Navigate to edit address page or show modal
    console.log('Edit address:', id);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom animate-in">
      <Header 
        title="Saved Addresses" 
        onLeftClick={() => navigate(-1)}
      />
      
      <div className="pt-20 pb-24 px-4 max-w-md mx-auto">
        {/* Quick Add */}
        <Button
          variant="primary"
          fullWidth
          size="lg"
          className="mb-6 animate-in"
          style={{ animationDelay: '0.1s' }}
          onClick={handleAddAddress}
        >
          <FaPlus className="mr-2 w-5 h-5" />
          Add New Address
        </Button>

        {/* Addresses List */}
        <div className="space-y-3">
          {addresses.map((address, index) => (
            <Card 
              key={address.id} 
              className="p-5 animate-in hover:shadow-lg transition-all cursor-pointer"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              onClick={() => !address.isDefault && handleSetDefault(address.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 ${getColor(address.type)}`}>
                  {getIcon(address.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-[#0F1415]">{address.name}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-[#66BD59]/10 text-[#66BD59] rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-2">{address.address}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(address.id);
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-[#66BD59] bg-[#66BD59]/10 rounded-lg hover:bg-[#66BD59]/20 transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address.id);
                    }}
                    className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-all active:scale-95"
                  >
                    <FaEdit className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                    className="w-10 h-10 rounded-lg hover:bg-[#EF4444]/10 flex items-center justify-center transition-all active:scale-95"
                  >
                    <FaTrashAlt className="w-4 h-4 text-[#EF4444]" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no addresses) */}
        {addresses.length === 0 && (
          <div className="text-center py-12 animate-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#34C0CA]/10 to-[#66BD59]/10 flex items-center justify-center mx-auto mb-4 animate-float">
              <FaMapMarkerAlt className="w-10 h-10 text-[#34C0CA]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0F1415] mb-2">No saved addresses</h3>
            <p className="text-base text-neutral-600 mb-6">
              Add your frequently visited places for faster booking
            </p>
            <Button variant="primary" onClick={handleAddAddress}>
              <FaPlus className="mr-2 w-5 h-5" />
              Add Address
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

