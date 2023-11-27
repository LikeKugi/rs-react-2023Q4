import { FC, JSX } from 'react';
import { IArtwork } from '@/types';
import styles from './Card.module.scss';
import Link from 'next/link';
import ImgSkeleton from '@/components/ImgSkeleton/ImgSkeleton';
import Image from 'next/image';

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
  link: string;
}

const Card: FC<ICardProps> = ({ content, link }): JSX.Element => {
  const { h, s, l, percentage } = content.color
    ? content.color
    : { h: 0, s: 0, l: 40, percentage: 0.5 };
  return (
    <div className={styles.card}>
      <Link className={styles.card__link} href={link}>
        {content.image_id ? (
          <Image
            className={styles.card__img}
            src={`https://www.artic.edu/iiif/2/${content.image_id}/full/843,/0/default.jpg`}
            alt={content.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
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
