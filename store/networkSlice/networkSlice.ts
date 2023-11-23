import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const initialState = {
  isLoading: false,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const NetworkReducer = networkSlice.reducer;

export const selectIsLoading = (state: RootState) => state.network.isLoading;
export const { startLoading, endLoading } = networkSlice.actions;
