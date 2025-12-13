import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Header from '../../components/feature/Header';
import Badge from '../../components/base/Badge';
import { Plus, X } from 'lucide-react';

interface Vehicle {
  id: string;
  nickname?: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  isDefault: boolean;
}

export default function VehicleSetupPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    make: '',
    model: '',
    color: '',
    licensePlate: '',
    isDefault: true,
  });

  const colors = ['White', 'Black', 'Silver', 'Red', 'Blue', 'Gray', 'Other'];

  const handleAddVehicle = () => {
    if (formData.make && formData.model && formData.color && formData.licensePlate) {
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        ...formData,
      };
      
      // If this is default, unset others
      if (formData.isDefault) {
        setVehicles(vehicles.map(v => ({ ...v, isDefault: false })));
      }
      
      setVehicles([...vehicles, newVehicle]);
      setFormData({
        nickname: '',
        make: '',
        model: '',
        color: '',
        licensePlate: '',
        isDefault: vehicles.length === 0,
      });
      setShowAddForm(false);
    }
  };

  const handleSetDefault = (id: string) => {
    setVehicles(vehicles.map(v => ({
      ...v,
      isDefault: v.id === id
    })));
  };

  const handleContinue = () => {
    if (vehicles.length > 0) {
      localStorage.setItem('userVehicles', JSON.stringify(vehicles));
      navigate('/payment-setup');
    }
  };

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      <Header 
        title="Your Vehicles" 
        onLeftClick={() => navigate(-1)}
      />
      
      <div className="pt-20 pb-8 px-6 max-w-md mx-auto">
        {/* Vehicle List */}
        {vehicles.length > 0 && (
          <div className="space-y-3 mb-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 bg-white border-2 border-neutral-200 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-[#0F1415]">
                        {vehicle.nickname || `${vehicle.make} ${vehicle.model}`}
                      </h3>
                      {vehicle.isDefault && (
                        <Badge variant="info" size="sm">Default</Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-neutral-600">
                      <p>{vehicle.color} • {vehicle.licensePlate}</p>
                      <p>{vehicle.make} {vehicle.model}</p>
                    </div>
                  </div>
                  {!vehicle.isDefault && (
                    <button
                      onClick={() => handleSetDefault(vehicle.id)}
                      className="text-[#66BD59] text-sm font-medium hover:text-[#52A547] transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Vehicle Form */}
        {showAddForm ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F1415]">Add Vehicle</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Vehicle Nickname (Optional)"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              />

              <Input
                placeholder="Make"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />

              <Input
                placeholder="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />

              <div>
                <p className="text-sm font-medium text-[#0F1415] mb-3">Color</p>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`px-3 py-2.5 rounded-xl border-2 transition-all text-sm font-medium ${
                        formData.color === color
                          ? 'border-[#66BD59] bg-[#66BD59]/10 text-[#66BD59]'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                placeholder="License Plate"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
              />

              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-5 h-5 rounded border-neutral-300 text-[#66BD59] focus:ring-[#66BD59] focus:ring-2"
                />
                <span className="text-base text-[#0F1415] font-medium">Set as default vehicle</span>
              </label>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  fullWidth
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddVehicle}
                  fullWidth
                  size="lg"
                  disabled={!formData.make || !formData.model || !formData.color || !formData.licensePlate}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowAddForm(true)}
            variant="outline"
            fullWidth
            size="lg"
            className="mb-6"
          >
            <Plus className="mr-2 w-5 h-5" />
            Add Vehicle
          </Button>
        )}

        {/* Continue Button */}
        {vehicles.length > 0 && !showAddForm && (
          <Button onClick={handleContinue} fullWidth size="lg">
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

