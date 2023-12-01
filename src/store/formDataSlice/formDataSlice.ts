import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFromDataSlice } from '@/store/formDataSlice/formDataSlice.types';
import { TFormState } from '~/utils/formSchema';
import { RootState } from '@/store';

const initialState: IFromDataSlice = {
  controlled: [],
  uncontrolled: [],
  lastAdded: null,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addControlledFormData: (state, action: PayloadAction<TFormState>) => {
      state.controlled.push(action.payload);
      state.lastAdded = action.payload;
      return state;
    },
    addUncontrolledFormData: (state, action: PayloadAction<TFormState>) => {
      state.uncontrolled.push(action.payload);
      state.lastAdded = action.payload;
      return state;
    },
    clearLastAdded: (state) => {
      state.lastAdded = null;
      return state;
    },
  },
});

export const selectControlledFormData = (state: RootState) =>
  state.formData.controlled;
export const selectUncontrolledFormData = (state: RootState) =>
  state.formData.uncontrolled;
export const selectLastAddedFormData = (state: RootState) =>
  state.formData.lastAdded;

export const formDataSliceReducer = formDataSlice.reducer;
export const {
  addControlledFormData,
  addUncontrolledFormData,
  clearLastAdded,
} = formDataSlice.actions;
