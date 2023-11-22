import { api } from '@/store/api/api';
import {
  IBaseDetailsArtworkRequest,
  IBaseDetailsArtworkResponse,
  IBaseGetArtworksRequest,
  IBaseTypeResponse,
} from '@/types';
import { ApiConstants } from '@/store/api/api.constants';

export const artworksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtworks: build.query<IBaseTypeResponse, IBaseGetArtworksRequest>({
      query(params) {
        console.log(params);

        const queryPath = params.q
          ? `${ApiConstants.ARTWORKS}/${ApiConstants.SEARCH}?${params.q}&${params.params}`
          : `${ApiConstants.ARTWORKS}?${params.params}`;

        console.log(queryPath);

        return {
          url: queryPath,
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
  useGetArtworksQuery,
  useLazyGetArtworksQuery,
  useLazySearchArtworkQuery,
  util: { getRunningQueriesThunk },
} = artworksApi;

export const { getArtworks, searchArtwork, getArtwork } = artworksApi.endpoints;
