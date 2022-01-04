import { forwardRef } from 'react';

interface Option {
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
    <div className={`${className}`}>
      <label className={`${labelClassName}`} htmlFor={label}>
        {label}
      </label>
      <select ref={ref} {...rest}>
        {options.map(({ label, value }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </select>
      <p className={`${errorClassNames}`}>{error}</p>
    </div>
  );
});

export default Select;
