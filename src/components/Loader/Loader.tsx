import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.back}>
      <div className={styles.loader}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.div} />
        ))}
      </div>
    </div>
  );
};

export default Loader;
