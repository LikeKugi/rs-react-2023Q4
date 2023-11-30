import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  JSX,
  LegacyRef,
  ReactNode,
  useId,
} from 'react';
import styles from './TextInput.module.scss';

interface ITextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  inputRef?: LegacyRef<HTMLInputElement>;
  labelText: string | ReactNode;
  isError?: boolean;
  errorMessage?: string;
}

const makeInputClassName = (isError: boolean, defaultClass?: string) => {
  let initial = styles.textinput__input;
  if (isError) {
    initial = `${initial} ${styles['textinput__input--error']}`;
  }
  if (defaultClass) {
    initial = `${initial} ${defaultClass}`;
  }
  return initial;
};

const TextInput: FC<ITextInputProps> = ({
  inputRef,
  labelText,
  isError,
  errorMessage,
  className,
  ...props
}): JSX.Element => {
  const inputId = useId();
  return (
    <div className={styles.textinput}>
      <div className={styles.textinput__box}>
        <label className={styles.textinput__label} htmlFor={inputId}>
          {labelText}
        </label>
      </div>
      <input
        className={makeInputClassName(isError || false, className)}
        ref={inputRef}
        id={inputId}
        type="text"
        {...props}
      />
      <div className={styles.textinput__box}>
        <p className={styles.textinput__error}>
          {errorMessage || isError ? 'Unknown error' : ''}
        </p>
      </div>
    </div>
  );
};
export default TextInput;
