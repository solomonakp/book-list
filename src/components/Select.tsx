import { forwardRef, memo } from 'react';

export interface Option {
  label: React.ReactNode;
  value: string | number | string[];
}

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };

interface SelectProps extends Props {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassNames?: string;
  error: string | undefined;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    label,
    error,
    className,
    inputClassName,
    labelClassName,
    errorClassNames,
    options,
    ...rest
  } = props;

  return (
    <div className={`${className} group mb-2`}>
      <label
        className={`${labelClassName} label ${error ? 'text-red-600' : ''}`}
        htmlFor={label}
      >
        {label}
      </label>
      <select
        ref={ref}
        {...rest}
        className={`form-select select ${
          error ? 'text-red-600 border-red-600' : ''
        }`}
      >
        {options.map(({ label, value }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </select>
      <p className={`${errorClassNames} error`}>{error}</p>
    </div>
  );
});

export default memo(Select);
