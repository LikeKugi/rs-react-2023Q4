import { JSX, useEffect } from 'react';
import styles from './ArtworkDetails.module.scss';
import parse from 'html-react-parser';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import { useLazyGetArtworkQuery } from '@/api/artworksApi';
import { RouterConstants } from '@/routes/RouterConstants';

const ArtworkDetails = (): JSX.Element => {
  const { artworkId } = useParams();
  const [getArtwork, { data, isLoading }] = useLazyGetArtworkQuery();

  useEffect(() => {
    if (!artworkId) return;
    getArtwork(artworkId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!artworkId) {
    return <Navigate to={RouterConstants.INDEX} />;
  }

  if (isLoading || !data) {
    return <Loader />;
  }

  const artwork = data.data;

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
