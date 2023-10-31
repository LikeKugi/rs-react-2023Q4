import { Component } from 'react';
import styles from './Loader.module.scss';

class Loader extends Component {
  public render() {
    return (
      <div className={styles.back}>
        <div className={styles.loader}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.div} />
          ))}
        </div>
      </div>
    );
  }
}
export default Loader;
