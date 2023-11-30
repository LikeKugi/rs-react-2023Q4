import { FormEvent, JSX, useState } from 'react';
import TextInput from '@/components/TextInput/TextInput';
import CheckInput from '@/components/CheckInput/CheckInput';
import GroupInput from '@/components/GroupInput/GroupInput';

const UncontrolledForm = (): JSX.Element => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [isError, setError] = useState(false);

  return (
    <form onSubmit={submitHandler}>
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
      <button
        type={'button'}
        onClick={() => setError((prevState) => !prevState)}
      >
        Submit
      </button>
    </form>
  );
};
export default UncontrolledForm;
