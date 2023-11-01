import { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/routes/RouterConstants';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link className={styles.header__link} to={RouterConstants.INDEX}>
          <h3>Rs School React App</h3>
        </Link>
      </div>
    </header>
  );
};

export default Header;
