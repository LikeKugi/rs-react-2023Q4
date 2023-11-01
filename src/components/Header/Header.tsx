import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h3>Rs School React App</h3>
      </div>
    </header>
  );
};

export default Header;
