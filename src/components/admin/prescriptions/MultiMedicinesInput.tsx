import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import Trash from "@/components/icons/Trash";
import React, { Fragment, useState, useTransition } from "react";
import { MedicineService } from "@/services/MedicinesSevice";
import { Medicine } from "@/Models/Medicines";
import { useRouter } from "@/navigation";
import { useFormContext } from "react-hook-form";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { MedicineData } from "@/Models/Prescriptions";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { Dialog, Transition } from "@headlessui/react";
import MedicinesForm from "@/components/admin/medicines/MedicinesForm";

const MultiMedicinesInput = ({
  defaultValues,
  type,
}: {
  defaultValues?: MedicineData[];
  type: string;
}) => {
  const { setValue } = useFormContext();
  const [medicines, setMedicines] = useState<MedicineData[]>(
    Array.isArray(defaultValues)
      ? defaultValues
      : [
          {
            medicine_id: 0,
            dosage: "",
            duration: "one day only",
            time: "After Meal",
            dose_interval: "Every Morning",
            comment: "",
          },
        ],
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
    name: string,
  ) => {
    const updatedMedicines = [...medicines];
    // @ts-ignore
    updatedMedicines[index][name] = value;
    setMedicines(updatedMedicines);
    setValue("medicines", medicines);
  };
  let router = useRouter();
  const [isPending, setPending] = useState<boolean>(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating: boolean = isPending || isTransitionStarted;
  const deleteMedicine = (index: number) => {
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
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex flex-row justify-between my-4">
        <h2 className="card-title">Medicines</h2>
        <button className="btn btn-info" onClick={openModal}>
          New Medicines
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex justify-center items-center p-4 min-h-full text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md text-left transform transition-all overflow-hidden align-middle">
                    <div className="p-4">
                      <h2 className="card-title">New Medicine</h2>
                      <MedicinesForm />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className="text-end">
        <button
          type={"button"}
          className="btn btn-accent"
          onClick={addMedicine}
        >
          Add
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
                required={true}
                placeHolder={"Medicine name ..."}
                name={`medicines[${index}].medicine_id`}
                api={(page, search) =>
                  MedicineService.make<MedicineService>().indexWithPagination(
                    page,
                    search,
                  )
                }
                label={"Medicine Name"}
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
                <label className={"label"}>Dosage</label>
                <input
                  className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
                  type={"text"}
                  onChange={(e) =>
                    handleInputChange(index, e.target.value, "dosage")
                  }
                  placeholder={"dosage..."}
                  defaultValue={
                    medicines[index].dosage
                      ? medicines[index].dosage
                      : undefined
                  }
                />
              </div>
              <SelectPopOver
                id={1}
                label={"Duration"}
                status={
                  medicines[index].duration
                    ? medicines[index].duration
                    : "one day only"
                }
                ArraySelect={duration}
                handleSelect={(select: string, id: number) => {
                  handleInputChange(index, select, "duration");
                }}
              />
              <SelectPopOver
                id={1}
                label={"Time"}
                status={
                  medicines[index].time ? medicines[index].time : "After Meal"
                }
                ArraySelect={time}

                handleSelect={(select: string, id: number) => {
                  handleInputChange(index, select, "duration");
                }}
              />
              <SelectPopOver
                id={1}
                label={"Dose Interval"}
                status={
                  medicines[index].dose_interval
                    ? medicines[index].dose_interval
                    : "Every Morning"
                }
                ArraySelect={doseInterval}
                handleSelect={(select: string, id: number) => {

                  handleInputChange(index, select, "duration");
                }}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="mr-5 w-full">
                <label className="label">COMMENT :</label>
                <textarea
                  className={"text-sm textarea textarea-bordered w-full"}
                  placeholder={"comment ..."}
                  onChange={(e) => {
                    handleInputChange(index, e.target.value, "comment");
                  }}
                  defaultValue={
                    medicines[index].comment
                      ? medicines[index].comment
                      : undefined
                  }
                />
              </div>
              <Trash
                onClick={async () => {
                  deleteMedicine(index);
                  if (type == "update") {
                    const id = Array.isArray(defaultValues)
                      ? defaultValues[index]?.id
                      : 0;
                    return await PrescriptionService.make<PrescriptionService>(
                      "admin",
                    )
                      .deleteMedicine(id ?? 0)
                      .then(() => {
                        setPending(true);
                        startTransition(router.refresh);
                        setPending(false);
                      });
                  }
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
