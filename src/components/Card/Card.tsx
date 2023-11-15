import { FC } from 'react';
import { IArtwork } from '@/types/api/artworks.types';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { RouterConstants } from '@/routes/RouterConstants';
import ImgSkeleton from '@/components/ImgSkeleton/ImgSkeleton';

interface ICardProps {
  content: Pick<
    IArtwork,
    | 'color'
    | 'id'
    | 'image_id'
    | 'title'
    | 'artist_title'
    | 'date_start'
    | 'date_end'
  >;
}

const Card: FC<ICardProps> = ({ content }) => {
  const { h, s, l, percentage } = content.color
    ? content.color
    : { h: 0, s: 0, l: 40, percentage: 0.5 };
  return (
    <div className={styles.card}>
      <Link
        className={styles.card__link}
        to={`${RouterConstants.ARTWORKS}${content.id}`}
      >
        {content.image_id ? (
          <img
            className={styles.card__img}
            src={`https://www.artic.edu/iiif/2/${content.image_id}/full/843,/0/default.jpg`}
            alt={content.title}
          />
        ) : (
          <ImgSkeleton h={h} l={l} s={s} percentage={percentage} />
        )}
        <div className={styles.card__body}>
          <p className={styles.card__title}>{content.title}</p>
          <p>{content.artist_title}</p>
          <p>
            {content.date_start} - {content.date_end}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
