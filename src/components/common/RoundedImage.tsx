import React from "react";
import { ClassName } from "postcss-selector-parser";

const RoundedImage = ({
  className,
  src,
  alt = undefined,
}: {
  className?: React.FC<ClassName> | undefined | null;
  src: string;
  alt: string | undefined | null;
}) => {
  return (
    <div className={`rounded-full ${className}`}>
      <img
        className={`size-fit w-10 rounded-full cursor-pointer`}
        src={src}
        alt={alt ?? "no-alt"}
      />
    </div>
  );
};

export default RoundedImage;
