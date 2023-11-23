import { combineReducers } from 'redux';
import { api, ApiReducer } from '@/store/api';

export const RootReducer = combineReducers({
  [ApiReducer]: api.reducer,
});
