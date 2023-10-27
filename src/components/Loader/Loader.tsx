import { Component } from 'react';
import styles from './Loader.module.scss';

class Loader extends Component {
  public render() {
    return (
      <div className={styles.back}>
        <div className={styles.lds}>
          <div className={styles.div}></div>
          <div className={styles.div}></div>
          <div className={styles.div}></div>
          <div className={styles.div}></div>
        </div>
      </div>
    );
  }
}
export default Loader;
