
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const trips = [
    {
      id: 1,
      date: '2024-01-15',
      time: '2:30 PM',
      valet: 'Rajesh Kumar',
      location: 'Phoenix MarketCity',
      duration: '45 min',
      amount: 120,
      status: 'completed',
      rating: 5
    },
    {
      id: 2,
      date: '2024-01-12',
      time: '6:45 PM',
      valet: 'Suresh Patel',
      location: 'UB City Mall',
      duration: '32 min',
      amount: 80,
      status: 'completed',
      rating: 4
    },
    {
      id: 3,
      date: '2024-01-10',
      time: '11:20 AM',
      valet: 'Amit Singh',
      location: 'Forum Mall',
      duration: '28 min',
      amount: 80,
      status: 'completed',
      rating: 5
    },
    {
      id: 4,
      date: '2024-01-08',
      time: '4:15 PM',
      valet: 'Rajesh Kumar',
      location: 'Orion Mall',
      duration: '52 min',
      amount: 100,
      status: 'cancelled',
      rating: 0
    }
  ];

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'all') return true;
    return trip.status === activeTab;
  });

  const handleTripClick = (trip: any) => {
    navigate('/trip-details', { state: { trip } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Trip History" />

      <div className="pt-20 px-4 pb-24">
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { key: 'all', label: 'All Trips' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trip Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{trips.filter(t => t.status === 'completed').length}</h3>
            <p className="text-sm text-gray-600">Completed</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              ₹{trips.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)}
            </h3>
            <p className="text-sm text-gray-600">Total Spent</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="text-2xl font-bold text-yellow-600">
              {(trips.filter(t => t.status === 'completed' && t.rating > 0).reduce((sum, t) => sum + t.rating, 0) / 
                trips.filter(t => t.status === 'completed' && t.rating > 0).length || 0).toFixed(1)}
            </h3>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </Card>
        </div>

        {/* Trip List */}
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <Card key={trip.id} className="p-4" onClick={() => handleTripClick(trip)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{trip.location}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    trip.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {trip.status}
                  </span>
                </div>
                <span className="font-semibold text-blue-600">₹{trip.amount}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p>{trip.date} • {trip.time}</p>
                  <p>Valet: {trip.valet}</p>
                </div>
                <div className="text-right">
                  <p>Duration: {trip.duration}</p>
                  {trip.rating > 0 && (
                    <div className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{trip.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-list-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">No trips found</h3>
            <p className="text-gray-600 text-sm">
              {activeTab === 'all' 
                ? 'You haven\'t taken any trips yet' 
                : `No ${activeTab} trips found`}
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
