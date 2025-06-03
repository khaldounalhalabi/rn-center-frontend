import React from "react";
import MedicalRecord from "@/models/MedicalRecord";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Button } from "@/components/ui/shadcn/button";
import { EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import Grid from "@/components/common/ui/Grid";

const MedicalRecordShowSheet =  ({medicalRecord}:{medicalRecord?:MedicalRecord}) => {
  const t =  useTranslations("medical_records");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type={"button"} size={"icon"} variant={"outline"}>
          <EyeIcon/>
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("show_title")}</SheetTitle>
        </SheetHeader>
        <Grid md={1}>
          <LabelValue label={t("summary")} value={medicalRecord?.summary} col/>
          <LabelValue label={t("diagnosis")} value={medicalRecord?.diagnosis} col/>
          <LabelValue label={t("treatment")} value={medicalRecord?.treatment} col/>
          <LabelValue label={t("allergies")} value={medicalRecord?.allergies} col/>
          <LabelValue label={t("notes")} value={medicalRecord?.notes} col/>
        </Grid>
      </SheetContent>
    </Sheet>
  );
};

export default MedicalRecordShowSheet;