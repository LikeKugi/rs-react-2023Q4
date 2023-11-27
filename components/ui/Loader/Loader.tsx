import { JSX } from 'react';
import styles from './Loader.module.scss';

const Loader = (): JSX.Element => {
  return (
    <div className={styles.back} role="loader">
      <div className={styles.loader}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={styles.div} />
        ))}
      </div>
    </div>
  );
};
export default Loader;
