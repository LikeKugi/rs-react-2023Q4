import { FormEvent, JSX, useState } from 'react';
import TextInput from '@/components/TextInput/TextInput';
import CheckInput from '@/components/CheckInput/CheckInput';
import GroupInput from '@/components/GroupInput/GroupInput';
import styles from './UncontrolledForm.module.scss';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import { selectAllCountries, useAppSelector } from '@/store';

const UncontrolledForm = (): JSX.Element => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const countriesList = useAppSelector(selectAllCountries);

  const [isError, setError] = useState(false);

  return (
    <form className={styles.uncontrolled} onSubmit={submitHandler}>
      <TextInput labelText={'Name'} isError={isError} />
      <TextInput labelText={'Age'} type={'number'} isError={isError} />
      <TextInput labelText={'Email'} type={'email'} isError={isError} />
      <TextInput labelText={'Password'} type={'password'} isError={isError} />
      <TextInput
        labelText={'Confirm Password'}
        type={'password'}
        isError={isError}
      />
      <GroupInput
        groupLabel={'T&C Terms'}
        errorMessage="Must be checked"
        isError={isError}
      >
        <CheckInput name="tandc" type="checkbox" labelText="Accept T&C" />
      </GroupInput>
      <GroupInput groupLabel={'Sex'} isError={isError}>
        {['man', 'woman', 'other'].map((val) => (
          <CheckInput name="sex" type="radio" labelText={val} value={val} />
        ))}
      </GroupInput>
      <TextInput labelText={'Image file'} type={'file'} isError={isError} />
      <Autocomplete labelText={'Country'} variants={countriesList} />
      <SubmitButton
        type={'button'}
        onClick={() => setError((prevState) => !prevState)}
      />
    </form>
  );
};
export default UncontrolledForm;
