
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export default function Header({ title, leftIcon, rightIcon, onLeftClick, onRightClick }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="flex items-center justify-between px-4 py-4 h-16">
        <div className="w-10 h-10 flex items-center justify-center">
          {leftIcon && (
            <button onClick={onLeftClick} className="w-8 h-8 flex items-center justify-center">
              {leftIcon}
            </button>
          )}
        </div>
        <h1 className="text-lg font-semibold text-gray-900 text-center flex-1">{title}</h1>
        <div className="w-10 h-10 flex items-center justify-center">
          {rightIcon && (
            <button onClick={onRightClick} className="w-8 h-8 flex items-center justify-center">
              {rightIcon}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
