import { useTheme } from 'next-themes';
import Layout from '@/components/Layout';

const Przepisy = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <h1>Przepisy</h1>
      <button
        className='fixed bottom-36 cursor-pointer bg-gray-100'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle theme
      </button>
    </Layout>
  );
};

export default Przepisy;
