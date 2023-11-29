import { FC, JSX, PropsWithChildren, useState } from 'react';
import { IArtwork } from '@/types';
import { ArtworksProviderContext } from '@/provider/ArtworksProvider/ArtworksProvider.context';

const ArtworksProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <ArtworksProviderContext.Provider
      value={{ artworks, setArtworks, totalPages, setTotalPages }}
    >
      {children}
    </ArtworksProviderContext.Provider>
  );
};
export default ArtworksProvider;
