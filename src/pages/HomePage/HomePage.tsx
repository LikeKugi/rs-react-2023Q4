import { JSX, useCallback, useEffect } from 'react';
import styles from './HomePage.module.scss';
import { IBaseTypeResponse, IFetchQueryParams } from '@/types/api/types';
import { ApiConstants } from '@/api/api.constants';
import { fetchData } from '@/api/api';
import Form from '@/components/Form/Form';
import Loader from '@/components/Loader/Loader';
import CardList from '@/components/CardList/CardList';
import { Outlet } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';
import LimitSelection from '@/components/LimitSelection/LimitSelection';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';
import { useArtworksProvider } from '@/provider/ArtworksProvider/ArtworksProvider.hooks';

const HomePage = (): JSX.Element => {
  const { loading, setLoading, query, limit, setLimit, page } =
    useNavigationProvider();
  const { setTotalPages, setArtworks, artworks } = useArtworksProvider();

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
    [limit, page, setArtworks, setLoading, setTotalPages],
  );

  useEffect(() => {
    if (!loading) return;
    fetchArtworks(query);
  }, [fetchArtworks, loading, query]);

  return (
    <div className={styles.wrapper}>
      <Outlet />
      <Form />
      {loading && <Loader />}
      {!artworks.length && !loading && (
        <h1 className={styles.alert}>No artworks found here</h1>
      )}
      {!!artworks.length && (
        <>
          <CardList />
          <Pagination />
          <LimitSelection limit={limit} setLimit={setLimit} />
        </>
      )}
    </div>
  );
};
export default HomePage;
