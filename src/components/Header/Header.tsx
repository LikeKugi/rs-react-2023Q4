import { JSX } from 'react';
import { routesEquals } from '@/constants';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            {Object.entries(routesEquals).map(([name, path]) => (
              <li className={styles.header__item} key={path}>
                <NavLink className={styles.header__link} to={path}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
