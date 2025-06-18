import { DaisyUiColor } from "@/types/DaisyUiColor";
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
      className={`flex font-bold ${col ? "flex-col items-start gap-5" : "items-center gap-2 "} justify-start text-start w-full text-sm md:text-sm ${className}`}
      {...props}
    >
      {label ? <span>{label}:</span> : ""}
      {children}
    </label>
  );
};
