import { FC, JSX, PropsWithChildren } from 'react';
import Header from '@/components/ui/Header/Header';
import Footer from '@/components/ui/Footer/Footer';
import styles from './Layout.module.scss';

const Layout: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.layout__content}>{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
