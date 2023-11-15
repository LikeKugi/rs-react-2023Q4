import { JSX, useEffect } from 'react';
import styles from './HomePage.module.scss';
import { IFetchQueryParams } from '@/types/api/types';
import Form from '@/components/Form/Form';
import Loader from '@/components/Loader/Loader';
import CardList from '@/components/CardList/CardList';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  useLazyGetArtworksQuery,
  useLazySearchArtworkQuery,
} from '@/api/artworksApi';
import { useAppSelector } from '@/store/hooks';
import { selectIsLoadingArtworks } from '@/store/networkSlice/networkSlice';
import { selectArtworks } from '@/store/artworksSlice/artworksSlice';
import {
  selectNavigationLimit,
  selectNavigationPage,
  selectNavigationQuery,
} from '@/store/navigationSlice/navigationSlice';
import Pagination from '@/components/Pagination/Pagination';
import LimitSelection from '@/components/LimitSelection/LimitSelection';

const HomePage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const query = useAppSelector(selectNavigationQuery);
  const limit = useAppSelector(selectNavigationLimit);
  const page = useAppSelector(selectNavigationPage);
  const [getArtworks] = useLazyGetArtworksQuery();

  const [searchArtworks] = useLazySearchArtworkQuery();
  const isLoading = useAppSelector(selectIsLoadingArtworks);

  const artworks = useAppSelector(selectArtworks);

  useEffect(() => {
    const initialParamsObj: IFetchQueryParams = {
      limit: limit.toString(),
      page: page
        ? page.toString()
        : Number(searchParams.get('page')).toString() || '1',
      fields: 'id,title,image_id,artist_title,date_start,date_end,color',
    };
    if (query) {
      initialParamsObj.q = query;
    }
    const params = new URLSearchParams(initialParamsObj);
    if (params.has('q')) {
      searchArtworks(params.toString());
    } else {
      getArtworks(params.toString());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, query]);

  return (
    <div className={styles.wrapper}>
      <Outlet />
      <Form />
      {isLoading && <Loader />}
      {!artworks.length && !isLoading && (
        <h1 className={styles.alert}>No artworks found here</h1>
      )}
      {!!artworks.length && (
        <>
          <CardList />
          <Pagination />
          <LimitSelection />
        </>
      )}
    </div>
  );
};
export default HomePage;
