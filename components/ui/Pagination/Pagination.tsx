import { FC, JSX } from 'react';
import styles from './Pagination.module.scss';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import { endLoading, startLoading } from '@/store/networkSlice/networkSlice';

interface IPaginationProps {
  totalPages: number;
}

const Pagination: FC<IPaginationProps> = ({ totalPages }): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentPage = router.query.page;

  const handleNavigation = (page: number) => {
    dispatch(startLoading());
    router
      .push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page,
        },
      })
      .then(() => dispatch(endLoading()));
  };

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === '1' || !currentPage}
        onClick={() => handleNavigation(1)}
      >
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === '1' || !currentPage}
        onClick={() => handleNavigation(currentPage ? +currentPage - 1 : 1)}
      >
        &lt;
      </button>
      <span className={styles.pagination__current}>
        {currentPage || '1'} / {totalPages}
      </span>
      <button
        disabled={Number(currentPage) === totalPages}
        onClick={() => handleNavigation(currentPage ? +currentPage + 1 : 2)}
      >
        &gt;
      </button>
      <button
        disabled={Number(currentPage) === totalPages}
        onClick={() => handleNavigation(totalPages)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
export default Pagination;
