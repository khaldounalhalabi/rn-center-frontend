"use client";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { MedicineService } from "@/services/MedicinesSevice";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

const MedicineFormSheet = () => {
  const t = useTranslations("common.medicine");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const revalidateMedicines = async () => {
    await queryClient.refetchQueries({
      predicate: (query) => {
        const [key, querySearch] = query.queryKey || [];
        return (
          `${key}`.startsWith("api_select_medicines.") &&
          `${key}`.endsWith(".medicine_id_items") &&
          (querySearch == "" ||
            querySearch == undefined ||
            querySearch == "undefined" ||
            querySearch == null ||
            !querySearch)
        );
      },
    });
  };

  const onSubmit = async (data: { name: string; description?: string }) => {
    return await MedicineService.make(RoleEnum.DOCTOR).store(data);
  };

  const onSuccess = async () => {
    await revalidateMedicines();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type={"button"}>{t("create.addMedicines")}</Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("create.addMedicines")}</SheetTitle>
          <SheetDescription>{t("add_medicine_desc")}</SheetDescription>
        </SheetHeader>
        <Form handleSubmit={onSubmit} onSuccess={onSuccess}>
          <Grid>
            <FormInput
              name={"name"}
              type={"text"}
              label={t("create.medicineName")}
            />
            <div className={"md:col-span-2"}>
              <FormTextarea
                name={"description"}
                label={t("create.description")}
              />
            </div>
          </Grid>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default MedicineFormSheet;
