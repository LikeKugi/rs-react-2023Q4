import Meta from '@/components/Meta/Meta';
import { IBaseGetArtworksRequest, IFetchQueryParams } from '@/types';
import {
  getArtworks,
  getRunningQueriesThunk,
  useGetArtworksQuery,
} from '@/store/api';
import { wrapper } from '@/store/store';
import { useRouter } from 'next/router';
import Form from '@/components/ui/Form/Form';
import Pagination from '@/components/ui/Pagination/Pagination';
import CardList from '@/components/ui/CardList/CardList';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const initialParams: IFetchQueryParams = {
      limit: context.query.limit?.toString() || '8',
      page: context.query.page?.toString() || '1',
      fields: 'id,title,image_id,artist_title,date_start,date_end,color',
    };

    const params = new URLSearchParams(initialParams);

    const requestObject: IBaseGetArtworksRequest = {
      params: params.toString(),
    };

    if ('q' in context.query && typeof context.query.q === 'string') {
      requestObject['q'] = context.query.q;
    }

    store.dispatch(getArtworks.initiate(requestObject));

    try {
      await Promise.all(store.dispatch(getRunningQueriesThunk()));
      return {
        props: {},
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

const Home = () => {
  const router = useRouter();

  const initialParams: IFetchQueryParams = {
    limit: router.query.limit?.toString() || '8',
    page: router.query.page?.toString() || '1',
    fields: 'id,title,image_id,artist_title,date_start,date_end,color',
  };

  const params = new URLSearchParams(initialParams);

  const requestObject: IBaseGetArtworksRequest = {
    params: params.toString(),
  };

  if ('q' in router.query && typeof router.query.q === 'string') {
    requestObject['q'] = `q=${router.query.q.toString()}`;
  }

  const { data } = useGetArtworksQuery(requestObject);

  return (
    <>
      <Meta title="Artistic by Art Institute of Chicago API" />
      <main>
        <Form />
      </main>
      {data && (
        <>
          <CardList cards={data.data} />
          <Pagination totalPages={data.pagination.total_pages} />
        </>
      )}
    </>
  );
};

export default Home;
