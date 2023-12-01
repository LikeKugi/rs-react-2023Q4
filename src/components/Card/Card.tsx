import { FC, JSX } from 'react';
import { IFormReduxState } from '@/store/formDataSlice';
import styles from './Card.module.scss';

interface IFormResultProps {
  data: IFormReduxState;
  isNew?: boolean;
}

const Card: FC<IFormResultProps> = ({ data, isNew }): JSX.Element => {
  return (
    <div className={`${styles.card} ${isNew ? styles['card--new'] : ''}`}>
      <div className={styles.card__content}>
        <p className={styles.card__line}>
          <strong>Name:</strong> {data.name}
        </p>
        <p className={styles.card__line}>
          <strong>Age:</strong> {data.age}
        </p>
        <p className={styles.card__line}>
          <strong>Email:</strong> {data.email}
        </p>
        <p className={styles.card__line}>
          <strong>Password:</strong> {data.password}
        </p>
        <p className={styles.card__line}>
          <strong>Confirm password:</strong> {data.confirmPassword}
        </p>
        <p className={styles.card__line}>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p className={styles.card__line}>
          <strong>T&C Assignment:</strong> {data.accept && 'Accepted'}
        </p>
        <p className={styles.card__line}>
          <strong>File Name:</strong> {data.image.name}
        </p>
      </div>
      <img
        className={styles.card__img}
        src={data.image.file.toString()}
        alt={data.image.name}
      />
    </div>
  );
};
export default Card;
