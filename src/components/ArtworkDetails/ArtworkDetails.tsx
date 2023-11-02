import { FC, JSX } from 'react';
import { IArtwork } from '@/types/api/IArtwork';
import styles from './ArtworkDetails.module.scss';
import parse from 'html-react-parser';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

interface IArtworkDetails {
  content: IArtwork;
}

const ArtworkDetails: FC<IArtworkDetails> = ({ content }): JSX.Element => {
  return (
    <ErrorBoundary>
      <div className={styles.artwork}>
        <h2>{content.title}</h2>
        <div className={styles.artwork__box}>
          {content.image_id ? (
            <img
              className={styles.artwork__img}
              src={`https://www.artic.edu/iiif/2/${content.image_id}/full/843,/0/default.jpg`}
              alt={content.title}
            />
          ) : content.on_loan_display ? (
            parse(content.on_loan_display)
          ) : (
            content.title
          )}
        </div>
        <p>
          <strong>{content.artist_display}</strong>
        </p>
        <p>
          <strong>
            {content.date_start} - {content.date_end}
          </strong>
        </p>
        <div className={styles.artwork__text}>
          {content.description && parse(content.description)}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default ArtworkDetails;
