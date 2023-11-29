import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './RootReducer';
import { COUNTRIES } from '@/constants';

export const store = configureStore({
  reducer: RootReducer,
  preloadedState: {
    countries: COUNTRIES,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
