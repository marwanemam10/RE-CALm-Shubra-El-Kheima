import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none";
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary: "bg-[#8e8672] hover:bg-[#7a7260] text-white shadow-sm focus:ring-[#8e8672]/50 hover:shadow-glow-primary",
    secondary: "bg-[#acbdad]/30 hover:bg-[#acbdad]/50 text-[#12110f] dark:text-[#f6f6f4] border border-[#acbdad]/40",
    outline: "border border-[#8e8672]/30 hover:bg-[#8e8672]/10 text-[#12110f] dark:text-[#f6f6f4]",
    ghost: "text-[#12110f] dark:text-[#f6f6f4] hover:bg-black/5 dark:hover:bg-white/5",
    accent: "bg-[#90a69c] hover:bg-[#788e85] text-white shadow-sm focus:ring-[#90a69c]/50 hover:shadow-glow-accent",
    emerald: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm focus:ring-emerald-500/50",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
