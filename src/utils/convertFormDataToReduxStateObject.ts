import { TFormState } from '~/utils/formSchema';
import { getBase64 } from '@/utils/getBase';
import { IFormReduxState } from '@/store/formDataSlice';

export const convertFormDataToReduxStateObject = async (data: TFormState) => {
  const file = await getBase64(data.image as unknown as File);
  const value = data.image;

  const toReduxObj: IFormReduxState = {
    ...data,
    image: {
      file: file as object,
      name: value ? ('name' in value ? (value.name as string) : '') : '',
    },
  };

  return toReduxObj;
};
