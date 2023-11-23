import { JSX } from 'react';
import { useRouter } from 'next/router';
import { IBaseGetArtworksRequest, IFetchQueryParams } from '@/types';
import { useGetArtworksQuery } from '@/store/api';
import Meta from '@/components/Meta/Meta';
import Form from '@/components/ui/Form/Form';
import CardList from '@/components/ui/CardList/CardList';
import Pagination from '@/components/ui/Pagination/Pagination';
import LimitSelection from '@/components/ui/LimitSelection/LimitSelection';

const HomePage = (): JSX.Element => {
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
          <LimitSelection />
        </>
      )}
    </>
  );
};
export default HomePage;
