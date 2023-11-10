import { FC, JSX, useId } from 'react';
import styles from './LimitSelection.module.scss';

interface ILimitSelectionProps {
  limit: number;
  setLimit: (arg: number) => void;
}

const LimitSelection: FC<ILimitSelectionProps> = ({
  limit,
  setLimit,
}): JSX.Element => {
  const selectId = useId();
  return (
    <div className={styles.limit}>
      <label htmlFor={selectId}>Artworks on the page:</label>
      <select
        className={styles.limit__select}
        id={selectId}
        onChange={(e) => setLimit(+e.target.value)}
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
