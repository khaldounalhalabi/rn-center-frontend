import React, { HTMLProps } from "react";

interface GridProps extends HTMLProps<HTMLDivElement> {
  md?: string | number;
  sm?: string | number;
  lg?: string | number;
  className?: string;
  gap?: string | number;
  children?: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({
  md = 2,
  sm = 1,
  lg = 2,
  className,
  gap = 2,
  children,
  ...props
}) => {
  const small: string = `grid-cols-[auto_${sm}fr]`;
  const gp: string = `gap-${gap}`;
  const medium: string = `md:grid-cols-[auto_${md}fr]`;
  const large: string = `lg:grid-cols-${lg}`;

  return (
    <div
      className={`grid ${gp} ${small} ${medium} ${large} w-full ${className ?? ""} my-3`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
