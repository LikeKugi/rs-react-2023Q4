import { IArtworksSlice } from '@/types/store/artworksSlice.types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const initialState: IArtworksSlice = {
  artworks: [],
  error: null,
  isLoading: false,
};

export const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const selectArtworks = (state: RootState) => state.artworks.artworks;
export const selectArtworksError = (state: RootState) => state.artworks.error;
export const selectArtworksIsLoading = (state: RootState) =>
  state.artworks.isLoading;

export const ArtworksReducer = artworksSlice.reducer;
