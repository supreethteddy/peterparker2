import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  icon?: 'arrow' | 'arrow-right' | 'arrow-left' | 'arrow-curve' | 'check' | 'none';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  fullWidth = false,
  icon
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none min-h-[48px] font-medium tracking-wide group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#34C0CA] to-[#66BD59] text-white hover:from-[#2BA8B2] hover:to-[#52A547] active:from-[#25909A] active:to-[#3D8A35] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white text-[#0F1415] border-2 border-neutral-300 hover:border-[#34C0CA]/50 hover:bg-neutral-50 active:bg-neutral-100 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
    outline: 'border-2 border-[#66BD59] text-[#66BD59] bg-white hover:bg-[#66BD59]/10 active:bg-[#66BD59]/20 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
    danger: 'bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white hover:from-[#DC2626] hover:to-[#B91C1C] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-[#66BD59] bg-transparent hover:bg-[#66BD59]/10 active:bg-[#66BD59]/20'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]'
  };

  // Auto-detect icon based on button text if not specified
  const shouldShowIcon = icon !== 'none';
  const detectedIcon = icon || (variant === 'primary' ? 'arrow-right' : undefined);

  const renderIcon = () => {
    if (!shouldShowIcon || disabled) return null;

    const iconClass = "w-5 h-5 transition-transform duration-300";
    
    switch (detectedIcon) {
      case 'arrow-right':
        return (
          <svg className={`${iconClass} group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        );
      case 'arrow-left':
        return (
          <svg className={`${iconClass} group-hover:-translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        );
      case 'arrow-curve':
        return (
          <svg className={`${iconClass} group-hover:rotate-12`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        );
      case 'check':
        return (
          <svg className={`${iconClass} group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {children}
          {renderIcon()}
        </>
      )}
    </button>
  );
}
