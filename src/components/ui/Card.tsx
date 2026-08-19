import React, { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  key?: React.Key;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle' | 'bordered';
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false,
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200/80 shadow-xs',
    elevated: 'bg-white border border-slate-200/60 shadow-md shadow-slate-900/5',
    subtle: 'bg-slate-50/70 border border-slate-200/60',
    bordered: 'bg-white border-2 border-slate-200',
  }[variant];

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={`rounded-2xl p-6 ${variantStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
