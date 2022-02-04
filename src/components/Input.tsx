import { forwardRef, memo } from 'react';

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

  return (
    <div className={`${className} group mb-2`}>
      <label
        className={`${labelClassName} label  ${error ? 'text-red-600' : ''}`}
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <input
        className={`${inputClassName} input ${
          error ? 'text-red-600 border-red-600' : ''
        }`}
        id={label.toLowerCase()}
        ref={ref}
        {...rest}
      />
      <p className={`${errorClassNames} error`}>{error}</p>
    </div>
  );
});

export default memo(Input);
