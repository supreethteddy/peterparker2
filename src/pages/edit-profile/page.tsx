import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import BottomNav from '../../components/feature/BottomNav';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '',
    gender: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    
    setIsSaving(false);
    navigate('/profile');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom animate-in">
      <Header 
        title="Edit Profile" 
        onLeftClick={() => navigate(-1)}
      />

      <div className="pt-20 px-4 pb-24">
        {/* Profile Picture Section */}
        <Card className="p-6 mb-6 animate-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-105">
                <span className="text-3xl font-bold">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#34C0CA] text-white flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all hover:scale-110 active:scale-95">
                <i className="ri-camera-line text-xl"></i>
              </button>
            </div>
            <p className="text-sm text-neutral-600">Tap to change profile picture</p>
          </div>
        </Card>

        {/* Form Section */}
        <div className="space-y-4">
          <Card className="p-6 animate-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-[#0F1415] mb-4">Personal Information</h3>
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                leftIcon={<i className="ri-user-line"></i>}
                placeholder="Enter your full name"
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                leftIcon={<i className="ri-mail-line"></i>}
                placeholder="Enter your email"
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={errors.phone}
                leftIcon={<i className="ri-phone-line"></i>}
                placeholder="Enter your phone number"
              />

              <div>
                <label className="block text-sm font-medium text-[#0F1415] mb-2">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  leftIcon={<i className="ri-calendar-line"></i>}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1415] mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => handleChange('gender', gender)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 ${
                        formData.gender === gender
                          ? 'border-[#66BD59] bg-[#66BD59]/10 text-[#66BD59] font-semibold shadow-md'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#34C0CA]/50'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-[#0F1415] mb-4">Address</h3>
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter your address"
              leftIcon={<i className="ri-map-pin-line"></i>}
            />
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-6 animate-in" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={handleSave}
            fullWidth
            size="lg"
            loading={isSaving}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

