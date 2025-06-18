"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import Gallery from "@/components/common/ui/images/Gallery";
import ImageUploader from "@/components/common/ui/images/ImageUploader";
import FormInput from "@/components/common/ui/inputs/FormInput";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import useUser from "@/hooks/UserHook";
import { Speciality } from "@/models/Speciality";
import { SpecialityService } from "@/services/SpecialityService";
import { useTranslations } from "next-intl";

const SpecialityForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Speciality;
  type?: "store" | "update";
}) => {
  const { image, ...values } = defaultValues ?? { image: [] };
  const { role } = useUser();

  const t = useTranslations("admin.speciality.create-edit");
  const handleSubmit = async (data: any) => {
    if (type == "update" && defaultValues?.id) {
      return await SpecialityService.make(role).update(defaultValues?.id, data);
    } else {
      return await SpecialityService.make(role).store(data);
    }
  };
  const onSuccess = async () => {
    await Navigate(`/${role}/speciality`);
  };
  const array = defaultValues?.tags?.split(",") ?? [];
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={values}
    >
      <Grid>
        <FormInput
          required={true}
          type={"text"}
          label={t("specialityName")}
          name={"name"}
        />
      </Grid>

      <FormTextarea
        name={"description"}
        label={`${t("description")}`}
        defaultValue={array ?? []}
      />
      {type == "update" && defaultValues?.image?.length != 0 && (
        <Gallery media={defaultValues?.image} />
      )}
      <ImageUploader name={"image"} />
    </Form>
  );
};

export default SpecialityForm;
