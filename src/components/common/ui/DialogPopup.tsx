"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";

const DialogPopup = ({
  open = false,
  children = undefined,
  onClose = undefined,
}: {
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}) => {
  let [isOpen, setIsOpen] = useState(open);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-[1000]"
        onClose={() => {
          closeModal();
          if (onClose) {
            onClose();
          }
        }}
      >
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-[100vh] transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export default DialogPopup;
