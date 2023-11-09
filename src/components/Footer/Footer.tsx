import { JSX } from 'react';
import { Link } from 'react-router-dom';
import rs_logo from '@/assets/rs_school_js.svg';
import git_logo from '@/assets/github-mark.svg';
import styles from './Footer.module.scss';

interface ILink {
  href: string;
  src: string;
  alt: string;
}

const Footer = (): JSX.Element => {
  const links: ILink[] = [
    {
      href: 'https://rs.school/js/',
      src: rs_logo,
      alt: 'rs-school',
    },
    {
      href: 'https://github.com/LikeKugi',
      src: git_logo,
      alt: 'git hub',
    },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            {links.map((link) => (
              <li className={styles.footer__item} key={link.href}>
                <Link
                  className={styles.footer__link}
                  to={link.href}
                  target={'_blank'}
                >
                  <img
                    className={styles.footer__img}
                    src={link.src}
                    alt={link.alt}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
