import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import Badge from '../../components/base/Badge';
import BottomNav from '../../components/feature/BottomNav';

interface Vehicle {
  id: string;
  nickname?: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  year?: string;
  isDefault: boolean;
}

export default function VehicleDetailsPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      nickname: 'My Car',
      make: 'Honda',
      model: 'City',
      color: 'White',
      licensePlate: 'KA 01 AB 1234',
      year: '2022',
      isDefault: true,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nickname: '',
    make: '',
    model: '',
    color: '',
    licensePlate: '',
    year: '',
    isDefault: false,
  });

  const colors = ['White', 'Black', 'Silver', 'Red', 'Blue', 'Gray', 'Brown', 'Other'];

  useEffect(() => {
    const saved = localStorage.getItem('userVehicles');
    if (saved) {
      setVehicles(JSON.parse(saved));
    }
  }, []);

  const handleAddVehicle = () => {
    if (formData.make && formData.model && formData.color && formData.licensePlate) {
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        ...formData,
      };
      
      if (formData.isDefault) {
        setVehicles(vehicles.map(v => ({ ...v, isDefault: false })));
      }
      
      const updated = [...vehicles, newVehicle];
      setVehicles(updated);
      localStorage.setItem('userVehicles', JSON.stringify(updated));
      resetForm();
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setFormData({
      nickname: vehicle.nickname || '',
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
      year: vehicle.year || '',
      isDefault: vehicle.isDefault,
    });
    setShowAddForm(true);
  };

  const handleUpdateVehicle = () => {
    if (editingId && formData.make && formData.model && formData.color && formData.licensePlate) {
      if (formData.isDefault) {
        setVehicles(vehicles.map(v => ({ ...v, isDefault: v.id === editingId })));
      }
      
      const updated = vehicles.map(v =>
        v.id === editingId ? { ...v, ...formData } : v
      );
      setVehicles(updated);
      localStorage.setItem('userVehicles', JSON.stringify(updated));
      resetForm();
    }
  };

  const handleDeleteVehicle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      const updated = vehicles.filter(v => v.id !== id);
      setVehicles(updated);
      localStorage.setItem('userVehicles', JSON.stringify(updated));
    }
  };

  const handleSetDefault = (id: string) => {
    const updated = vehicles.map(v => ({
      ...v,
      isDefault: v.id === id
    }));
    setVehicles(updated);
    localStorage.setItem('userVehicles', JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormData({
      nickname: '',
      make: '',
      model: '',
      color: '',
      licensePlate: '',
      year: '',
      isDefault: false,
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom animate-in">
      <Header 
        title="Vehicle Details" 
        onLeftClick={() => navigate(-1)}
      />

      <div className="pt-20 px-4 pb-24">
        {/* Vehicles List */}
        {!showAddForm && (
          <div className="space-y-3 mb-6">
            {vehicles.map((vehicle, index) => (
              <Card 
                key={vehicle.id} 
                className="p-5 animate-in hover:shadow-lg transition-all cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleEditVehicle(vehicle)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white shadow-md">
                        <i className="ri-car-line text-2xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-[#0F1415]">
                            {vehicle.nickname || `${vehicle.make} ${vehicle.model}`}
                          </h3>
                          {vehicle.isDefault && (
                            <Badge variant="info" size="sm">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">{vehicle.make} {vehicle.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-neutral-600 ml-15">
                      <div className="flex items-center gap-1">
                        <i className="ri-palette-line text-[#34C0CA]"></i>
                        <span>{vehicle.color}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-file-text-line text-[#66BD59]"></i>
                        <span className="font-mono font-semibold">{vehicle.licensePlate}</span>
                      </div>
                      {vehicle.year && (
                        <div className="flex items-center gap-1">
                          <i className="ri-calendar-line text-[#34C0CA]"></i>
                          <span>{vehicle.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {!vehicle.isDefault && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetDefault(vehicle.id);
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-[#66BD59] bg-[#66BD59]/10 rounded-lg hover:bg-[#66BD59]/20 transition-colors"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVehicle(vehicle.id);
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-[#EF4444] bg-[#EF4444]/10 rounded-lg hover:bg-[#EF4444]/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm ? (
          <Card className="p-6 mb-6 animate-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F1415]">
                {editingId ? 'Edit Vehicle' : 'Add Vehicle'}
              </h2>
              <button
                onClick={resetForm}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-all transform hover:scale-110 active:scale-95"
              >
                <i className="ri-close-line text-2xl text-neutral-600"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Vehicle Nickname (Optional)"
                placeholder="e.g., My Car, Work Vehicle"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                leftIcon={<i className="ri-car-line"></i>}
              />

              <Input
                label="Make"
                placeholder="e.g., Honda, Toyota"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                required
                leftIcon={<i className="ri-building-line"></i>}
              />

              <Input
                label="Model"
                placeholder="e.g., City, Camry"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
                leftIcon={<i className="ri-file-list-line"></i>}
              />

              <Input
                label="Year (Optional)"
                type="number"
                placeholder="e.g., 2022"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                leftIcon={<i className="ri-calendar-line"></i>}
              />

              <div>
                <label className="block text-sm font-medium text-[#0F1415] mb-3">Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`px-3 py-2.5 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 text-sm font-medium ${
                        formData.color === color
                          ? 'border-[#66BD59] bg-[#66BD59]/10 text-[#66BD59] shadow-md'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#34C0CA]/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="License Plate"
                placeholder="e.g., KA 01 AB 1234"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                required
                leftIcon={<i className="ri-file-text-line"></i>}
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
                  onClick={resetForm}
                  variant="secondary"
                  fullWidth
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingId ? handleUpdateVehicle : handleAddVehicle}
                  fullWidth
                  size="lg"
                  disabled={!formData.make || !formData.model || !formData.color || !formData.licensePlate}
                >
                  {editingId ? 'Update' : 'Add Vehicle'}
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
            Add New Vehicle
          </Button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

