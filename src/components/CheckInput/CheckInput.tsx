import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  JSX,
  LegacyRef,
  useId,
} from 'react';
import styles from './CheckInput.module.scss';

interface ICheckInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  type: 'checkbox' | 'radio';
  labelText: string;
  inputRef?: LegacyRef<HTMLInputElement>;
}

const makeInputClassName = (defaultClass?: string) => {
  if (defaultClass) {
    return `${styles.checkinput__input} ${defaultClass}`;
  }
  return styles.checkinput__input;
};

const CheckInput: FC<ICheckInputProps> = ({
  name,
  type,
  labelText,
  className,
  inputRef,
  ...props
}): JSX.Element => {
  const inputId = useId();
  return (
    <div className={styles.checkinput}>
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={inputId}
        className={makeInputClassName(className)}
        {...props}
      />
      <label htmlFor={inputId}>{labelText}</label>
    </div>
  );
};
export default CheckInput;
