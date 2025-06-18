"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import useUser from "@/hooks/UserHook";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { useTranslations } from "next-intl";

const ServiceCategoryForm = ({
  defaultValues = undefined,
  id,
  type = "store",
  onSuccess = undefined,
}: {
  defaultValues?: ServiceCategory;
  id?: number;
  type?: "store" | "update";
  onSuccess?: () => void | Promise<void>;
}) => {
  const { role } = useUser();
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return ServiceCategoryService.make(role)
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await ServiceCategoryService.make(role).store(data);
    }
  };
  const handleSuccess = async () => {
    if (onSuccess) {
      await onSuccess();
    } else {
      await Navigate(`/${role}/service-categories`);
    }
  };
  const t = useTranslations("admin.category.create-edit");

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={handleSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"1"}>
        <FormInput
          required={true}
          type={"text"}
          label={`${t("serviceCategoryName")}`}
          name={"name"}
        />
      </Grid>
    </Form>
  );
};

export default ServiceCategoryForm;
