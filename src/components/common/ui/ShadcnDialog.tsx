import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const ShadcnDialog = ({
  trigger,
  title,
  children = undefined,
  footer = undefined,
  sm = true,
}: {
  trigger: ReactNode;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  sm?: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`max-h-[80vh] ${sm ? "md:max-w-[60vh]" : "md:max-w-[100vh]"}`}
      >
        <DialogHeader>
          {!{ title } ? (
            <VisuallyHidden asChild>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
          ) : (
            <DialogTitle>{title}</DialogTitle>
          )}{" "}
        </DialogHeader>
        {children}
        {footer && (
          <DialogFooter className={"w-full"}>
            <DialogClose className="flex w-full items-center justify-between">
              {footer}
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShadcnDialog;
