import { ButtonHTMLAttributes, useEffect } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: 'yellow' | 'dark';
  fill?: boolean;
}

const Button = ({ children, fill, color, ...buttonAttributes }: ButtonProps) => {
  return (
    <button
      className={`my-3 rounded-[10px] py-2 px-11 text-2xl font-bold shadow-lg
      ${color === 'yellow' ? 'bg-yellow text-dark-600' : 'bg-dark-100 text-yellow'}
      ${fill && 'w-full'}
      `}
      {...buttonAttributes}>
      {children}
    </button>
  );
};

export default Button;
