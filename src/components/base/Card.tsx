import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export default function Card({ 
  children, 
  className = '', 
  onClick,
  variant = 'default'
}: CardProps) {
  const variantClasses = {
    default: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-neutral-200 rounded-xl',
    elevated: 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-neutral-200 rounded-xl',
    outlined: 'bg-white border-2 border-neutral-200 rounded-xl'
  };
  
  return (
    <div 
      className={`${variantClasses[variant]} ${onClick ? 'cursor-pointer hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.99]' : 'transition-all duration-200'} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
