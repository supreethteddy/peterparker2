import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiPhone, HiMicrophone, HiVolumeUp, HiPlus, HiHashtag } from 'react-icons/hi';
import { MdCallEnd, MdMicOff } from 'react-icons/md';

export default function CallingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const valet = location.state?.valet;
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCalling, setIsCalling] = useState(true);

  useEffect(() => {
    if (!isCalling) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCalling]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1415] via-[#171717] to-[#0F1415] safe-top safe-bottom flex flex-col items-center justify-center px-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#34C0CA] to-[#66BD59] flex items-center justify-center text-white text-4xl font-bold mb-6">
          {valet?.name?.charAt(0) || 'V'}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {isCalling ? 'Calling...' : valet?.name || 'Valet'}
        </h2>
        {!isCalling && (
          <p className="text-neutral-400 text-lg">{formatTime(callDuration)}</p>
        )}
      </div>

      <div className="w-full pb-safe-bottom mb-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isMuted ? (
              <MdMicOff className="w-6 h-6 text-white" />
            ) : (
              <HiMicrophone className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-16 h-16 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isSpeaker ? 'bg-[#34C0CA]' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <HiVolumeUp className="w-6 h-6 text-white" />
          </button>
          <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
            <HiHashtag className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
            <HiPlus className="w-6 h-6 text-white" />
          </button>
        </div>

        <button
          onClick={handleEndCall}
          className="w-20 h-20 rounded-full bg-[#EF4444] flex items-center justify-center mx-auto hover:bg-[#DC2626] transition-colors shadow-xl"
        >
          <MdCallEnd className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
