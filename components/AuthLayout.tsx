import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg';

  return (
    <div className='h-screen  bg-hero-pattern-light bg-cover bg-center dark:bg-hero-pattern-dark'>
      <header className='flex justify-center px-8 pt-40 pb-3'>
        <Image src={logoSrc} width={300} height={55} alt='logo' />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
