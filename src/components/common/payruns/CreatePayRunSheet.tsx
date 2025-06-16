import PayrunForm from "@/components/common/payruns/PayrunForm";
import DocumentPlus from "@/components/icons/DocumentPlus";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { useTranslations } from "next-intl";
import { useState } from "react";

const CreatePayRunSheet = ({
  revalidate,
  role,
}: {
  revalidate?: () => void;
  role: RoleEnum;
}) => {
  const t = useTranslations("payruns");
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type={"button"} size={"icon"}>
          <DocumentPlus />
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader className={"my-5 items-start text-start"}>
          <SheetTitle>{t("create_title")}</SheetTitle>
        </SheetHeader>
        <PayrunForm
          revalidate={() => {
            if (revalidate) {
              revalidate();
            }
            setOpen(false);
          }}
          role={role}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CreatePayRunSheet;
