import { JSX, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';
import { useArtworksProvider } from '@/provider/ArtworksProvider/ArtworksProvider.hooks';
import { useSearchParams } from 'react-router-dom';

const Pagination = (): JSX.Element => {
  const { page, setPage } = useNavigationProvider();
  const { totalPages } = useArtworksProvider();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, searchParams, setSearchParams]);

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        &lt;&lt;
      </button>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1, totalPages)}
      >
        &lt;
      </button>
      <span className={styles.pagination__current}>
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1, totalPages)}
      >
        &gt;
      </button>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(totalPages, totalPages)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
export default Pagination;
