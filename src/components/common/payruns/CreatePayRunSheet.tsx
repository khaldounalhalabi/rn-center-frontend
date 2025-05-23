import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Button } from "@/components/ui/shadcn/button";
import DocumentPlus from "@/components/icons/DocumentPlus";
import PayrunForm from "@/components/common/payruns/PayrunForm";

const CreatePayRunSheet = ({ revalidate }: { revalidate?: () => void }) => {
  const locale = useLocale();
  const t = useTranslations("payruns");
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type={"button"} size={"icon"}>
          <DocumentPlus />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale == "ar" ? "left" : "right"}
        className={"w-[60vh] md:w-[80vh]"}
      >
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
        />
      </SheetContent>
    </Sheet>
  );
};

export default CreatePayRunSheet;