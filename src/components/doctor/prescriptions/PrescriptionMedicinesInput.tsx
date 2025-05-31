import FormInput from "@/components/common/ui/inputs/FormInput";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import { Prescription } from "@/models/Prescriptions";
import { MedicineService } from "@/services/MedicinesSevice";
import { Plus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";

const PrescriptionMedicinesInput = ({
  prescription,
}: {
  prescription?: Prescription;
}) => {
  const t = useTranslations("common.prescription");
  const form = useFormContext();
  const {
    fields: medicineFields,
    append: addMedicine,
    remove: removeMedicine,
  } = useFieldArray({
    name: "medicines",
    control: form.control,
  });

  return (
    <Card>
      <CardHeader className={"flex items-center justify-between flex-row"}>
        <CardTitle>{t("medicines")}</CardTitle>
        <Button
          size={"icon"}
          onClick={() => {
            addMedicine({
              medicine_id: undefined,
              dosage: "حبة واحدة",
              dose_interval: "ثلاث مرات يومياً بعد الطعام",
              comment: "",
            });
          }}
          type={"button"}
        >
          <Plus />
        </Button>
      </CardHeader>
      <CardContent>
        {medicineFields.map((field, index) => (
          <div
            className={"flex w-full items-end gap-5 justify-between my-3"}
            key={field.id}
          >
            <div className={"max-w-[20%] w-full"}>
              <ApiSelect
                api={(page, search) =>
                  MedicineService.make(RoleEnum.DOCTOR).indexWithPagination(
                    page,
                    search,
                  )
                }
                name={`medicines.${index}.medicine_id`}
                label={t("create.medicineName")}
                getOptionValue={(item) => item?.id}
                getOptionLabel={(item) => item?.name}
                defaultValues={
                  prescription?.medicines?.[index]?.medicine != undefined
                    ? [prescription?.medicines?.[index]?.medicine]
                    : []
                }
              />
            </div>
            <FormInput
              name={`medicines.${index}.dosage`}
              type={"text"}
              label={t("dosage")}
            />
            <FormInput
              name={`medicines.${index}.dose_interval`}
              type={"text"}
              label={t("dosage_interval")}
            />
            <FormInput
              name={`medicines.${index}.comment`}
              type={"text"}
              label={t("comment")}
            />
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => {
                removeMedicine(index);
              }}
              type={"button"}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrescriptionMedicinesInput;
