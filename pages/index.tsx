import { IBaseGetArtworksRequest, IFetchQueryParams } from '@/types';
import { getArtwork, getArtworks, getRunningQueriesThunk } from '@/store/api';
import { wrapper } from '@/store/store';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/Loader/Loader';
import Meta from '@/components/Meta/Meta';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

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

    if (
      'details' in context.query &&
      typeof context.query.details === 'string'
    ) {
      store.dispatch(getArtwork.initiate(context.query.details));
    }

    store.dispatch(getArtworks.initiate(requestObject));

    try {
      await Promise.all(store.dispatch(getRunningQueriesThunk()));
      return {
        props: {
          details: 'details' in context.query,
        },
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
  { loading: () => <Loader />, ssr: true },
);

const Home = ({ details }: { details: boolean }) => {
  if (!details) {
    return (
      <ErrorBoundary>
        <Meta title="Artistic by Art Institute of Chicago API" />
        <HomePage />
      </ErrorBoundary>
    );
  }

  const DetailsPage = dynamic(
    () => import('@/components/layouts/DetailsPage/DetailsPage'),
    { loading: () => <Loader />, ssr: true },
  );

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex' }}>
        <HomePage />
        <DetailsPage />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
