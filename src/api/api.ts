import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiConstants } from '@/api/api.constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiConstants.BASE,
  }),
  endpoints: () => ({}),
});

export const ApiReducer = api.reducerPath;
