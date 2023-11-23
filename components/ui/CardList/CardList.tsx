import { FC, JSX } from 'react';
import { IArtwork } from '@/types';
import styles from './CardList.module.scss';
import Card from '@/components/ui/Card/Card';

interface ICardListProps {
  cards: IArtwork[];
}

const CardList: FC<ICardListProps> = ({ cards }): JSX.Element => {
  return (
    <div className={styles.list}>
      <h2 className={styles.list__title}>Artworks</h2>
      <div className={styles.list__grid}>
        {cards.map((card) => (
          <Card key={card.id} content={card} />
        ))}
      </div>
    </div>
  );
};
export default CardList;
