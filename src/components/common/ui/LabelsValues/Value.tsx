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
  let showedValue = value;
  if (value === undefined || value === null) {
    showedValue = "No data";
  } else if (value === 0 || Number.isNaN(value)) {
    showedValue = 0;
  } else if (value === false) {
    showedValue = "false";
  } else if (value === "") {
    showedValue = "No data";
  } else if (
    typeof value == "string" &&
    (value?.includes("undefined") || value?.includes("null"))
  ) {
    showedValue = "No data";
  } else if (typeof value == "string" && value.includes("NaN")) {
    showedValue = 0;
  }
  return (
    <div
      className={
        className ?? `text-end text-${color} text-xs md:text-base font-normal`
      }
      {...props}
    >
      {!children ? <span>{showedValue}</span> : children}
    </div>
  );
};
