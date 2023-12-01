import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  JSX,
  LegacyRef,
  ReactNode,
  useId,
} from 'react';
import { ICountry } from '@/constants';
import styles from './Autocomplete.module.scss';

const makeInputClassName = (isError: boolean, defaultClass?: string) => {
  let initial = styles.autocomplete__input;
  if (isError) {
    initial = `${initial} ${styles['autocomplete__input--error']}`;
  }
  if (defaultClass) {
    initial = `${initial} ${defaultClass}`;
  }
  return initial;
};

interface IAutocompleteProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  inputRef?: LegacyRef<HTMLInputElement>;
  labelText: string | ReactNode;
  isError?: boolean;
  errorMessage?: string;
  variants: Array<ICountry>;
}
const Autocomplete: FC<IAutocompleteProps> = ({
  inputRef,
  labelText,
  isError,
  errorMessage,
  variants,
  className,
  ...props
}): JSX.Element => {
  const inputId = useId();

  return (
    <div className={styles.autocomplete}>
      <div className={styles.autocomplete__box}>
        <label className={styles.autocomplete__label} htmlFor={inputId}>
          {labelText}
        </label>
      </div>
      <input
        className={makeInputClassName(isError || false, className)}
        ref={inputRef}
        id={inputId}
        type="text"
        {...props}
        list={`data${inputId}`}
      />
      <datalist id={`data${inputId}`}>
        {variants.map((variant) => (
          <option key={variant.code} value={variant.name}>
            {variant.name}
          </option>
        ))}
      </datalist>
      <div className={styles.autocomplete__box}>
        {isError && (
          <p className={styles.autocomplete__error}>
            {errorMessage || 'Unknown error'}
          </p>
        )}
      </div>
    </div>
  );
};
export default Autocomplete;
