import TextInput from '@/components/TextInput/TextInput';
import GroupInput from '@/components/GroupInput/GroupInput';
import CheckInput from '@/components/CheckInput/CheckInput';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import styles from './ControlledForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema, TFormState } from '~/utils/formSchema';
import { selectAllCountries, useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import { addControlledFormData } from '@/store/formDataSlice';
import { RoutesConstants } from '@/constants';
import { convertFormDataToReduxStateObject } from '@/utils/convertFormDataToReduxStateObject';
import Autocomplete from '@/components/Autocomplete/Autocomplete';

const ControlledForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countriesList = useAppSelector(selectAllCountries);
  const {
    control,
    formState: { errors, isDirty, isValid },
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
      image: '',
      country: '',
    },
  });
  const submitHandler = async (data: TFormState) => {
    const toReduxObj = await convertFormDataToReduxStateObject(data);
    dispatch(addControlledFormData(toReduxObj));
    navigate(RoutesConstants.INDEX);
  };

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

      <Controller
        control={control}
        name={'country'}
        render={({ field: { ref, ...field } }) => (
          <Autocomplete
            inputRef={ref}
            isError={!!errors.country?.message}
            errorMessage={errors.country?.message}
            labelText={'Country'}
            variants={countriesList}
            {...field}
            autoComplete={'off'}
          />
        )}
      />

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

      <Controller
        control={control}
        name={'image'}
        render={({ field: { ref, value, onChange, ...field } }) => (
          <TextInput
            inputRef={ref}
            labelText={'Image file'}
            type={'file'}
            isError={!!errors.image?.message}
            errorMessage={errors.image?.message}
            {...field}
            value={
              value
                ? 'fileName' in value
                  ? (value.fileName as string)
                  : undefined
                : undefined
            }
            onChange={(event) => {
              onChange(event.target.files ? event.target.files[0] : '');
            }}
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

      <SubmitButton disabled={!isDirty || !isValid} type={'submit'} />
    </form>
  );
};

export default ControlledForm;
