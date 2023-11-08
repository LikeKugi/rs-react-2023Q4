import { JSX, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ModalPage.module.scss';
import { ApiConstants } from '@/api/api.constants';
import { fetchData } from '@/api/api';
import { IBaseDetailsArtworkResponse } from '@/types/api/types';
import { IArtwork } from '@/types/api/IArtwork';
import Loader from '@/components/Loader/Loader';
import ArtworkDetails from '@/components/ArtworkDetails/ArtworkDetails';

const ModalPage = (): JSX.Element => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const [loading, setLoading] = useState(true);
  const [artwork, setArtWork] = useState<IArtwork | null>(null);

  const { artworkId } = useParams();
  const navigate = useNavigate();

  const fetchArtworkById = useCallback((query: string) => {
    const basePath = `${ApiConstants.BASE}${ApiConstants.ARTWORKS}/${query}`;
    (fetchData(basePath) as Promise<IBaseDetailsArtworkResponse>)
      .then((a) => {
        setArtWork(a.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchArtworkById(artworkId as string);
  }, [artworkId, fetchArtworkById]);

  return (
    <>
      <div
        className={styles.modal}
        onClick={() => navigate(previousLocation || '/')}
      >
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {(loading || !artwork) && <Loader />}
          {artwork && <ArtworkDetails content={artwork} />}
          <button
            className={styles.modal__btn}
            onClick={() => navigate(previousLocation || '/')}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
export default ModalPage;
