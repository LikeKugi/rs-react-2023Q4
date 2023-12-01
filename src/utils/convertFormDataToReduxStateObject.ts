import { TFormState } from '~/utils/formSchema';
import { getBase64 } from '@/utils/getBase';
import { IFormReduxState } from '@/store/formDataSlice';

export const convertFormDataToReduxStateObject = async (data: TFormState) => {
  const file = await getBase64(data.image as unknown as File);
  const value = data.image;
  console.log(value);

  const toReduxObj: IFormReduxState = {
    name: data.name,
    age: data.age,
    accept: data.accept,
    email: data.email,
    gender: data.gender,
    password: data.password,
    confirmPassword: data.confirmPassword,
    image: {
      file: file as object,
      name: value ? ('name' in value ? (value.name as string) : '') : '',
    },
  };

  console.log(toReduxObj);

  return toReduxObj;
};
