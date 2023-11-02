import { JSX, useCallback, useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { IArtwork } from '@/types/api/IArtwork';
import { IBaseTypeResponse, IFetchQueryParams } from '@/types/api/types';
import { ApiConstants } from '@/api/api.constants';
import { fetchData } from '@/api/api';
import { IQueryObject } from '@/types/appTypes';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import Form from '@/components/Form/Form';
import Loader from '@/components/Loader/Loader';
import CardList from '@/components/CardList/CardList';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';

const HomePage = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);

  const fetchArtworks = useCallback(
    (query: string) => {
      const initialParamsObj: IFetchQueryParams = {
        limit: limit.toString(),
        page: page.toString(),
        fields: 'id,title,image_id,artist_title,date_start,date_end,color',
      };
      if (query) {
        initialParamsObj.q = query;
      }
      const params = new URLSearchParams(initialParamsObj);
      const basePath: string = query
        ? `${ApiConstants.BASE}${ApiConstants.ARTWORKS}/${ApiConstants.SEARCH}?${params}`
        : `${ApiConstants.BASE}${ApiConstants.ARTWORKS}?${params}`;
      (fetchData(basePath) as Promise<IBaseTypeResponse>)
        .then((a) => {
          setArtworks(a.data);
          setTotalPages(a.pagination.total_pages);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    },
    [limit, page],
  );

  useEffect(() => {
    const fallback: IQueryObject = {
      query: '',
    };
    const queryObject = getDataFromStorage(fallback) as IQueryObject;
    setQuery(queryObject.query);
    setLimit(8);
    setLoading(true);
  }, []);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, searchParams, setSearchParams]);

  useEffect(() => {
    if (!loading) return;
    fetchArtworks(query);
  }, [fetchArtworks, loading, query]);

  const handleSubmitForm = (query: string) => {
    setLoading(true);
    setPage(1);
    setDataToLocalStorage({ query });
  };

  const changePaginationState = (i: number) => {
    if (i < 1 || i > totalPages) {
      return;
    }
    setLoading(true);
    setPage(i);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__left}>
        <Form
          query={query}
          handleChangeQuery={setQuery}
          handleSubmit={handleSubmitForm}
        />
        {loading && <Loader />}
        {!artworks.length && !loading && (
          <h1 className={styles.alert}>No artworks found here</h1>
        )}
        {!!artworks.length && (
          <>
            <CardList cards={artworks} />
            <Pagination
              currentPage={page}
              setCurrentPage={changePaginationState}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
      <div className={styles.wrapper__right}>
        <Outlet />
      </div>
    </div>
  );
};
export default HomePage;
