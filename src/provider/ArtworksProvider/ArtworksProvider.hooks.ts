import { useContext } from 'react';
import { ArtworksProviderContext } from '@/provider/ArtworksProvider/ArtworksProvider.context';

export const useArtworksProvider = () => useContext(ArtworksProviderContext);
