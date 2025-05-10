import { HTMLProps, ReactNode } from "react";
import { DaisyUiColor } from "@/types/DaisyUiColor";

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
        `flex ${col ? "flex-col items-start" : "items-center"} justify-start gap-1 text-start text-${color} w-full text-sm md:text-lg`
      }
      {...props}
    >
      {label ? <span>{label}:</span> : ""}
      {children}
    </label>
  );
};
