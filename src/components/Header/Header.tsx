import { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/routes/RouterConstants';
import { useAppDispatch } from '@/store/hooks';
import { setPage } from '@/store/navigationSlice/navigationSlice';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link
          className={styles.header__link}
          to={RouterConstants.INDEX}
          onClick={() => dispatch(setPage(1))}
        >
          <h3>Rs School React App</h3>
        </Link>
      </div>
    </header>
  );
};

export default Header;
