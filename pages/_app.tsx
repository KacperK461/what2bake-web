import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import fetchJson from '@/utils/fetchJSON';

const lato = Lato({
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  subsets: ['latin-ext'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <div className={`${lato.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
