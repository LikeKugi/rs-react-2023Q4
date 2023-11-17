import { configureStore } from '@reduxjs/toolkit';
import { api, ApiReducer } from '@/api/api';
import { RootState } from '@/store/store';

export const setupStore = (preloadedState: RootState | object) => {
  return configureStore({
    reducer: {
      [ApiReducer]: api.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(api.middleware),
  });
};
