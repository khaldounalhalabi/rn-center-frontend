import React, { HTMLProps } from "react";

const RoundedImage: React.FC<HTMLProps<HTMLImageElement>> = ({
  className,
  src,
  alt = undefined,
  ...props
}) => {
  return (
    <div className={`rounded-full h-full ${className}`}>
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
        {...props}
      />
    </div>
  );
};

export default RoundedImage;
