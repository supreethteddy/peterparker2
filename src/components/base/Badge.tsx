import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'neutral',
  size = 'md',
  className = '' 
}: BadgeProps) {
  const variantClasses = {
    success: 'bg-gradient-to-r from-[#66BD59]/15 to-[#66BD59]/10 text-[#52A547] border-[#66BD59]/30 font-semibold',
    warning: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30 font-semibold',
    error: 'bg-[#EF4444]/15 text-[#DC2626] border-[#EF4444]/30 font-semibold',
    info: 'bg-gradient-to-r from-[#34C0CA]/15 to-[#34C0CA]/10 text-[#2BA8B2] border-[#34C0CA]/30 font-semibold',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-300 font-medium',
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
  };
  
  return (
    <span 
      className={`inline-flex items-center rounded-full border backdrop-blur-sm ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}

