import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'emerald' | 'amber' | 'rose' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full";
  
  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-xs px-3 py-1 font-semibold",
  };

  const variantStyles = {
    default: "bg-[#8e8672]/15 text-[#6c6554] dark:bg-[#8e8672]/25 dark:text-[#d0c8bd]",
    primary: "bg-[#8e8672] text-white",
    secondary: "bg-[#acbdad]/30 text-[#465247] dark:bg-[#acbdad]/20 dark:text-[#c2d2c3]",
    accent: "bg-[#90a69c]/25 text-[#35433d] dark:bg-[#90a69c]/30 dark:text-[#cbdbd5]",
    emerald: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-500/30",
    outline: "border border-current opacity-85",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
