import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from '@/store/RootReducer';
import { api } from '@/api/api';

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
