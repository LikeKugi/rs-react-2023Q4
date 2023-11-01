import { JSX } from 'react';
import styles from './RootPage.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';

const RootPage = (): JSX.Element => {
  return (
    <div className={styles.content}>
      <Header />
      <div className={styles.content__base}>
        <Outlet />
      </div>
    </div>
  );
};
export default RootPage;
