import { JSX, useEffect, useState } from 'react';
import { IArtwork } from '@/types';
import styles from './ArtworkDetails.module.scss';
import parse from 'html-react-parser';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { useParams } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import { useGetArtworkQuery } from '@/api/artworksApi';

const ArtworkDetails = (): JSX.Element => {
  const [artwork, setArtwork] = useState<IArtwork | null>(null);
  const { artworkId } = useParams();
  const { data, isLoading } = useGetArtworkQuery(artworkId as string);

  useEffect(() => {
    if (!data) return;
    setArtwork(data.data);
  }, [data]);

  if (isLoading || !data || !artwork) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <div className={styles.artwork}>
        <h2>{artwork.title}</h2>
        <div className={styles.artwork__box}>
          {artwork.image_id ? (
            <img
              className={styles.artwork__img}
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
            />
          ) : artwork.on_loan_display ? (
            parse(artwork.on_loan_display)
          ) : (
            artwork.title
          )}
        </div>
        <p>
          <strong>{artwork.artist_display}</strong>
        </p>
        <p>
          <strong>
            {artwork.date_start} - {artwork.date_end}
          </strong>
        </p>
        <div className={styles.artwork__text}>
          {artwork.description && parse(artwork.description)}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default ArtworkDetails;
