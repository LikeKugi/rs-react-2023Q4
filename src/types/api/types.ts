import { ArtworksTypes } from '@/types/api/artworks.types';

export interface IBaseConfigResponse {
  iiif_url: string;
  website_url: string;
}
export interface IBaseInfoResponse {
  license_links: string;
  license_text: string;
  version: string;
}
export interface IBasePaginationResponse {
  current_page: number;
  limit: number;
  next_url?: string;
  prev_url?: string;
  offset: number;
  total: number;
  total_pages: number;
}
export interface IBaseTypeResponse {
  config: IBaseConfigResponse;
  data: ArtworksTypes[];
  info: IBaseInfoResponse;
  pagination: IBasePaginationResponse;
}

export interface IBaseDetailsArtworkResponse {
  config: IBaseConfigResponse;
  data: ArtworksTypes;
  info: IBaseInfoResponse;
}

export interface IBaseColor {
  h: number;
  l: number;
  s: number;
  percentage: number;
  population: number;
}

export interface IBaseDimension {
  clarification: string | null;
  depth_cm: number;
  depth_in: number;
  diameter_cm: number;
  diameter_in: number;
  height_cm: number;
  height_in: number;
  width_cm: number;
  width_in: number;
}

export interface IBaseSuggestedAutocomplete {
  contexts: {
    groupings: string[];
  };
  input: string[];
  weight?: number;
}

export type IFetchQueryParams = Record<string, string>;
