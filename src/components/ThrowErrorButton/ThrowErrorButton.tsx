import { JSX, useEffect, useReducer } from 'react';
import styles from './ThrowErrorButton.module.scss';

const ThrowErrorButton = (): JSX.Element => {
  const [errorState, errorDispatch] = useReducer(
    (prevState) => !prevState,
    false,
  );

  useEffect(() => {
    if (errorState) {
      throw new Error('Error was thrown buy user');
    }
  }, [errorState]);

  return (
    <button className={styles.button} onClick={errorDispatch}>
      Throw Error
    </button>
  );
};
export default ThrowErrorButton;
