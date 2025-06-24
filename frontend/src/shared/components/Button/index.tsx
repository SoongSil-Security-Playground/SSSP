import React, { type FC, type ReactNode, type ButtonHTMLAttributes } from 'react'
import styles from './index.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'primary' | 'text';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  icon,
  iconPosition = 'left',
  children,
  ...restProps
}) => {
  const btnClass =
    variant === 'primary' ? styles.primary : styles.text;

  return (
    <button className={`${btnClass} ${className}`} {...restProps}>
      {icon && iconPosition === 'left' && (
        <span className={`${styles.btnIcon} ${styles.iconLeft}`}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`${styles.btnIcon} ${styles.iconRight}`}>
          {icon}
        </span>
      )}
    </button>
  );
};