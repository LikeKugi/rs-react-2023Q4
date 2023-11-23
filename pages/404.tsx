import { JSX } from 'react';
import Link from 'next/link';
import { RouterConstants } from '@/routes';
import styles from '@/styles/NotFoundPage.module.scss';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className={styles.content}>
      <h1>The information not found</h1>
      <Link href={`${RouterConstants.INDEX}?page=1`}>
        Back to the Main Page
      </Link>
    </div>
  );
};
export default NotFoundPage;
