import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/Layout/Layout';
import { useAppSelector } from '@/store/hooks';
import { selectIsLoading } from '@/store/networkSlice/networkSlice';
import Loader from '@/components/ui/Loader/Loader';

const { wrapper } = require('@/store/store');

export function App({ Component, pageProps }: AppProps) {
  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
