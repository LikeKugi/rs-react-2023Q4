import { FC, JSX, useRef } from 'react';
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
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles.skeleton}
      ref={divRef}
      style={{
        backgroundColor: `HSLA(${h},${s}%,${l}%,${percentage.toFixed(1)})`,
      }}
    />
  );
};
export default ImgSkeleton;
