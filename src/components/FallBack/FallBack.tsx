import { FC } from 'react';
import styles from './FallBack.module.scss';

interface IFallBackProps {
  buttonClickHandler: () => void;
}

const FallBack: FC<IFallBackProps> = ({ buttonClickHandler }) => {
  return (
    <div className={styles.fallback}>
      <h1>Something went wrong.</h1>
      <button onClick={buttonClickHandler}>Back to main</button>
    </div>
  );
};

export default FallBack;
