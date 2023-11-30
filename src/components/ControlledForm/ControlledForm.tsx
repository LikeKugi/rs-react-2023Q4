import { useState } from 'react';
import TextInput from '@/components/TextInput/TextInput';
import GroupInput from '@/components/GroupInput/GroupInput';
import CheckInput from '@/components/CheckInput/CheckInput';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import styles from './ControlledForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema, TFormState } from '~/utils/formSchema';

const ControlledForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormState>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      accept: false,
      email: '',
      gender: undefined,
      password: '',
      confirmPassword: '',
    },
  });
  const submitHandler = (data: TFormState) => {
    console.log(data);
  };

  const [isError, setError] = useState(false);

  return (
    <form className={styles.controlled} onSubmit={handleSubmit(submitHandler)}>
      <Controller
        name={'name'}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            labelText={'Name'}
            isError={!!errors.name?.message}
            errorMessage={errors.name?.message}
            inputRef={ref}
            autoComplete={'name'}
            {...field}
          />
        )}
      />

      <Controller
        name={'age'}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            inputRef={ref}
            labelText={'Age'}
            type={'number'}
            isError={!!errors.age?.message}
            errorMessage={errors.age?.message}
            autoComplete={'off'}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name={'email'}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            inputRef={ref}
            labelText={'Email'}
            type={'email'}
            isError={!!errors.email?.message}
            errorMessage={errors.email?.message}
            autoComplete={'email'}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name={'password'}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            inputRef={ref}
            labelText={'Password'}
            type={'password'}
            isError={!!errors.password?.message}
            errorMessage={errors.password?.message}
            autoComplete={'new-password'}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name={'confirmPassword'}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            inputRef={ref}
            labelText={'Confirm Password'}
            type={'password'}
            isError={!!errors.confirmPassword?.message}
            errorMessage={errors.confirmPassword?.message}
            autoComplete={'new-password'}
            {...field}
          />
        )}
      />

      <GroupInput
        groupLabel={'T&C Terms'}
        errorMessage={errors.accept?.message}
        isError={!!errors.accept?.message}
      >
        <Controller
          name={'accept'}
          control={control}
          render={({ field: { ref, value, ...field } }) => (
            <CheckInput
              inputRef={ref}
              type="checkbox"
              checked={value}
              labelText="Accept T&C"
              {...field}
            />
          )}
        />
      </GroupInput>
      <GroupInput
        groupLabel={'Sex'}
        isError={!!errors.gender?.message}
        errorMessage={errors.gender?.message}
      >
        {['man', 'woman', 'other'].map((val) => (
          <Controller
            key={val}
            name={'gender'}
            control={control}
            render={({ field: { ref, ...field } }) => (
              <CheckInput
                inputRef={ref}
                type="radio"
                labelText={val}
                {...field}
                value={val}
              />
            )}
          />
        ))}
      </GroupInput>
      <TextInput labelText={'Image file'} type={'file'} isError={isError} />
      <SubmitButton
        type={'submit'}
        onClick={() => setError((prevState) => !prevState)}
      />
    </form>
  );
};

export default ControlledForm;
