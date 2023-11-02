import { JSX } from 'react';
import { Link } from 'react-router-dom';
import rs_logo from '@/assets/rs_school_js.svg';
import git_logo from '@/assets/github-mark.svg';
import styles from './Footer.module.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <Link
                className={styles.footer__link}
                to={'https://rs.school/js/'}
                target={'_blank'}
              >
                <img
                  className={styles.footer__img}
                  src={rs_logo}
                  alt="rs-school"
                />
              </Link>
            </li>
            <li className={styles.footer__item}>
              <Link
                className={styles.footer__link}
                to={'https://github.com/LikeKugi'}
                target={'_blank'}
              >
                <img
                  className={styles.footer__img}
                  src={git_logo}
                  alt="git hub"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
