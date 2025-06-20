"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import useUser from "@/hooks/UserHook";
import { Medicine } from "@/models/Medicine";
import { MedicineService } from "@/services/MedicinesSevice";
import { useTranslations } from "next-intl";

const MedicineForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Medicine;
  type?: "store" | "update" | "prescription";
}) => {
  const t = useTranslations("common.medicine.create");
  const { role } = useUser();
  const handleSubmit = async (data: any) => {
    const service = MedicineService.make(role);

    if (type == "store") {
      return await service.store(data);
    }

    return await service.update(defaultValues?.id, data);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      defaultValues={defaultValues}
      onSuccess={async () => {
        await Navigate(`/${role}/medicines`);
      }}
    >
      <Grid md={"2"}>
        <FormInput name={"name"} label={t("medicineName")} type="text" />
        <FormInput type={"number"} name={"quantity"} label={t("quantity")} />
        <FormInput type={"text"} name={"barcode"} label={t("barcode_value")} />
      </Grid>
      <FormTextarea
        label={t("description")}
        name={"description"}
        defaultValue={defaultValues ? defaultValues?.description : undefined}
      />
    </Form>
  );
};

export default MedicineForm;
