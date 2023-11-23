import { JSX } from 'react';
import ModalWrapper from '@/components/ui/ModalWrapper/ModalWrapper';
import { useRouter } from 'next/router';
import { useGetArtworkQuery } from '@/store/api';
import ArtworkDetails from '@/components/ui/ArtworkDetails/ArtworkDetails';

const DetailsPage = (): JSX.Element => {
  const router = useRouter();
  const artworkId = router.query.details;

  if (!artworkId || typeof artworkId !== 'string') {
    const queryParams = router.query;
    delete queryParams.details;
    router.push({
      pathname: router.pathname,
      query: { ...queryParams },
    });
  }

  const { data } = useGetArtworkQuery(artworkId as string);

  return (
    <ModalWrapper>
      {data && <ArtworkDetails artwork={data.data} />}
    </ModalWrapper>
  );
};
export default DetailsPage;
