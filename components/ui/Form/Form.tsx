import { FormEvent, JSX, useId } from 'react';
import styles from './Form.module.scss';
import { useRouter } from 'next/router';

const Form = (): JSX.Element => {
  const queryInput = useId();

  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get('q'));
    console.log(router.pathname);
    console.log(router.query);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        q: formData.get('q') as string,
      },
    });
  };

  const resetFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuery = router.query;
    delete newQuery.q;
    router.push({
      pathname: router.pathname,
      query: {
        ...newQuery,
      },
    });
    e.currentTarget['q'].value = '';
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
