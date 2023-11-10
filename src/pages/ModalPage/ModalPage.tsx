import { JSX } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ModalPage.module.scss';

const ModalPage = (): JSX.Element => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.modal}
        onClick={() => navigate(previousLocation || '/')}
        role="wrapper"
      >
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <Outlet />
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
