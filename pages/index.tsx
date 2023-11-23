import { IBaseGetArtworksRequest, IFetchQueryParams } from '@/types';
import { getArtworks, getRunningQueriesThunk } from '@/store/api';
import { wrapper } from '@/store/store';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/Loader/Loader';

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

const HomePage = dynamic(
  () => import('@/components/layouts/HomePage/HomePage'),
  { loading: () => <Loader /> },
);
const Home = () => {
  return <HomePage />;
};

export default Home;
