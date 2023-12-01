import { createSlice } from '@reduxjs/toolkit';
import { ICountry } from '@/constants';
import { RootState } from '@/store';

const initialState: ICountry[] = [];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectAllCountries = (state: RootState) => state.countries;

export const CountriesReducer = countriesSlice.reducer;
