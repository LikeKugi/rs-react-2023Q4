import { JSX } from 'react';
import { RouterConstants } from '@/routes/RouterConstants';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { setPage } from '@/store/navigationSlice/navigationSlice';

const NotFoundPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.content}>
      <h1>The information not found</h1>
      <Link to={RouterConstants.INDEX} onClick={() => dispatch(setPage(1))}>
        Back to the Main Page
      </Link>
    </div>
  );
};
export default NotFoundPage;
