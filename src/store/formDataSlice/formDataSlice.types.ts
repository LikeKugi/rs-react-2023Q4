import { TFormState } from '~/utils/formSchema';

export interface IFormReduxState extends Omit<TFormState, 'image'> {
  image: {
    name: string;
    file: object;
  };
}

export interface IFromDataSlice {
  controlled: IFormReduxState[];
  uncontrolled: IFormReduxState[];
  lastAdded: IFormReduxState | null;
}
