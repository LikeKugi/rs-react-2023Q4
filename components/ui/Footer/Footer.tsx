import { JSX } from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

interface ILink {
  href: string;
  src: string;
  alt: string;
}

const links: ILink[] = [
  {
    href: 'https://rs.school/js/',
    src: '/rs_school_js.svg',
    alt: 'rs-school',
  },
  {
    href: 'https://github.com/LikeKugi',
    src: '/github-mark.svg',
    alt: 'git hub',
  },
];

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            {links.map((link) => (
              <li className={styles.footer__item} key={link.href}>
                <Link
                  className={styles.footer__link}
                  href={link.href}
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
