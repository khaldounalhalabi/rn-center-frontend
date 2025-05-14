"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import RoundedImage from "@/components/common/ui/images/RoundedImage";
import Image, { ImageProps } from "next/image";

const ImagePreview = ({
  src,
  className,
  ...props
}: Omit<ImageProps, "onClick">) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <RoundedImage
        src={src ?? ""}
        onClick={(event) => {
          event.stopPropagation();
          openModal();
        }}
        className={className ?? "" + "cursor-pointer"}
        {...props}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 w-full overflow-y-auto">
            <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-lg transform overflow-hidden bg-transparent p-6 text-left align-middle transition-all">
                  <Image src={`${src}`} alt={"..."} width={"300"} height={"300"} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ImagePreview;
