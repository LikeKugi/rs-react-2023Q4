import { JSX, useEffect } from 'react';
import styles from './RootPage.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';

const RootPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const { setPage } = useNavigationProvider();

  useEffect(() => {
    const initialPage = Number(searchParams.get('page'));
    if (!initialPage) return;
    setPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.content}>
      <Header />
      <div className={styles.content__base}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default RootPage;
