import { FormEvent, JSX, useRef, useState } from 'react';
import TextInput from '@/components/TextInput/TextInput';
import CheckInput from '@/components/CheckInput/CheckInput';
import GroupInput from '@/components/GroupInput/GroupInput';
import styles from './UncontrolledForm.module.scss';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import { selectAllCountries, useAppDispatch, useAppSelector } from '@/store';
import { formSchema, TFormState } from '~/utils/formSchema';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { convertFormDataToReduxStateObject } from '@/utils/convertFormDataToReduxStateObject';
import { addUncontrolledFormData } from '@/store/formDataSlice';
import { RoutesConstants } from '@/constants';

type TFormError = Record<keyof TFormState, string>;

const initialErrors: TFormError = {
  name: '',
  country: '',
  image: '',
  accept: '',
  gender: '',
  age: '',
  confirmPassword: '',
  password: '',
  email: '',
};

const UncontrolledForm = (): JSX.Element => {
  const [errors, setErrors] = useState<TFormError>(initialErrors);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataToValidate: TFormState = {
      name: (formData.get('name') as string) || '',
      age: Number(formData.get('age')) || -1,
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      confirmPassword: (formData.get('confirmPassword') as string) || '',
      gender: (formData.get('gender') as string) || '',
      accept: !!formData.get('accept') || false,
      image: inputFileRef.current
        ? inputFileRef.current.files
          ? inputFileRef.current.files[0]
          : {}
        : {},
      country: (formData.get('country') as string) || '',
    };
    const isValid = await formSchema.isValid(dataToValidate, {
      abortEarly: false,
    });
    if (isValid) {
      const toReduxObj =
        await convertFormDataToReduxStateObject(dataToValidate);
      dispatch(addUncontrolledFormData(toReduxObj));
      navigate(RoutesConstants.INDEX);
    }
    setErrors(initialErrors);
    formSchema.validate(dataToValidate, { abortEarly: false }).catch((err) => {
      const formErrors = err.inner.reduce(
        (acc: TFormError, error: ValidationError) => {
          return {
            ...acc,
            [error.path as string]: error.message,
          };
        },
        {},
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...formErrors,
      }));
    });
  };

  const countriesList = useAppSelector(selectAllCountries);

  return (
    <form className={styles.uncontrolled} onSubmit={submitHandler}>
      <TextInput
        name={'name'}
        labelText={'Name'}
        isError={!!errors.name}
        errorMessage={errors.name}
        autoComplete={'name'}
      />
      <TextInput
        name={'age'}
        labelText={'Age'}
        type={'number'}
        isError={!!errors.age}
        errorMessage={errors.age}
        autoComplete={'off'}
      />
      <TextInput
        name={'email'}
        labelText={'Email'}
        type={'email'}
        isError={!!errors.email}
        errorMessage={errors.email}
        autoComplete={'email'}
      />
      <TextInput
        name={'password'}
        labelText={'Password'}
        type={'password'}
        isError={!!errors.password}
        errorMessage={errors.password}
        autoComplete={'new-password'}
      />
      <TextInput
        name={'confirmPassword'}
        labelText={'Confirm Password'}
        type={'password'}
        isError={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
        autoComplete={'new-password'}
      />
      <Autocomplete
        name={'country'}
        labelText={'Country'}
        variants={countriesList}
        isError={!!errors.country}
        errorMessage={errors.country}
        autoComplete={'off'}
      />
      <GroupInput
        groupLabel={'Sex'}
        isError={!!errors.gender}
        errorMessage={errors.gender}
      >
        {['man', 'woman', 'other'].map((val) => (
          <CheckInput
            key={val}
            name="gender"
            type="radio"
            labelText={val}
            value={val}
          />
        ))}
      </GroupInput>
      <TextInput
        name={'image'}
        inputRef={inputFileRef}
        labelText={'Image file'}
        type={'file'}
        isError={!!errors.image}
        errorMessage={errors.image}
      />
      <GroupInput
        groupLabel={'T&C Terms'}
        errorMessage={errors.accept}
        isError={!!errors.accept}
      >
        <CheckInput name="accept" type="checkbox" labelText="Accept T&C" />
      </GroupInput>

      <SubmitButton type={'submit'} />
    </form>
  );
};
export default UncontrolledForm;
