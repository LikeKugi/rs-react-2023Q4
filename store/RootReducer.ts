import { combineReducers } from 'redux';
import { api, ApiReducer } from '@/store/api';
import { NetworkReducer } from '@/store/networkSlice/networkSlice';

export const RootReducer = combineReducers({
  [ApiReducer]: api.reducer,
  network: NetworkReducer,
});
