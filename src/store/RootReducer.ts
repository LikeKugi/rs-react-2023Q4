import { combineReducers } from '@reduxjs/toolkit';
import { CountriesReducer } from '@/store/countriesSlice/countriesSlice';

export const RootReducer = combineReducers({
  countries: CountriesReducer,
});
