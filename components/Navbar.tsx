import Link from 'next/link';
import { useRouter } from 'next/router';
import HouseIcon from '@/public/icons/house-icon.svg';
import CookbookIcon from '@/public/icons/cookbook-icon.svg';
import BreakfastIcon from '@/public/icons/breakfast-icon.svg';
import FavoriteIcon from '@/public/icons/favorite-icon.svg';
import { FunctionComponent, SVGProps } from 'react';
import { Montserrat } from '@next/font/google';

const Navbar = () => {
  return (
    <nav className='fixed bottom-7 left-1/2 flex w-11/12 -translate-x-1/2 justify-around rounded-[1.25rem] bg-dark-500 p-1  shadow-xl shadow-black/30'>
      <NavLink href='/' Icon={HouseIcon} label='Home'></NavLink>
      <NavLink href='/przepisy' Icon={CookbookIcon} label='Przepisy'></NavLink>
      <NavLink href='/skladniki' Icon={BreakfastIcon} label='Składniki'></NavLink>
      <NavLink href='/ulubione' Icon={FavoriteIcon} label='Ulubione'></NavLink>
    </nav>
  );
};

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin-ext'],
});

const NavLink = ({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  label: string;
}) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === href ? (
        <div className='relative'>
          <Link
            href={href}
            className='block -translate-y-4 cursor-pointer rounded-2xl border-4 border-dark-500 bg-yellow p-2 text-[28px] text-dark-400'>
            <Icon />
          </Link>
          <p
            className={`${montserrat.className}  absolute left-1/2 bottom-1 -translate-x-1/2 text-[0.5rem] text-light-100`}>
            {label}
          </p>
        </div>
      ) : (
        <div>
          <Link href={href} className='block cursor-pointer border-4 border-dark-500 p-2 text-[28px] text-light-100'>
            <Icon />
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
