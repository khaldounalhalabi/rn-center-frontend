import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import Trash from "@/components/icons/Trash";
import React, { useEffect, useState, useTransition } from "react";
import { MedicineService } from "@/services/MedicinesSevice";
import { Medicine } from "@/Models/Medicines";
import { useRouter } from "@/navigation";
import { useFormContext } from "react-hook-form";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { MedicineData } from "@/Models/Prescriptions";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { swal } from "@/Helpers/UIHelpers";
import { useTranslations } from "next-intl";

const MultiMedicinesInput = ({
  userType = "admin",

  defaultValues,
  type,
  reloadSelect,
}: {
  userType?: "admin" | "doctor";
  defaultValues?: MedicineData[];
  type: string;
  reloadSelect: string;
}) => {
  const t = useTranslations("common.prescription.create");
  const dataDefault = Array.isArray(defaultValues)
    ? defaultValues?.map(({ id, prescription_id, medicine, ...rest }) => rest)
    : [];

  const { setValue } = useFormContext();
  const [medicines, setMedicines] = useState<MedicineData[]>(
    Array.isArray(defaultValues)
      ? dataDefault
      : [
          {
            medicine_id: 0,
            dosage: "",
            duration: "one day only",
            time: "After Meal",
            dose_interval: "Every Morning",
            comment: "",
          },
        ]
  );
  const addMedicine = () => {
    const newMedicine = {
      medicine_id: 0,
      dosage: "",
      duration: "one day only",
      time: "After Meal",
      dose_interval: "Every Morning",
      comment: "",
    };
    setMedicines([...medicines, newMedicine]);
  };

  const handleInputChange = (
    index: number,
    value: string | number | undefined,
    name: string
  ) => {
    const updatedMedicines = [...medicines];
    // @ts-ignore
    updatedMedicines[index][name] = value;
    setMedicines(updatedMedicines);
    setValue("medicines", medicines);
  };
  useEffect(() => {
    setValue("medicines", medicines);
  }, [medicines]);
  let router = useRouter();
  const [isPending, setPending] = useState<boolean>(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating: boolean = isPending || isTransitionStarted;
  const deleteMedicineForm = (index: number) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    setPending(true);
    startTransition(router.refresh);
    setPending(false);
  };
  const duration = [
    "one day only",
    "for three day",
    "for one week",
    "for 2 week",
    "for 1 month",
  ];
  const time = ["After Meal", "Before Meal"];
  const doseInterval = [
    "Every Morning",
    "Every Morning & Evening",
    "Three Time a Day",
    "4 Time a Day",
  ];

  return (
    <div>
      <div className="text-end">
        <button
          type={"button"}
          className="btn btn-accent"
          onClick={addMedicine}
        >
          {t("add")}
        </button>
      </div>
      {isMutating ? (
        <div className="flex justify-center items-center my-4">
          <LoadingSpin className="w-8 h-8 text-primary" />
        </div>
      ) : (
        medicines.map((medicine, index) => (
          <div className="my-2 p-4 border rounded-2xl" key={index}>
            <div className="flex md:flex-row flex-col justify-between items-center gap-2">
              <ApiSelect
                revalidate={reloadSelect}
                required={true}
                placeHolder={"Medicine name ..."}
                name={`medicines[${index}].medicine_id`}
                api={(page, search) =>
                  MedicineService.make<MedicineService>(
                    userType
                  ).indexWithPagination(page, search)
                }
                label={t("medicineName")}
                optionValue={"id"}
                defaultValues={
                  defaultValues?.[index]?.medicine
                    ? [
                        {
                          label: defaultValues?.[index]?.medicine?.name,
                          value: defaultValues?.[index]?.medicine?.id,
                        },
                      ]
                    : undefined
                }
                onSelect={(selectedItem) => {
                  handleInputChange(index, selectedItem?.id, "medicine_id");
                }}
                getOptionLabel={(data: Medicine) => data.name}
              />
              <div className={`flex flex-col items-start w-full`}>
                <label className={"label"}>{t("dosage")}</label>
                <input
                  className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
                  type={"text"}
                  onChange={(e) =>
                    handleInputChange(index, e.target.value, "dosage")
                  }
                  placeholder={"dosage..."}
                  defaultValue={
                    medicines?.[index].dosage
                      ? medicines?.[index].dosage
                      : undefined
                  }
                />
              </div>
              <SelectPopOver
                id={1}
                label={t("duration")}
                status={
                  medicines?.[index].duration
                    ? medicines?.[index].duration
                    : "one day only"
                }
                ArraySelect={duration}
                handleSelect={(select: string, id: number) => {
                  handleInputChange(index, select, "duration");
                }}
              />
              <SelectPopOver
                id={2}
                label={t("time")}
                status={
                  medicines?.[index].time
                    ? medicines?.[index].time
                    : "After Meal"
                }
                ArraySelect={time}
                handleSelect={(select: string, id: number) => {
                  handleInputChange(index, select, "time");
                }}
              />
              <SelectPopOver
                id={3}
                label={t("doseInterval")}
                status={
                  medicines?.[index].dose_interval
                    ? medicines?.[index].dose_interval
                    : "Every Morning"
                }
                ArraySelect={doseInterval}
                handleSelect={(select: string, id: number) => {
                  handleInputChange(index, select, "dose_interval");
                }}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="mr-5 w-full">
                <label className="label">{t("comment")} :</label>
                <textarea
                  className={"text-sm textarea textarea-bordered w-full"}
                  placeholder={"comment ..."}
                  onChange={(e) => {
                    handleInputChange(index, e.target.value, "comment");
                  }}
                  defaultValue={
                    medicines?.[index].comment
                      ? medicines?.[index].comment
                      : undefined
                  }
                />
              </div>
              <Trash
                onClick={() => {
                  swal
                    .fire({
                      title: "Are you sure?",
                      text: "You won't to Delete this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes!",
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        if (type == "update") {
                          const id = Array.isArray(defaultValues)
                            ? defaultValues?.[index]?.id
                            : 0;
                          if (id != 0) {
                            return PrescriptionService.make<PrescriptionService>(
                              userType
                            )
                              .deleteMedicine(id ?? 0)
                              .then(() => {
                                deleteMedicineForm(index);
                              });
                          } else {
                            deleteMedicineForm(index);
                          }
                        } else {
                          deleteMedicineForm(index);
                        }
                      }
                    });
                }}
                className="hover:border-2 mt-3 hover:border-red-500 rounded-xl w-8 h-8 text-error cursor-pointer"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MultiMedicinesInput;
