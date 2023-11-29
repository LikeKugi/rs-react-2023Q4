import { JSX } from 'react';
import { routesEquals } from '@/constants';
import { NavLink } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <header>
      <nav>
        <ul>
          {Object.entries(routesEquals).map(([name, path]) => (
            <li>
              <NavLink to={path}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
