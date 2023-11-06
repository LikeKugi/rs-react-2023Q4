import { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/routes/RouterConstants';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';

const Header: FC = () => {
  const { setPage } = useNavigationProvider();
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link
          className={styles.header__link}
          to={RouterConstants.INDEX}
          onClick={() => setPage(1)}
        >
          <h3>Rs School React App</h3>
        </Link>
      </div>
    </header>
  );
};

export default Header;
