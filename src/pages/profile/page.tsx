
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: 'Loading...',
    phone: '',
    email: '',
    vehicle: 'No vehicle set',
    memberSince: 'January 2024',
    totalTrips: 0,
    rating: 4.8
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const [profileResponse, vehiclesResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userData.user.id).single(),
        supabase.from('vehicles').select('*').eq('user_id', userData.user.id).eq('is_primary', true).single()
      ]);

      let vehicleStr = 'No primary vehicle';
      if (vehiclesResponse.data) {
        const v = vehiclesResponse.data;
        vehicleStr = `${v.make} ${v.model} - ${v.license_plate}`;
      }

      if (profileResponse.data) {
        setUserProfile({
          name: profileResponse.data.full_name || 'User',
          phone: profileResponse.data.phone || '',
          email: profileResponse.data.email || '',
          vehicle: vehicleStr,
          memberSince: new Date(profileResponse.data.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
          totalTrips: 0, // Would query bookings
          rating: 4.8
        });
      }
    };
    fetchProfile();
  }, []);

  const menuItems = [
    {
      icon: 'ri-user-line',
      title: 'Edit Profile',
      action: () => navigate('/edit-profile')
    },
    {
      icon: 'ri-car-line',
      title: 'Vehicle Details',
      action: () => navigate('/vehicle-details')
    },
    {
      icon: 'ri-bank-card-line',
      title: 'Payment Methods',
      action: () => navigate('/payment-methods')
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Insurance Settings',
      action: () => navigate('/insurance-settings')
    },
    {
      icon: 'ri-notification-line',
      title: 'Notifications',
      action: () => navigate('/notifications')
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Saved Addresses',
      action: () => navigate('/saved-addresses')
    },
    {
      icon: 'ri-gift-line',
      title: 'Promotions & Offers',
      action: () => navigate('/promotions')
    },
    {
      icon: 'ri-settings-line',
      title: 'Settings',
      action: () => navigate('/settings')
    },
    {
      icon: 'ri-phone-line',
      title: 'Emergency Contacts',
      action: () => navigate('/emergency')
    },
    {
      icon: 'ri-logout-circle-line',
      title: 'Logout',
      action: () => setShowLogout(true),
      danger: true
    }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      <Header title="Profile" />

      <div className="pt-20 px-4 pb-24">
        {/* Profile Header */}
        <Card className="p-6 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white">
              <span className="text-2xl font-bold">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-[#0F1415] mb-1">{userProfile.name}</h2>
              <p className="text-base text-neutral-600 mb-1">{userProfile.phone}</p>
              <p className="text-sm text-neutral-500">Member since {userProfile.memberSince}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#66BD59]">{userProfile.totalTrips}</h3>
              <p className="text-sm text-neutral-600 mt-1">Total Trips</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#66BD59]">{userProfile.rating}</h3>
              <p className="text-sm text-neutral-600 mt-1">Rating</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#66BD59]">₹240</h3>
              <p className="text-sm text-neutral-600 mt-1">Saved</p>
            </div>
          </div>
        </Card>

        {/* Vehicle Info */}
        <Card className="p-4 mb-6 animate-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#66BD59]/10 flex items-center justify-center">
              <i className="ri-car-line text-[#66BD59] text-xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#0F1415]">Registered Vehicle</h3>
              <p className="text-sm text-neutral-600">{userProfile.vehicle}</p>
            </div>
            <i className="ri-arrow-right-s-line text-neutral-400"></i>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition-all animate-in"
              onClick={item.action}
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${item.danger ? 'bg-[#EF4444]/10' : 'bg-[#66BD59]/10'
                  }`}>
                  <i className={`${item.icon} text-xl transition-transform group-hover:scale-110 ${item.danger ? 'text-[#EF4444]' : 'text-[#66BD59]'
                    }`}></i>
                </div>
                <div className="flex-1">
                  <h3 className={`text-base font-medium transition-colors ${item.danger ? 'text-[#EF4444]' : 'text-[#0F1415]'}`}>
                    {item.title}
                  </h3>
                </div>
                <i className="ri-arrow-right-s-line text-neutral-400 transition-transform group-hover:translate-x-1"></i>
              </div>
            </Card>
          ))}
        </div>

        {/* App Version */}
        <div className="text-center mt-8">
          <p className="text-caption text-neutral-500">quickParker v1.0.0</p>
        </div>
      </div>

      {/* Logout Confirmation */}
      {showLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <Card className="w-full max-w-sm p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-logout-circle-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLogout(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="flex-1"
                >
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
