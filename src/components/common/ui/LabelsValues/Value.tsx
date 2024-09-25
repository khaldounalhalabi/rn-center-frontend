import React, { HTMLProps, ReactNode } from "react";

interface ValueProps extends HTMLProps<HTMLDivElement> {
  value?: any;
  color?: DaisyUiColor | string;
  children?: ReactNode;
}

export const Value: React.FC<ValueProps> = ({
  value,
  color = "primary-content",
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={
        className ?? `text-start text-${color} text-md md:text-xl font-normal`
      }
      {...props}
    >
      {value ? <span>{value}</span> : ""}
      {children}
      {!value && !children && "No Data"}
    </div>
  );
};
