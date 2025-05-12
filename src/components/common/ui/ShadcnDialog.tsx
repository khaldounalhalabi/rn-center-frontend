import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

const ShadcnDialog = ({
  trigger,
  title,
  children = undefined,
  footer = undefined,
}: {
  trigger: ReactNode;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={"max-h-[80vh] md:max-w-[60vh]"}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>
        {children}
        {footer && (
          <DialogFooter className={"w-full"}>
            <DialogClose className="flex w-full items-center justify-between">{footer}</DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShadcnDialog;
