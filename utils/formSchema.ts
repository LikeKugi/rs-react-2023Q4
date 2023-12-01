import * as yup from 'yup';

import YupPassword from 'yup-password';
YupPassword(yup);

const FILE_SIZE = 1024 * 10240;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

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
  image: yup
    .mixed()
    .required('You need to provide a file')
    .test('fileSize', 'The file size must be under 10MB', (value) => {
      return value && (value as File).size <= FILE_SIZE;
    })
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg and .png',
      (value) => {
        return value && SUPPORTED_FORMATS.includes((value as File).type);
      },
    ),
});

export type TFormState = yup.InferType<typeof formSchema>;
