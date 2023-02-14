import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from '@next/font/google';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

const lato = Lato({
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  subsets: ['latin-ext'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <div className={`${lato.variable} bg-white font-sans dark:bg-dark-600`}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
