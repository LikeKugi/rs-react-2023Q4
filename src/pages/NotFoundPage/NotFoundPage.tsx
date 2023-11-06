import { JSX } from 'react';
import { RouterConstants } from '@/routes/RouterConstants';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';

const NotFoundPage = (): JSX.Element => {
  const { setPage } = useNavigationProvider();
  return (
    <div className={styles.content}>
      <h1>The information not found</h1>
      <Link to={RouterConstants.INDEX} onClick={() => setPage(1)}>
        Back to the Main Page
      </Link>
    </div>
  );
};
export default NotFoundPage;
