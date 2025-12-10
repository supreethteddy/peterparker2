import { ChangeEvent, ReactNode } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
  maxLength,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-dark mb-2">
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className={`w-full px-4 py-3.5 ${leftIcon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''} border-2 ${error ? 'border-[#EF4444]' : 'border-neutral-200'} rounded-xl focus:outline-none focus:ring-4 focus:ring-[#34C0CA]/10 focus:border-[#34C0CA] text-base bg-white disabled:bg-neutral-50 disabled:text-neutral-500 transition-all duration-200 font-medium ${className}`}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-status-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}
