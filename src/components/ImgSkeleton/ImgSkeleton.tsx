import { FC, JSX } from 'react';
import styles from './ImgSkeleton.module.scss';

interface IImgSkeletonProps {
  h: number;
  l: number;
  s: number;
  percentage: number;
}

const ImgSkeleton: FC<IImgSkeletonProps> = ({
  h,
  s,
  l,
  percentage,
}): JSX.Element => {
  return (
    <div
      className={styles.skeleton}
      style={{
        backgroundColor: `HSLA(${h},${s}%,${l}%,${percentage.toFixed(1)})`,
      }}
    />
  );
};
export default ImgSkeleton;
