import Header from '@/components/Header';
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='relative -inset-y-2 z-10 rounded-t-xl border-t-8 border-white bg-white dark:border-dark-600 dark:bg-dark-600'>
        {children}
      </main>
      <Navbar />
    </>
  );
};

export default Layout;
