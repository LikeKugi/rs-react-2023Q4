import * as yup from 'yup';

import YupPassword from 'yup-password';
YupPassword(yup);

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First character must be uppercase'),
  age: yup
    .number()
    .required('Age is required')
    .moreThan(0, 'Age must be positive')
    .integer('Must be integer'),
  email: yup.string().required('Email is required').email('Must be email'),
  password: yup
    .string()
    .required('Password is required')
    .password()
    .minNumbers(1, 'Must contain number')
    .minLowercase(1, 'Must contain lowercase letter')
    .minUppercase(1, 'Must contain uppercase letter')
    .minSymbols(1, 'Must contain symbol'),
  confirmPassword: yup
    .string()
    .required('You must confirm password')
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup
    .string()
    .required('You must choose gender')
    .oneOf(['man', 'woman', 'other']),
  accept: yup
    .boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),
});

export type TFormState = yup.InferType<typeof formSchema>;
