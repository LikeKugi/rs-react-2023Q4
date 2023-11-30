import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  JSX,
  LegacyRef,
} from 'react';
import styles from './SubmitButton.module.scss';

interface ISubmitButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  buttonRef?: LegacyRef<HTMLButtonElement>;
}

const SubmitButton: FC<ISubmitButtonProps> = ({
  text,
  buttonRef,
  ...props
}): JSX.Element => {
  return (
    <button className={styles.button} ref={buttonRef} {...props}>
      {text || 'Submit'}
    </button>
  );
};
export default SubmitButton;
