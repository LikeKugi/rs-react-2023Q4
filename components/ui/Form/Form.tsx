import { FormEvent, JSX, useId } from 'react';
import styles from './Form.module.scss';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import { endLoading, startLoading } from '@/store/networkSlice/networkSlice';

const Form = (): JSX.Element => {
  const queryInput = useId();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoading());
    const formData = new FormData(e.currentTarget);
    router
      .push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: '1',
          q: formData.get('q') as string,
        },
      })
      .then(() => dispatch(endLoading()));
  };

  const resetFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoading());
    const newQuery = router.query;
    delete newQuery.q;
    e.currentTarget['q'].value = '';
    router
      .push({
        pathname: router.pathname,
        query: {
          ...newQuery,
          page: '1',
        },
      })
      .then(() => dispatch(endLoading()));
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
        name={'q'}
        defaultValue={router.query.q || ''}
        id={queryInput}
      />
      <button type="submit">Search</button>
      <button type="reset">Reset</button>
    </form>
  );
};
export default Form;
