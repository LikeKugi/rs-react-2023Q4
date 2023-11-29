import { JSX, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectNavigationPage,
  selectNavigationTotalPages,
  setPage,
} from '@/store/navigationSlice/navigationSlice';

const Pagination = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectNavigationPage);
  const totalPages = useAppSelector(selectNavigationTotalPages);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!page) return;
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => dispatch(setPage(1))}>
        &lt;&lt;
      </button>
      <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
        &lt;
      </button>
      <span className={styles.pagination__current}>
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => dispatch(setPage(page + 1))}
      >
        &gt;
      </button>
      <button
        disabled={page === totalPages}
        onClick={() => dispatch(setPage(totalPages))}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
export default Pagination;
