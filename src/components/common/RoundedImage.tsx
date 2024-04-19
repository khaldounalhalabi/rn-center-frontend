import React from "react";

const RoundedImage = ({
  className,
  src,
  alt = undefined,
}: {
  className?: string|undefined|null;
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
