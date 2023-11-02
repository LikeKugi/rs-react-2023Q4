import { FC, FormEvent, useCallback } from 'react';
import styles from './Form.module.scss';

interface IFormProps {
  query: string;
  handleChangeQuery: (arg: string) => void;
  handleSubmit: (arg: string) => void;
}

const Form: FC<IFormProps> = ({ query, handleChangeQuery, handleSubmit }) => {
  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      handleSubmit(query);
    },
    [handleSubmit, query],
  );

  const resetFormHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (query === '') return;
      handleChangeQuery('');
      handleSubmit('');
    },
    [handleChangeQuery, handleSubmit, query],
  );

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}
      onReset={resetFormHandler}
    >
      <label htmlFor="queryInput">Query: </label>
      <input
        className={styles.form__input}
        type="text"
        value={query}
        onChange={(e) => handleChangeQuery(e.target.value)}
        id={'queryInput'}
      />
      <button type="submit">Search</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default Form;
