import React from 'react';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button className={`${className} btn`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
