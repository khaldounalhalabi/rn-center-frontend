"use client"
import { Revalidate } from "@/actions/Revalidate";
import UpdatePatientForm from "@/components/doctor/patients/UpdatePatientForm";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Customer } from "@/models/Customer";
import { useTranslations } from "next-intl";
import { useState } from "react";

const UpdatePatientSheet = ({
  patient,
  revalidate,
  triggerText,
}: {
  patient?: Customer;
  revalidate?: () => void;
  triggerText?:string
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common.patient");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} size={triggerText ? "default" : "icon"} type={"button"}>
          {triggerText ?? <Pencil />}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>{t("create.editPatient")}</SheetTitle>
        <UpdatePatientForm
          patient={patient}
          onSuccess={() => {
            if (revalidate) {
              revalidate();
            }
            setOpen(false);
            Revalidate(`/doctor/patients/${patient?.id}`);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default UpdatePatientSheet;
