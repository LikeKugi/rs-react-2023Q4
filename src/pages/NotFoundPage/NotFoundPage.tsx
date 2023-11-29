import { JSX } from 'react';
import { RouterConstants } from '@/routes/RouterConstants';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className={styles.content}>
      <h1>The information not found</h1>
      <Link to={`${RouterConstants.INDEX}?page=1`}>Back to the Main Page</Link>
    </div>
  );
};
export default NotFoundPage;
