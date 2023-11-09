import { FormEvent, useCallback, useEffect, useId } from 'react';
import styles from './Form.module.scss';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import { IQueryObject } from '@/types/app.types';

const Form = () => {
  const { query, setQuery, setPage } = useNavigationProvider();

  const queryInput = useId();

  useEffect(() => {
    const fallback: IQueryObject = {
      query: '',
    };
    const queryObject = getDataFromStorage(fallback) as IQueryObject;
    setQuery(queryObject.query);
    setPage(1);
  }, [setPage, setQuery]);

  const submitAction = useCallback(
    (query: string) => {
      setPage(1);
      setDataToLocalStorage({ query });
    },
    [setPage],
  );

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      submitAction(query);
    },
    [query, submitAction],
  );

  const resetFormHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (query === '') return;
      setQuery('');
      submitAction('');
    },
    [query, setQuery, submitAction],
  );

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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id={queryInput}
      />
      <button type="submit">Search</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default Form;
