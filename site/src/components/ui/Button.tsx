import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost';
  children: ReactNode;
};

export const Button = ({ variant = 'ghost', children, className = '', ...props }: ButtonProps) => (
  <a className={`btn ${variant} ${className}`.trim()} {...props}>
    {children}
  </a>
);
