import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/Layout/Layout';

const { wrapper } = require('@/store/store');

export function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
