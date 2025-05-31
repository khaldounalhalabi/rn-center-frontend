"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const DialogPopup = ({
  open = false,
  children = undefined,
  onClose = undefined,
  title = undefined,
  description = undefined,
}: {
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  title?: string;
  description?: string;
}) => {
  let [isOpen, setIsOpen] = useState(open);
  const onOpenChange = (state: boolean) => {
    if (!state && onClose) {
      onClose();
    }
    setIsOpen(state);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  console.log(isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          {!{ title } ? (
            <VisuallyHidden asChild>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
          ) : (
            <DialogTitle>{title}</DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className={"w-full"}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPopup;
