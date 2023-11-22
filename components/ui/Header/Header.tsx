import { JSX } from 'react';
import styles from './Header.module.scss'
import Link from 'next/link';
import { RouterConstants } from '@/routes';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link className={styles.header__link} href={RouterConstants.INDEX}>
          <h3>Rs School React App</h3>
        </Link>
      </div>
    </header>
  );
};
export default Header;
