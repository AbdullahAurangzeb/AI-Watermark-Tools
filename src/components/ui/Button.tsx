import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from '../../router/RouterContext';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  key?: React.Key;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = 'button',
      to,
      href,
      target,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[34px]',
      md: 'text-sm px-4 py-2.5 gap-2 min-h-[42px]',
      lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px]',
    }[size];

    const variantStyles = {
      primary:
        'bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10 focus-visible:ring-slate-900',
      secondary:
        'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 focus-visible:ring-indigo-600',
      outline:
        'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 focus-visible:ring-slate-400',
      ghost:
        'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus-visible:ring-slate-400',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/20 focus-visible:ring-rose-600',
    }[variant];

    const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

    // If 'to' is provided, render clean Link without nested button
    if (to) {
      return (
        <Link
          to={to}
          target={target}
          className={combinedClassName}
          onClick={onClick as any}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
          ) : (
            leftIcon && <span className="shrink-0">{leftIcon}</span>
          )}
          <span>{children}</span>
          {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </Link>
      );
    }

    // If external 'href' is provided, render clean anchor
    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className={combinedClassName}
          onClick={onClick as any}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
          ) : (
            leftIcon && <span className="shrink-0">{leftIcon}</span>
          )}
          <span>{children}</span>
          {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClassName}
        onClick={onClick}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
