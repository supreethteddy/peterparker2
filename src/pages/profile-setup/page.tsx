import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Header from '../../components/feature/Header';
import { HiCamera, HiChevronDown } from 'react-icons/hi';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    countryCode: '+880',
    email: '',
    street: '',
    city: '',
    district: '',
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Load signup data and auto-fill
  useEffect(() => {
    const signupDataStr = localStorage.getItem('signupData');
    if (signupDataStr) {
      try {
        const signupData = JSON.parse(signupDataStr);
        setFormData(prev => ({
          ...prev,
          fullName: signupData.fullName || '',
          email: signupData.email || '',
          mobileNumber: signupData.phone || '',
          countryCode: signupData.countryCode || '+880',
        }));
      } catch (error) {
        console.error('Error parsing signup data:', error);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (formData.fullName && formData.email && formData.mobileNumber) {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/vehicle-setup');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfilePhoto(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      <Header 
        title="Profile" 
        onLeftClick={() => navigate(-1)}
      />
      
      <div className="pt-20 pb-8 px-6 max-w-md mx-auto">
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center pt-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-neutral-200" />
                )}
              </div>
              <button
                onClick={handlePhotoUpload}
                className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full flex items-center justify-center shadow-md hover:from-[#2BA8B2] hover:to-[#52A547] transition-colors"
              >
                <HiCamera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />

            {/* Mobile Number with Country Code */}
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-base font-medium focus:outline-none focus:ring-4 focus:ring-[#66BD59]/10 focus:border-[#66BD59] appearance-none pr-10 transition-all duration-200 w-24"
                >
                  <option value="+880">+880</option>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <HiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#66BD59] pointer-events-none" />
              </div>
              <Input
                type="tel"
                placeholder="Your mobile number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                className="flex-1"
              />
            </div>

            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              placeholder="Street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            />

            {/* City Dropdown */}
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-base font-medium focus:outline-none focus:ring-4 focus:ring-[#66BD59]/10 focus:border-[#66BD59] appearance-none pr-10 transition-all duration-200 text-[#0F1415]"
              >
                <option value="">City</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="sylhet">Sylhet</option>
                <option value="rajshahi">Rajshahi</option>
              </select>
              <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>

            {/* District Dropdown */}
            <div className="relative">
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3.5 border-2 border-neutral-200 rounded-xl bg-white text-base font-medium focus:outline-none focus:ring-4 focus:ring-[#66BD59]/10 focus:border-[#66BD59] appearance-none pr-10 transition-all duration-200 text-[#0F1415]"
              >
                <option value="">District</option>
                <option value="dhaka">Dhaka</option>
                <option value="gazipur">Gazipur</option>
                <option value="narayanganj">Narayanganj</option>
                <option value="savar">Savar</option>
              </select>
              <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleCancel}
              variant="secondary"
              fullWidth
              size="lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.fullName || !formData.email || !formData.mobileNumber}
              fullWidth
              size="lg"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
