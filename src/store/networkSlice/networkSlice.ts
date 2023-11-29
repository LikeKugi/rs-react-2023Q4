import { INetworkSlice } from '@/store/networkSlice/networkSlice.types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { artworksApi } from '@/api/artworksApi';

const initialState: INetworkSlice = {
  errorArtworks: null,
  errorDetails: null,
  isLoadingArtworks: false,
  isLoadingDetails: false,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      artworksApi.endpoints.getArtworks.matchFulfilled,
      (state) => {
        state.isLoadingArtworks = false;
        state.errorArtworks = null;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.getArtworks.matchPending,
      (state) => {
        state.isLoadingArtworks = true;
        state.errorArtworks = null;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.getArtworks.matchRejected,
      (state, { payload }) => {
        state.isLoadingArtworks = false;
        state.errorArtworks = (payload?.data as string) || 'Unknown error';
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.searchArtwork.matchFulfilled,
      (state) => {
        state.isLoadingArtworks = false;
        state.errorArtworks = null;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.searchArtwork.matchPending,
      (state) => {
        state.isLoadingArtworks = true;
        state.errorArtworks = null;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.searchArtwork.matchRejected,
      (state, { payload }) => {
        state.isLoadingArtworks = false;
        state.errorArtworks = (payload?.data as string) || 'Unknown error';
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.getArtwork.matchFulfilled,
      (state) => {
        state.isLoadingArtworks = false;
        state.errorArtworks = null;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.getArtwork.matchPending,
      (state) => {
        state.isLoadingArtworks = true;
        state.errorArtworks = null;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.getArtwork.matchRejected,
      (state, { payload }) => {
        state.isLoadingArtworks = false;
        state.errorArtworks = (payload?.data as string) || 'Unknown error';
      },
    );
  },
});

export const selectErrorArtworks = (state: RootState) =>
  state.network.errorArtworks;
export const selectErrorDetails = (state: RootState) =>
  state.network.errorDetails;
export const selectIsLoadingArtworks = (state: RootState) =>
  state.network.isLoadingArtworks;
export const selectIsLoadingDetails = (state: RootState) =>
  state.network.isLoadingDetails;
export const NetworkReducer = networkSlice.reducer;
