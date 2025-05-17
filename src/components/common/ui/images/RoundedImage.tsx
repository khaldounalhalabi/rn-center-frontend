import React from "react";
import Image, { ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Props extends Omit<ImageProps, "src" | "width" | "height"> {
  src: string | undefined | StaticImport;
}

const RoundedImage: React.FC<Props> = ({
  className,
  src,
  alt = undefined,
  ...props
}) => {
  return (
    <div className={`h-full rounded-full ${className}`}>
      <Image
        className={`size-fit w-full cursor-pointer`}
        src={src ?? ""}
        alt={alt ?? "no-alt"}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "100%",
        }}
        width={"150"}
        height={"150"}
        {...props}
      />
    </div>
  );
};

export default RoundedImage;
