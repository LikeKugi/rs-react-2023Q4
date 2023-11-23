import { FC, JSX } from 'react';
import styles from './ArtworkDetails.module.scss';
import { IArtwork } from '@/types';
import Meta from '@/components/Meta/Meta';
import Image from 'next/image';

interface IArtworkDetailsProps {
  artwork: IArtwork;
}

const ArtworkDetails: FC<IArtworkDetailsProps> = ({ artwork }): JSX.Element => {
  return (
    <>
      <Meta title={artwork.title} />
      <div className={styles.artwork}>
        <h2>{artwork.title}</h2>
        <div className={styles.artwork__box}>
          {artwork.image_id ? (
            <Image
              className={styles.artwork__img}
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          ) : artwork.on_loan_display ? (
            <p dangerouslySetInnerHTML={{ __html: artwork.on_loan_display }} />
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
        {artwork.description && (
          <div
            className={styles.artwork__text}
            dangerouslySetInnerHTML={{ __html: artwork.description }}
          />
        )}
      </div>
    </>
  );
};
export default ArtworkDetails;
