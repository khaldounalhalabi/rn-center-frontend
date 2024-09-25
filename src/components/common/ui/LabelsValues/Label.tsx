import { HTMLProps, ReactNode } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  label?: string | any;
  children?: ReactNode;
  col?: boolean;
  color?: DaisyUiColor | string;
}

export const Label: React.FC<LabelProps> = ({
  label,
  children,
  className,
  color = "black",
  col = false,
  ...props
}) => {
  return (
    <label
      className={
        className ??
        `flex ${col ? "flex-col items-start" : "items-center"} text-start justify-between gap-1 text-${color} font-normal md:font-medium text-sm md:text-xl w-full`
      }
      {...props}
    >
      {label ? <span>{label}:</span> : ""}
      {children}
    </label>
  );
};
