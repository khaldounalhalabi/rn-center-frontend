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
import { Service } from "@/models/Service";
import { ServiceService } from "@/services/ServiceService";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { ApiResponse } from "@/http/Response";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";

const UpdateServiceSheet = ({
  service,
  success = undefined,
}: {
  service?: Service;
  success?: () => void;
}) => {
  const t = useTranslations("doctor.service.create-edit");
  const [open, setOpen] = useState(false);
  const submit = (data: { name: string; description: string }) => {
    return ServiceService.make(RoleEnum.DOCTOR).update(service?.id, data);
  };

  const onSuccess = () => {
    if (success) {
      success();
    }

    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent sm={true}>
        <SheetHeader>
          <SheetTitle>{t("editService")}</SheetTitle>
        </SheetHeader>

        <Form
          handleSubmit={submit}
          defaultValues={service}
          onSuccess={onSuccess}
        >
          <Grid>
            <FormInput name={"name"} type={"text"} label={t("serviceName")} />
            <ApiSelect
              required={true}
              api={async (
                page,
                search,
              ): Promise<ApiResponse<ServiceCategory[]>> =>
                await ServiceCategoryService.make(
                  RoleEnum.DOCTOR,
                ).indexWithPagination(page, search)
              }
              optionValue={"id"}
              optionLabel={"name"}
              name={"service_category_id"}
              label={t("category")}
              defaultValues={
                service?.service_category?.id ? [service?.service_category] : []
              }
            />
            <div className={"col-span-2"}>
              <FormTextarea name={"description"} label={t("description")} />
            </div>
          </Grid>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateServiceSheet;
