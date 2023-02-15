import Image from 'next/image';
import { useTheme } from 'next-themes';
import SearchIcon from '@/public/svg/search-icon.svg';

const Header = () => {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg';

  return (
    <header className='bg-hero-pattern-light bg-cover bg-center p-4 pb-4 dark:bg-hero-pattern-dark '>
      <div className='mb-10 flex justify-between'>
        <Image src={logoSrc} width={200} height={48} alt='logo' className='pt-3' />
        <div className='h-12 w-12 rounded-full border-2 border-gray-600'></div>
      </div>
      <div className='flex min-w-full rounded-2xl bg-white px-6 py-3 shadow-lg  dark:bg-dark-200'>
        {/* <Image src='/svg/search-icon.svg' width={27.5} height={27.5} alt='Search icon' className='mr-2' />
         */}
        <SearchIcon className='text-3xl' />
        <input
          type='text'
          placeholder='Wprowadź słowa kluczowe'
          className='ml-2 w-full bg-transparent placeholder-light-500'
        />
      </div>
    </header>
  );
};

export default Header;
