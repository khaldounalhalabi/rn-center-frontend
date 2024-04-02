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
        className={`size-fit w-full cursor-pointer`}
        src={src}
        alt={alt ?? "no-alt"}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default RoundedImage;
