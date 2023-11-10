import { FormEvent, useCallback, useEffect, useId, useState } from 'react';
import styles from './Form.module.scss';
import { useNavigationProvider } from '@/provider/NavigationProvider/NavigationProvider.hooks';
import {
  getDataFromStorage,
  setDataToLocalStorage,
} from '@/services/localStorageServices';
import { IQueryObject } from '@/types/app.types';

const Form = () => {
  const { query, setQuery, setPage } = useNavigationProvider();

  const [inputValue, setInputValue] = useState(query);

  const queryInput = useId();

  useEffect(() => {
    const fallback: IQueryObject = {
      query: '',
    };
    const queryObject = getDataFromStorage(fallback) as IQueryObject;
    setQuery(queryObject.query);
    setInputValue(queryObject.query);
    setPage(1);
  }, [setPage, setQuery]);

  const submitAction = useCallback(
    (query: string) => {
      setQuery(query);
      setPage(1);
      setDataToLocalStorage({ query });
    },
    [setPage, setQuery],
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    submitAction(inputValue);
  };

  const resetFormHandler = (e: FormEvent) => {
    e.preventDefault();
    if (query === '') return;
    setQuery('');
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
