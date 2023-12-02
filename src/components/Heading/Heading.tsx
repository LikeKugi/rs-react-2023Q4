import { FC, JSX } from 'react';
import styles from './Heading.module.scss';

interface IHeadingProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
}

const Heading: FC<IHeadingProps> = ({ type, text }): JSX.Element => {
  const Tag = type ? type : 'h1';
  return <Tag className={styles.heading}>{text}</Tag>;
};
export default Heading;
