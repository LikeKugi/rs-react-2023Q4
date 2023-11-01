import { FC } from 'react';
import { IArtwork } from '@/types/api/IArtwork';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/routes/RouterConstants';

interface ICardProps {
  content: IArtwork;
}

const Card: FC<ICardProps> = ({ content }) => {
  return (
    <div className={styles.card}>
      <Link to={`${RouterConstants.ARTWORKS}${content.id}`}>Id page</Link>
      <img
        className={styles.card__img}
        src={`https://www.artic.edu/iiif/2/${content.image_id}/full/200,/0/default.jpg`}
        alt={content.title}
      />
      <div className={styles.card__body}>
        <p className={styles.card__title}>{content.title}</p>
        <p>{content.artist_title}</p>
        <p>
          {content.date_start} - {content.date_end}
        </p>
      </div>
    </div>
  );
};

export default Card;
