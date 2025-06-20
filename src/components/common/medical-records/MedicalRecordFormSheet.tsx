import { getUser } from "@/actions/HelperActions";
import { Revalidate } from "@/actions/Revalidate";
import Form from "@/components/common/ui/Form";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import DocumentPlus from "@/components/icons/DocumentPlus";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import MedicalRecord from "@/models/MedicalRecord";
import MedicalRecordService from "@/services/MedicalRecordService";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

const MedicalRecordFormSheet = ({
  medicalRecord,
  patientId,
  type = "store",
  datatableQueryName,
  success,
}: {
  medicalRecord?: MedicalRecord;
  patientId: number;
  type: "store" | "update";
  datatableQueryName?: string;
  success?: () => void;
}) => {
  const t = useTranslations("medical_records");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: any) => {
    const user = await getUser();
    const service = MedicalRecordService.make(RoleEnum.DOCTOR);
    if (type == "store") {
      data.clinic_id = user?.clinic?.id;
      data.customer_id = patientId;
      return await service.store(data);
    }
    return await service.update(medicalRecord?.id, data);
  };

  const onSuccess = async () => {
    if (datatableQueryName) {
      await queryClient?.invalidateQueries({
        queryKey: [datatableQueryName],
      });
    }

    if (success) {
      await success();
    }

    await Revalidate(`/doctor/patients/${patientId}`);
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type={"button"} size={"icon"}>
          {type == "store" ? <DocumentPlus /> : <Pencil />}
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>
            {type == "store" ? t("create_title") : t("edit_title")}
          </SheetTitle>
        </SheetHeader>
        <Form
          handleSubmit={onSubmit}
          onSuccess={onSuccess}
          defaultValues={medicalRecord}
        >
          <FormTextarea name={"summary"} label={t("summary")} />
          <FormTextarea name={"diagnosis"} label={t("diagnosis")} />
          <FormTextarea name={"treatment"} label={t("treatment")} />
          <FormTextarea name={"allergies"} label={t("allergies")} />
          <FormTextarea name={"notes"} label={t("notes")} />
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default MedicalRecordFormSheet;
