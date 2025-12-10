import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/feature/Header';
import { Send, Smile, Paperclip } from 'lucide-react';

export default function MessagePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [message, setMessage] = useState('');

  const messages = [
    { id: 1, text: 'Good Evening!', sender: 'user', time: '18:30' },
    { id: 2, text: 'Welcome to quickParker Customer Service. How can I help you?', sender: 'valet', time: '18:31' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom flex flex-col">
      <Header 
        title="Chat"
        onLeftClick={() => navigate(-1)}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-20 pb-24">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white' 
                  : 'bg-white text-[#0F1415] shadow-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-neutral-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 safe-bottom">
        <div className="px-4 py-3 flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-[#34C0CA] transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-[#34C0CA] text-base"
          />
          <button className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-[#34C0CA] transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-10 h-10 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

