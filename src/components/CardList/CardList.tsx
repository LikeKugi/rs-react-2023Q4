import Card from '@/components/Card/Card';
import styles from './CardList.module.scss';
import { useArtworksProvider } from '@/provider/ArtworksProvider/ArtworksProvider.hooks';

const CardList = () => {
  const { artworks: cards } = useArtworksProvider();

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
