import { FC, JSX } from 'react';
import { IArtwork } from '@/types';
import styles from './CardList.module.scss';
import Card from '@/components/ui/Card/Card';
import { useRouter } from 'next/router';
import { RouterConstants } from '@/routes';

interface ICardListProps {
  cards: IArtwork[];
}

const CardList: FC<ICardListProps> = ({ cards }): JSX.Element => {
  const router = useRouter();

  const queries = Object.entries(router.query)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return (
    <div className={styles.list}>
      <h2 className={styles.list__title}>Artworks</h2>
      {cards.length ? (
        <div className={styles.list__grid}>
          {cards.map((card) => (
            <Card
              key={card.id}
              content={card}
              link={`${RouterConstants.INDEX}?${queries}&details=${card.id}`}
            />
          ))}
        </div>
      ) : (
        <h1 className={styles.alert}>No artworks found here</h1>
      )}
    </div>
  );
};
export default CardList;
