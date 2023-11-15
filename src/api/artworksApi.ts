import { api } from '@/api/api';
import {
  IBaseDetailsArtworkRequest,
  IBaseDetailsArtworkResponse,
  IBaseTypeResponse,
} from '@/types/api/types';
import { ApiConstants } from '@/api/api.constants';

export const artworksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtworks: build.query<IBaseTypeResponse, URLSearchParams>({
      query(params) {
        return {
          url: ApiConstants.ARTWORKS,
          method: 'GET',
          params,
        };
      },
    }),
    getArtwork: build.query<
      IBaseDetailsArtworkResponse,
      IBaseDetailsArtworkRequest
    >({
      query(artworkId) {
        return {
          url: `${ApiConstants.ARTWORKS}/${artworkId}`,
          method: 'GET',
        };
      },
    }),
    searchArtwork: build.query<IBaseTypeResponse, URLSearchParams>({
      query(params) {
        return {
          url: `${ApiConstants.ARTWORKS}/${ApiConstants.SEARCH}`,
          method: 'GET',
          params,
        };
      },
    }),
  }),
});

export const {
  useGetArtworkQuery,
  useLazyGetArtworksQuery,
  useLazySearchArtworkQuery,
} = artworksApi;
