import React, { ReactNode, HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  key?: React.Key;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'info' | 'purple' | 'amber';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  dot = false,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  }[size];

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    neutral: 'bg-slate-50 text-slate-600 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    amber: 'bg-orange-50 text-orange-700 border-orange-200',
  }[variant];

  const dotStyles = {
    default: 'bg-slate-400',
    neutral: 'bg-slate-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500',
    amber: 'bg-orange-500',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyles}`} />}
      {children}
    </span>
  );
}
