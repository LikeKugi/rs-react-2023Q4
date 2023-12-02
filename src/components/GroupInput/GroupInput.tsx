import { FC, JSX, PropsWithChildren, ReactNode } from 'react';
import styles from './GroupInput.module.scss';

interface IGroupInputProps {
  groupLabel: string | ReactNode;
  isError?: boolean;
  errorMessage?: string;
}

const makeLabelClassName = (isError?: boolean) => {
  if (isError) {
    return `${styles.groupinput__label} ${styles['groupinput__label--error']}`;
  }
  return styles.groupinput__label;
};

const GroupInput: FC<PropsWithChildren<IGroupInputProps>> = ({
  groupLabel,
  isError,
  errorMessage,
  children,
}): JSX.Element => {
  return (
    <div className={styles.groupinput}>
      <div className={makeLabelClassName(isError)}>{groupLabel}</div>
      <div className={styles.groupinput__box}>{children}</div>
      <div className={styles.groupinput__box}>
        {isError && (
          <p className={styles.groupinput__error}>
            {errorMessage || 'Unknown error'}
          </p>
        )}
      </div>
    </div>
  );
};
export default GroupInput;
