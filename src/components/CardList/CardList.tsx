import Card from '@/components/Card/Card';
import styles from './CardList.module.scss';
import { useAppSelector } from '@/store/hooks';
import { selectArtworks } from '@/store/artworksSlice/artworksSlice';

const CardList = () => {
  const cards = useAppSelector(selectArtworks);

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
