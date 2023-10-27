import { Component } from 'react';
import { IArtwork } from '@/types/api/IArtwork';
import Card from '@/components/Card/Card';
import styles from './CardList.module.scss';

interface ICardListProps {
  cards: IArtwork[];
}

class CardList extends Component<ICardListProps, object> {
  constructor(props: ICardListProps) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.list}>
        <h2 className={styles.list__title}>Artworks</h2>
        <div className={styles.list__grid}>
          {this.props.cards.map((card) => (
            <Card key={card.id} content={card} />
          ))}
        </div>
      </div>
    );
  }
}

export default CardList;
