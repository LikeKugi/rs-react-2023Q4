import { combineReducers } from '@reduxjs/toolkit';
import { ArtworksReducer } from '@/store/artworksSlice/artworksSlice';
import { api, ApiReducer } from '@/api/api';

export const RootReducer = combineReducers({
  artworks: ArtworksReducer,
  [ApiReducer]: api.reducer,
});
