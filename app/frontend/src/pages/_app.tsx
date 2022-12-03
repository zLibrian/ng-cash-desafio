import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DashboardProvider } from '../context/DashboardProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NG.CASH</title>
      </Head>
      <DashboardProvider>
        <Component {...pageProps} />
      </DashboardProvider>
    </>
  );
}
