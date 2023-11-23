import { JSX, useId } from 'react';
import styles from './LimitSelection.module.scss';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import { endLoading, startLoading } from '@/store/networkSlice/networkSlice';

const LimitSelection = (): JSX.Element => {
  const selectId = useId();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const limit = router.query.limit || '8';

  const handleLimitChange = (value: number) => {
    dispatch(startLoading());
    router
      .push({
        pathname: router.pathname,
        query: {
          ...router.query,
          limit: value.toString(),
        },
      })
      .then(() => dispatch(endLoading()));
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
