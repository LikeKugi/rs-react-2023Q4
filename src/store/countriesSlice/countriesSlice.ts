import { createSlice } from '@reduxjs/toolkit';
import { ICountry } from '@/constants';

const initialState: ICountry[] = [];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const CountriesReducer = countriesSlice.reducer;
