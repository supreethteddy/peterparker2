import LogoDesign from '../../assets/Logo-design.svg';
import Icon from '../../assets/Icon.svg';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'full', className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-12',
    lg: 'h-16',
  };
  
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {variant === 'full' ? (
        <img src={LogoDesign} alt="quickParker" className="h-full w-30 object-cover" />
      ) : (
        <img src={Icon} alt="quickParker" className="h-full w-30 object-cover" />
      )}
    </div>
  );
}

