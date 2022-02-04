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
    <div className={`${className} group mb-4`}>
      <label
        className={`${labelClassName} block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-700 transition  ${
          error ? 'text-red-600' : ''
        }`}
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <input
        className={`${inputClassName}  focus:ring-blue-700 focus:border-blue-700 block  pl-3 pr-12 sm:text-sm border-gray-300 rounded  transition ${
          error ? 'text-red-600 border-red-600' : ''
        }`}
        id={label.toLowerCase()}
        ref={ref}
        {...rest}
      />
      <p className={`${errorClassNames} text-red-600 h-4`}>{error}</p>
    </div>
  );
});

export default memo(Input);
