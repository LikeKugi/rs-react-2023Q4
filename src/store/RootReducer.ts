import { combineReducers } from '@reduxjs/toolkit';
import { ArtworksReducer } from '@/store/artworksSlice/artworksSlice';
import { api, ApiReducer } from '@/api/api';
import { NetworkReducer } from '@/store/networkSlice/networkSlice';
import { NavigationReducer } from '@/store/navigationSlice/navigationSlice';

export const RootReducer = combineReducers({
  artworks: ArtworksReducer,
  network: NetworkReducer,
  navigation: NavigationReducer,
  [ApiReducer]: api.reducer,
});
