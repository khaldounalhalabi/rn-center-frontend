import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

const Alert = ({
  trigger,
  title = undefined,
  description = undefined,
  confirmText = undefined,
  onConfirm = undefined,
  denyText = undefined,
  onDeny = undefined,
}: {
  trigger: ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  denyText?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
}) => {
  const t = useTranslations("components");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className={"sm:text-start text-start"}>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription></AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter
          className={
            "sm:flex flex sm:flex-row flex-row sm:items-center items-center sm:justify-end justify-end gap-2"
          }
        >
          <AlertDialogCancel
            onClick={() => {
              if (onDeny) {
                onDeny();
              }
            }}
          >
            {denyText ?? t("no")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
            }}
          >
            {confirmText ?? t("yes")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default Alert;
