import { api } from '@/api/api';
import {
  IBaseDetailsArtworkRequest,
  IBaseDetailsArtworkResponse,
  IBaseTypeResponse,
} from '@/types';
import { ApiConstants } from '@/api/api.constants';

export const artworksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtworks: build.query<IBaseTypeResponse, string>({
      query(params) {
        return {
          url: `${ApiConstants.ARTWORKS}?${params}`,
          method: 'GET',
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
    searchArtwork: build.query<IBaseTypeResponse, string>({
      query(params) {
        return {
          url: `${ApiConstants.ARTWORKS}/${ApiConstants.SEARCH}?${params}`,
          method: 'GET',
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
