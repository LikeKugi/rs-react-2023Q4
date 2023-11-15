import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from '@/store/RootReducer';
import { api } from '@/api/api';
import { getDataFromStorage } from '@/services/localStorageServices';

const query = (getDataFromStorage({ query: '' }) as { query: string }).query;

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  preloadedState: {
    navigation: {
      limit: 8,
      query,
      page: 0,
      totalPages: 0,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
