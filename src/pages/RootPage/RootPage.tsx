import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import styles from './RootPage.module.scss';

const RootPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.page__content}>
        <Outlet />
      </div>
    </div>
  );
};
export default RootPage;
