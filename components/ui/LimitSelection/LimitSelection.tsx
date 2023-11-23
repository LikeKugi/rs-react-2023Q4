import { JSX, useId } from 'react';
import styles from './LimitSelection.module.scss';
import { useRouter } from 'next/router';

const LimitSelection = (): JSX.Element => {
  const selectId = useId();
  const router = useRouter();

  const limit = router.query.limit || '8';

  const handleLimitChange = (value: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        limit: value.toString(),
      },
    });
  };

  return (
    <div className={styles.limit}>
      <label htmlFor={selectId}>Artworks on the page:</label>
      <select
        className={styles.limit__select}
        id={selectId}
        onChange={(e) => handleLimitChange(+e.target.value)}
        value={limit}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <option value={i * 4 + 4} key={i}>
            {i * 4 + 4}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LimitSelection;
