import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/images/logo-light.svg');

  useEffect(() => {
    setLogoSrc(theme === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg');
  });

  return (
    <div className='h-screen overflow-y-auto bg-hero-pattern-light bg-cover bg-center p-5 dark:bg-hero-pattern-dark'>
      <div className='m-auto flex h-full max-w-xs flex-col pb-20 tall:pt-40'>
        <header className='relative mb-12  mt-auto flex justify-center py-8 tall:mt-0'>
          <Image src={logoSrc} fill alt='logo' />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
