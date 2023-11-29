import { INavigationSlice } from '@/store/navigationSlice/navigationSlice.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { artworksApi } from '@/api/artworksApi';
import { RootState } from '@/store/store';

const initialState: INavigationSlice = {
  query: '',
  page: 0,
  limit: 8,
  totalPages: 0,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      if (!action.payload) return state;
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      if (!action.payload || action.payload < 1) return state;
      if (action.payload > state.totalPages) {
        state.page = state.totalPages;
      } else {
        state.page = action.payload;
      }
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      artworksApi.endpoints.getArtworks.matchFulfilled,
      (state, { payload }) => {
        state.page = payload.pagination.current_page;
        state.totalPages = payload.pagination.total_pages;
      },
    );
    builder.addMatcher(
      artworksApi.endpoints.searchArtwork.matchFulfilled,
      (state, { payload }) => {
        state.page = payload.pagination.current_page;
        state.totalPages = payload.pagination.total_pages;
      },
    );
  },
});

export const selectNavigationQuery = (state: RootState) =>
  state.navigation.query;
export const selectNavigationPage = (state: RootState) => state.navigation.page;
export const selectNavigationTotalPages = (state: RootState) =>
  state.navigation.totalPages;
export const selectNavigationLimit = (state: RootState) =>
  state.navigation.limit;
export const { setLimit, setPage, setQuery } = navigationSlice.actions;
export const NavigationReducer = navigationSlice.reducer;
