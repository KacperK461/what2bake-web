import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className='fixed bottom-0 cursor-pointer bg-gray-100'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle theme
      </button>
    </>
  );
}
