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
        `flex font-bold ${col ? "flex-col items-start gap-5" : "items-center gap-2 "} justify-start text-start w-full text-sm md:text-sm`
      }
      {...props}
    >
      {label ? <span>{label}:</span> : ""}
      {children}
    </label>
  );
};
