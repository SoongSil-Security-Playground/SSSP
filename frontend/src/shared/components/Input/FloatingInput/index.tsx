import { type FC, InputHTMLAttributes } from 'react';
import styles from './index.module.css';

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FloatingInput: FC<FloatingInputProps> = ({
  label,
  className = '',
  value,
  onChange,
  ...props
}) => {
  const hasValue = !!value;

  return (
    <div
      className={[
        styles.wrapper,
        hasValue && styles.filled,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};