import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from '@next/font/google';

const lato = Lato({
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  subsets: ['latin-ext'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${lato.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
