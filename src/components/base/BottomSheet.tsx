import { ReactNode, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

interface BottomSheetProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
}

export default function BottomSheet({
  children,
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  className = ''
}: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-primary-dark/60 z-40 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl border-t border-neutral-200/50 z-50 max-h-[90vh] overflow-y-auto safe-bottom ${className}`}>
        {/* Drag Handle */}
        <div className="flex justify-center pt-4 pb-3">
          <div className="w-16 h-1.5 bg-gradient-to-r from-[#34C0CA] to-[#66BD59] rounded-full opacity-60" />
        </div>
        
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pb-4">
            {title && (
              <h2 className="text-h2 font-semibold text-primary-dark">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
              >
                <HiX className="w-5 h-5 text-neutral-600" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </>
  );
}
