import { useTheme } from 'next-themes';
import Layout from '@/components/Layout';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <h1>asdasd</h1>
      <button
        className='fixed bottom-0 cursor-pointer bg-gray-100'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle theme
      </button>
    </Layout>
  );
}
