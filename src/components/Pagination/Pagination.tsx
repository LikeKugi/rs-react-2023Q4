import { FC, JSX } from 'react';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: (arg: number) => void;
  totalPages: number;
}

const Pagination: FC<IPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}): JSX.Element => {
  return (
    <div className={styles.pagination}>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        &lt;
      </button>
      <span className={styles.pagination__current}>
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
export default Pagination;
