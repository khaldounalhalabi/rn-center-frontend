"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import Gallery from "@/components/common/ui/images/Gallery";
import ImageUploader from "@/components/common/ui/images/ImageUploader";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import useUser from "@/hooks/UserHook";
import { ApiResponse } from "@/http/Response";
import { Clinic } from "@/models/Clinic";
import { Service } from "@/models/Service";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ClinicsService } from "@/services/ClinicsService";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { ServiceService } from "@/services/ServiceService";
import { useTranslations } from "next-intl";

const ServiceForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Service;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.service.create-edit");
  const { role } = useUser();
  const handleSubmit = async (data: any) => {
    if (type === "update") {
      return ServiceService.make(role).update(defaultValues?.id, data);
    } else {
      return await ServiceService.make(role).store(data);
    }
  };
  const onSuccess = async () => {
    await Navigate(`/${role}/service`);
  };
  const { icon, ...rest } = defaultValues ?? { icon: "" };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={rest}
    >
      <Grid md={"2"}>
        <FormInput
          required={true}
          type={"text"}
          label={t("serviceName")}
          name={"name"}
        />
        <ApiSelect
          required={true}
          name={"clinic_id"}
          api={async (page, search) =>
            await ClinicsService.make(role).indexWithPagination(page, search)
          }
          getOptionLabel={(option: Clinic) => option.user?.full_name}
          label={t("clinicName")}
          optionValue={"id"}
          defaultValues={
            defaultValues?.clinic?.id ? [defaultValues?.clinic] : []
          }
        />

        <ApiSelect
          required={true}
          api={async (page, search): Promise<ApiResponse<ServiceCategory[]>> =>
            await ServiceCategoryService.make(role).indexWithPagination(
              page,
              search,
            )
          }
          optionValue={"id"}
          optionLabel={"name"}
          name={"service_category_id"}
          label={t("category")}
          defaultValues={
            defaultValues?.service_category?.id
              ? [defaultValues?.service_category]
              : []
          }
        />
        <FormInput
          required={true}
          name={"approximate_duration"}
          type={"number"}
          unit={"min"}
          label={t("approximateDuration")}
        />
        <FormInput
          required={true}
          name={"price"}
          type={"number"}
          label={t("price")}
        />
      </Grid>
      <FormTextarea
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
        label={t("description")}
      />
      {type == "update" && (
        <Label label={t("image")} col>
          <Gallery media={defaultValues?.icon} />
        </Label>
      )}
      <ImageUploader name={"icon"} label={t("image")} />
    </Form>
  );
};

export default ServiceForm;
