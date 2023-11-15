import { combineReducers } from '@reduxjs/toolkit';
import { ArtworksReducer } from '@/store/artworksSlice/artworksSlice';
import { api, ApiReducer } from '@/api/api';
import { NetworkReducer } from '@/store/networkSlice/networkSlice';

export const RootReducer = combineReducers({
  artworks: ArtworksReducer,
  network: NetworkReducer,
  [ApiReducer]: api.reducer,
});
