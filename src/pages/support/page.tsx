
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';

export default function SupportPage() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'support',
      message: 'Hi! How can I help you today?',
      time: '10:30 AM'
    }
  ]);

  const supportOptions = [
    {
      icon: 'ri-message-line',
      title: '24/7 Live Chat',
      description: 'Get instant help from our support team',
      action: () => setShowChat(true)
    },
    {
      icon: 'ri-phone-line',
      title: 'Call Support',
      description: '+91 80-4567-8900',
      action: () => {}
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Insurance Claims',
      description: 'File a claim for vehicle damage',
      action: () => navigate('/insurance-claim')
    },
    {
      icon: 'ri-question-line',
      title: 'FAQ',
      description: 'Find answers to common questions',
      action: () => navigate('/faq')
    },
    {
      icon: 'ri-feedback-line',
      title: 'Feedback',
      description: 'Share your experience with us',
      action: () => navigate('/feedback')
    },
    {
      icon: 'ri-file-text-line',
      title: 'Terms & Privacy',
      description: 'Read our policies',
      action: () => {}
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'user',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
      
      // Simulate support response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: 'support',
          message: 'Thank you for your message. Our team will assist you shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Help & Support" />

      <div className="pt-20 px-4 pb-24">
        {/* Emergency Contact */}
        <Card className="p-4 mb-6 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <i className="ri-alarm-warning-line text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">Emergency Support</h3>
              <p className="text-sm text-red-600">For urgent issues, call immediately</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Call Now
            </button>
          </div>
        </Card>

        {/* Support Options */}
        <div className="space-y-3 mb-6">
          {supportOptions.map((option, index) => (
            <Card key={index} className="p-4" onClick={option.action}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className={`${option.icon} text-blue-600 text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-gray-50 rounded-lg text-left">
              <i className="ri-car-line text-blue-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium">Report Vehicle Issue</span>
            </button>
            <button className="p-3 bg-gray-50 rounded-lg text-left">
              <i className="ri-money-dollar-circle-line text-green-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium">Payment Issue</span>
            </button>
            <button className="p-3 bg-gray-50 rounded-lg text-left">
              <i className="ri-user-line text-purple-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium">Valet Feedback</span>
            </button>
            <button className="p-3 bg-gray-50 rounded-lg text-left">
              <i className="ri-map-pin-line text-orange-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium">Location Problem</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <Header 
            title="Live Chat Support"
            leftIcon={<i className="ri-arrow-left-line"></i>}
            onLeftClick={() => setShowChat(false)}
          />
          
          <div className="flex-1 pt-16 pb-20 px-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <i className="ri-send-plane-line"></i>
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
