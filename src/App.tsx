import { useCallback, useEffect, useReducer, useState } from 'react';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import Form from '@/components/Form/Form';
import { fetchData } from '@/api/api';
import { ApiConstants } from '@/api/api.constants';
import { IArtwork } from '@/types/api/IArtwork';
import { IBaseTypeResponse, IFetchQueryParams } from '@/types/api/types';
import Header from '@/components/Header/Header';
import CardList from '@/components/CardList/CardList';
import styles from './App.module.scss';
import Loader from '@/components/Loader/Loader';
import { IQueryObject } from '@/types/appTypes';

const App = () => {
  const [errorState, errorDispatch] = useReducer(
    (prevState) => !prevState,
    false,
  );
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const [artworks, setArtworks] = useState<IArtwork[]>([]);

  const fetchArtworks = useCallback(
    (query: string) => {
      const initialParamsObj: IFetchQueryParams = {
        limit: limit.toString(),
        page: page.toString(),
        fields: 'id,title,image_id,artist_title,date_start,date_end',
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
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    },
    [limit, page],
  );

  useEffect(() => {
    if (errorState) {
      throw new Error('Error was thrown buy user');
    }
  }, [errorState]);

  useEffect(() => {
    const fallback: IQueryObject = {
      query: '',
    };
    const queryObject = getDataFromStorage(fallback) as IQueryObject;
    setQuery(queryObject.query);
    setLimit(8);
    setPage(1);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;
    fetchArtworks(query);
  }, [fetchArtworks, loading, query]);

  const handleSubmitForm = (query: string) => {
    setLoading(true);
    setDataToLocalStorage({ query });
  };

  return (
    <div className={styles.content}>
      <Header handleThrow={errorDispatch} />
      <div className={styles.content__base}>
        <Form
          query={query}
          handleChangeQuery={setQuery}
          handleSubmit={handleSubmitForm}
        />
        {loading && <Loader />}
        {!artworks.length && !loading && (
          <h1 className={styles.content__alert}>No artworks found here</h1>
        )}
        {!!artworks.length && <CardList cards={artworks} />}
      </div>
    </div>
  );
};

export default App;
