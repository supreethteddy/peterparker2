import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export default function Header({ title, leftIcon, rightIcon, onLeftClick, onRightClick }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 z-50 safe-top shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 h-16">
        <div className="w-10 h-10 flex items-center justify-center">
          {onLeftClick && (
            <button 
              onClick={onLeftClick} 
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#34C0CA]/10 transition-all duration-200"
            >
              {leftIcon || <ArrowLeft className="w-5 h-5 text-[#0F1415]" />}
            </button>
          )}
        </div>
        <h1 className="text-xl font-bold text-[#0F1415] text-center flex-1 tracking-tight">{title}</h1>
        <div className="w-10 h-10 flex items-center justify-center">
          {rightIcon && onRightClick && (
            <button 
              onClick={onRightClick} 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              {rightIcon}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
