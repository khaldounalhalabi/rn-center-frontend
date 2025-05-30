"use client";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
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
import { Appointment } from "@/models/Appointment";
import { Service } from "@/models/Service";
import { AppointmentService } from "@/services/AppointmentService";
import { ServiceService } from "@/services/ServiceService";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const UpdateAppointmentSheet = ({
  appointment,
  success = undefined,
  revalidatePage = undefined,
  buttonText = undefined,
}: {
  appointment?: Appointment;
  success?: () => void;
  revalidatePage?: () => Promise<void>;
  buttonText?: string;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common.appointment.create");
  const locale = useLocale();

  const onSubmit = async (data: { service_id: number; note: string }) => {
    return await AppointmentService.make(RoleEnum.DOCTOR).update(
      appointment?.id,
      data,
    );
  };

  const onSuccess = () => {
    if (success) {
      success();
    }

    if (revalidatePage) {
      revalidatePage();
    }
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={buttonText ? "default" : "secondary"}
          size={buttonText ? "default" : "icon"}
        >
          {buttonText ?? <Pencil />}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale == "ar" ? "left" : "right"}
        className={"w-[60vh] md:w-[80vh]"}
      >
        <SheetHeader>
          <SheetTitle>{t("editAppointment")}</SheetTitle>
        </SheetHeader>
        <Form
          handleSubmit={onSubmit}
          onSuccess={onSuccess}
          defaultValues={appointment}
        >
          <Grid>
            <ApiSelect
              required={true}
              name="service_id"
              label={t("serviceName")}
              api={(page?: number, search?: string) =>
                ServiceService.make(RoleEnum.DOCTOR).indexWithPagination(
                  page,
                  search,
                )
              }
              getOptionLabel={(option: Service) => option?.name}
              optionValue="id"
              defaultValues={appointment?.service ? [appointment.service] : []}
              isMultiple={false}
            />
            <div className={"col-span-2"}>
              <FormTextarea name={"note"} label={t("note")} />
            </div>
          </Grid>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateAppointmentSheet;
