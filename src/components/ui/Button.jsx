import React from 'react';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';

const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary cosmic-glow-sm hover:cosmic-glow-md',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive',
  outline: 'border border-border bg-transparent hover:bg-muted text-foreground hover:text-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary',
  ghost: 'hover:bg-muted hover:text-foreground border border-transparent hover:border-border',
  link: 'text-primary underline-offset-4 hover:underline border-none',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 border border-accent cosmic-glow-sm hover:cosmic-glow-md',
  success: 'bg-success text-success-foreground hover:bg-success/90 border border-success',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90 border border-warning'
};

const buttonSizes = {
  xs: 'h-7 px-2 text-xs',
  sm: 'h-9 px-4 text-sm',
  default: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
  xl: 'h-14 px-10 text-lg',
  icon: 'h-11 w-11'
};

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  iconName, 
  iconPosition = 'left', 
  iconSize = 18,
  children,
  disabled = false,
  loading = false,
  ...props 
}, ref) => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2.5 rounded-cosmic-md',
    'font-body font-medium leading-none',
    'cosmic-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden'
  ];

  const variantClass = buttonVariants?.[variant] || buttonVariants?.default;
  const sizeClass = buttonSizes?.[size] || buttonSizes?.default;

  const buttonClass = cn(
    ...baseClasses,
    variantClass,
    sizeClass,
    loading && 'pointer-events-none',
    className
  );

  const renderIcon = (iconName, position) => {
    if (!iconName) return null;
    
    return (
      <Icon 
        name={iconName} 
        size={size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'lg' ? 20 : size === 'xl' ? 22 : iconSize} 
        className={cn(
          'shrink-0',
          loading && position === 'left' && 'opacity-0',
          position === 'left' ? 'mr-0.5' : 'ml-0.5'
        )}
      />
    );
  };

  const renderContent = () => {
    const leftIcon = iconPosition === 'left' ? renderIcon(iconName, 'left') : null;
    const rightIcon = iconPosition === 'right' ? renderIcon(iconName, 'right') : null;

    return (
      <>
        {/* Loading spinner */}
        {loading && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
          </div>
        )}
        
        {/* Content */}
        <div className={cn('flex items-center gap-2.5', loading && 'opacity-0')}>
          {leftIcon}
          {children && <span className="truncate">{children}</span>}
          {rightIcon}
        </div>
        
        {/* Subtle hover effect overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 cosmic-transition rounded-cosmic-md"></div>
      </>
    );
  };

  return (
    <button
      ref={ref}
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;