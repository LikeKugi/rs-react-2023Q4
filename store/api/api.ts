import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiConstants } from '@/store/api/api.constants';
import { HYDRATE } from 'next-redux-wrapper';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiConstants.BASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export const ApiReducer = api.reducerPath;
