import { useTheme } from 'next-themes';
import Layout from '@/components/Layout';
import useUser from '@/hooks/useUser';

export default function Home() {
  const { theme, setTheme } = useTheme();

  const { user, isLogged, isAdmin } = useUser();
  console.log(user);
  console.log(isLogged);
  console.log(isAdmin);

  return (
    <Layout>
      <h1>asdasd</h1>
      <button
        className='fixed bottom-36 cursor-pointer bg-gray-100'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle theme
      </button>
    </Layout>
  );
}
