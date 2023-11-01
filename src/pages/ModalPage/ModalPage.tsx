import { JSX, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ModalPage.module.scss';

const ModalPage = (): JSX.Element => {
  console.log('modal');
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const modalRef = useRef<HTMLDivElement>(null);
  const { artworkId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const observerRefValue = modalRef.current;
    console.log(observerRefValue);
  }, []);

  return (
    <>
      <div
        ref={modalRef}
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
