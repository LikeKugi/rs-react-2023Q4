import { combineReducers } from '@reduxjs/toolkit';
import { CountriesReducer } from '@/store/countriesSlice/countriesSlice';
import { formDataSliceReducer } from '@/store/formDataSlice/formDataSlice';

export const RootReducer = combineReducers({
  countries: CountriesReducer,
  formData: formDataSliceReducer,
});
