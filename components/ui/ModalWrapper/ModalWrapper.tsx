import { FC, JSX, PropsWithChildren } from 'react';
import styles from './ModalWrapper.module.scss';
import { useRouter } from 'next/router';

const ModalWrapper: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const router = useRouter();

  const handleNavigate = () => {
    const queryParams = router.query;
    delete queryParams.details;

    router.push({
      pathname: router.pathname,
      query: {
        ...queryParams,
      },
    });
  };

  return (
    <div className={styles.modal} onClick={handleNavigate} role="wrapper">
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.modal__btn} onClick={handleNavigate}>
          Close
        </button>
      </div>
    </div>
  );
};
export default ModalWrapper;
