import { FC, JSX } from 'react';
import { IArtwork } from '@/types/api/IArtwork';
import styles from './ArtworkDetails.module.scss';
import parse from 'html-react-parser';

interface IArtworkDetails {
  content: IArtwork;
}

const ArtworkDetails: FC<IArtworkDetails> = ({ content }): JSX.Element => {
  return (
    <div className={styles.artwork}>
      <h2>{content.title}</h2>
      <div className={styles.artwork__box}>
        {content.image_id ? (
          <img
            className={styles.artwork__img}
            src={`https://www.artic.edu/iiif/2/${content.image_id}/full/843,/0/default.jpg`}
            alt={content.title}
          />
        ) : (
          parse(content.on_loan_display)
        )}
      </div>
      <p>
        <strong>{content.artist_display}</strong>
      </p>
      {content.description && parse(content.description)}
      <p></p>
    </div>
  );
};
export default ArtworkDetails;
