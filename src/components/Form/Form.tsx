import { FormEvent, useCallback, useId, useState } from 'react';
import styles from './Form.module.scss';
import { setDataToLocalStorage } from '@/services/localStorageServices';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectNavigationQuery,
  setPage,
  setQuery,
} from '@/store/navigationSlice/navigationSlice';

const Form = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectNavigationQuery);

  const [inputValue, setInputValue] = useState(query);

  const queryInput = useId();

  const submitAction = useCallback(
    (query: string) => {
      dispatch(setQuery(query));
      dispatch(setPage(1));
      setDataToLocalStorage({ query });
    },
    [dispatch],
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    submitAction(inputValue);
  };

  const resetFormHandler = (e: FormEvent) => {
    e.preventDefault();
    if (query === '') return;
    dispatch(setQuery(''));
    setInputValue('');
    submitAction('');
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}
      onReset={resetFormHandler}
    >
      <label htmlFor={queryInput}>Query: </label>
      <input
        className={styles.form__input}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        id={queryInput}
      />
      <button type="submit">Search</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default Form;
