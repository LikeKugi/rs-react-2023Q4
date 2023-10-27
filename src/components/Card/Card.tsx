import { Component } from 'react';
import { IArtwork } from '@/types/api/IArtwork';
import styles from './Card.module.scss';

interface ICardProps {
  content: IArtwork;
}

class Card extends Component<ICardProps, object> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.card}>
        <img
          className={styles.card__img}
          src={`https://www.artic.edu/iiif/2/${this.props.content.image_id}/full/200,/0/default.jpg`}
          alt={this.props.content.title}
        />
        <div className={styles.card__body}>
          <p className={styles.card__title}>{this.props.content.title}</p>
          <p>{this.props.content.artist_title}</p>
          <p>
            {this.props.content.date_start} - {this.props.content.date_end}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
