"use client";

import { useState } from "react";
import RoundedImage from "@/components/common/ui/images/RoundedImage";
import Image, { ImageProps } from "next/image";

const ImagePreview = ({
                        src,
                        className,
                        ...props
                      }: Omit<ImageProps, "onClick">) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Rounded Image with onClick */}
      <RoundedImage
        src={src ?? ""}
        onClick={(event) => {
          event.stopPropagation();
          openModal();
        }}
        className={`${className ?? ""} cursor-pointer`}
        {...props}
      />

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/25"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="max-w-lg transform overflow-hidden bg-transparent p-6 text-center transition-all"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <Image
              src={`${src}`}
              alt="Image Preview"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
