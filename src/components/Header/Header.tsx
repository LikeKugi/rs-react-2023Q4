import { FC } from 'react';
import styles from './Header.module.scss';

interface IHeaderProps {
  handleThrow: () => void;
}

const Header: FC<IHeaderProps> = ({ handleThrow }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h3>Rs School React App</h3>
        <button className={styles.header__btn} onClick={handleThrow}>
          Throw Error
        </button>
      </div>
    </header>
  );
};

export default Header;
