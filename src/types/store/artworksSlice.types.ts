import { IArtwork } from '@/types/api/artworks.types';

export interface IArtworksSlice {
  artworks: IArtwork[];
  isLoading: boolean;
  error: string | null;
}
