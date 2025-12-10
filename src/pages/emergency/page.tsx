import { useState } from 'react';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import BottomNav from '../../components/feature/BottomNav';
import { Phone, Shield, AlertTriangle, Plus, Edit2, Trash2, Star } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export default function EmergencyPage() {
  const [contacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      relationship: 'Wife',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Rahul Sharma',
      phone: '+91 98765 43211',
      relationship: 'Brother',
      isPrimary: false,
    },
  ]);

  const emergencyNumbers = [
    { name: 'Police', number: '100', icon: Shield },
    { name: 'Ambulance', number: '102', icon: AlertTriangle },
    { name: 'Fire', number: '101', icon: AlertTriangle },
  ];

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header title="Emergency Contacts" />
      
      <div className="pt-20 pb-24 px-6 max-w-md mx-auto">
        {/* Emergency Numbers */}
        <div className="mb-6">
          <h3 className="text-body font-semibold text-neutral-600 mb-3 px-2">
            Emergency Services
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {emergencyNumbers.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.name}
                  className="p-4 text-center cursor-pointer hover:shadow-card-hover transition-shadow"
                  onClick={() => handleEmergencyCall(service.number)}
                >
                  <div className="w-12 h-12 rounded-full bg-status-error/10 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-status-error" />
                  </div>
                  <p className="text-caption font-medium text-primary-dark mb-1">{service.name}</p>
                  <p className="text-body font-bold text-status-error">{service.number}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Personal Contacts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-body font-semibold text-neutral-600">Personal Contacts</h3>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-accent to-secondary-accent flex items-center justify-center text-white font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-body font-semibold text-primary-dark">{contact.name}</h4>
                        {contact.isPrimary && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-caption text-neutral-600 mb-1">{contact.relationship}</p>
                      <p className="text-body text-primary-dark font-medium">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="w-10 h-10 rounded-full bg-primary-accent text-white flex items-center justify-center hover:bg-primary-accentHover transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
                      <Edit2 className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-status-error/10 to-status-error/5 border-status-error/20">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-status-error flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-body font-semibold text-primary-dark mb-2">
                In Case of Emergency
              </h3>
              <p className="text-caption text-neutral-600 mb-4">
                Your emergency contacts will be notified automatically if you trigger the SOS feature during a trip.
              </p>
              <Button variant="danger" fullWidth size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Test SOS Feature
              </Button>
            </div>
          </div>
        </Card>

        {/* Empty State */}
        {contacts.length === 0 && (
          <Card className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-h2 font-semibold text-primary-dark mb-2">No emergency contacts</h3>
            <p className="text-body text-neutral-600 mb-6">
              Add trusted contacts for emergency situations
            </p>
            <Button variant="primary">
              <Plus className="mr-2 w-5 h-5" />
              Add Contact
            </Button>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

