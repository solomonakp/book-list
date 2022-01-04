import { forwardRef } from 'react';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassNames?: string;
  error: string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    className,
    inputClassName,
    labelClassName,
    errorClassNames,
    ...rest
  } = props;

  console.log(props.value);

  return (
    <div className={`${className}`}>
      <label className={`${labelClassName}`} htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        className={inputClassName}
        id={label.toLowerCase()}
        ref={ref}
        {...rest}
      />
      <p className={`${errorClassNames}`}>{error}</p>
    </div>
  );
});

export default Input;
