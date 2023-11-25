import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/api/api';
import { RootState } from '@/store/store';
import { RootReducer } from '@/store/RootReducer';

export const setupStore = (preloadedState: RootState | object) => {
  return configureStore({
    reducer: RootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(api.middleware),
  });
};
