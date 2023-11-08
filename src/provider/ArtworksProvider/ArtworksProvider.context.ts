import { ArtworksTypes } from '@/types/api/artworks.types';
import { createContext } from 'react';

interface IArtworksProviderContext {
  artworks: ArtworksTypes[];
  setArtworks: (arg: ArtworksTypes[]) => void;
  totalPages: number;
  setTotalPages: (arg: number) => void;
}

export const ArtworksProviderContext = createContext<IArtworksProviderContext>({
  artworks: [],
  setArtworks: (arg) => arg,
  totalPages: 0,
  setTotalPages: (arg) => arg,
});
