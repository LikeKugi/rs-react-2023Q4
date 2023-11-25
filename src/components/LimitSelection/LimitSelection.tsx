import { JSX, useId } from 'react';
import styles from './LimitSelection.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectNavigationLimit,
  setLimit,
} from '@/store/navigationSlice/navigationSlice';

const LimitSelection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector(selectNavigationLimit);
  const selectId = useId();

  return (
    <div className={styles.limit}>
      <label htmlFor={selectId}>Artworks on the page:</label>
      <select
        className={styles.limit__select}
        id={selectId}
        onChange={(e) => dispatch(setLimit(+e.target.value))}
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
