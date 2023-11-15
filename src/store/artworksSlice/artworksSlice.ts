import { IArtworksSlice } from '@/store/artworksSlice/artworksSlice.types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { artworksApi } from '@/api/artworksApi';

const initialState: IArtworksSlice = {
  artworks: [],
};

export const artworksSlice = createSlice({
  initialState,
  name: 'artworks',
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      artworksApi.endpoints.getArtworks.matchFulfilled,
      (state, { payload }) => {
        state.artworks = payload.data;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.searchArtwork.matchFulfilled,
      (state, { payload }) => {
        state.artworks = payload.data;
      },
    );
  },
});

export const selectArtworks = (state: RootState) => state.artworks.artworks;

export const ArtworksReducer = artworksSlice.reducer;
