import { JSX } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ModalPage.module.scss';

const ModalPage = (): JSX.Element => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const { artworkId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.modal}
        onClick={() => navigate(previousLocation || '/')}
      />
      <div className={styles.content}>
        <h1>{artworkId}</h1>
      </div>
    </>
  );
};
export default ModalPage;
