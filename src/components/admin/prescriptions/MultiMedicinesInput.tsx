import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import Trash from "@/components/icons/Trash";
import React, {Fragment, useState, useTransition} from "react";
import { MedicinesService } from "@/services/MedicinesSevice";
import { Medicines } from "@/Models/Medicines";
import { useRouter } from "@/navigation";
import {useFormContext} from "react-hook-form";
import LoadingSpin from "@/components/icons/LoadingSpin";
import {Multi} from "@/Models/Prescriptions";
import {PrescriptionsService} from "@/services/PrescriptionsServise";
import {Dialog, Transition} from "@headlessui/react";
import MedicinesForm from "@/components/admin/medicines/MedicinesForm";



const MultiMedicinesInput = ({
  defaultValues,
    type,
}: {
  defaultValues?: Multi[];
  type: string
}) => {
  const {setValue} = useFormContext()
  const [medicines, setMedicines] = useState<Multi[]>(
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

  console.log(medicines)

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
    setValue('medicines',medicines)
  };
  let rot = useRouter();
  const [isPending, setPending] = useState<boolean>(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating: boolean = isPending || isTransitionStarted;
  const deleteMedicine = (index: number) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    setPending(true);
    startTransition(rot.refresh);
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
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div>

      <div className="flex flex-row justify-between my-4">
        <h2 className="card-title">Medicines</h2>
        <button className="btn btn-info"  onClick={openModal}>New Medicines</button>
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
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className='p-4'>
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
      <div className='text-end'>
        <button
            type={"button"}
            className="btn btn-accent"
            onClick={addMedicine}
        >
          Add
        </button>
      </div>
      {isMutating ? (
        <div className='my-4 flex justify-center items-center'> <LoadingSpin className="h-8 w-8 text-primary" /></div>
      ) : (
        medicines.map((medicine, index) => (
          <div className="border rounded-2xl p-4 my-2" key={index}>
            <div className="flex md:flex-row flex-col gap-2 items-center justify-between">
              <ApiSelect
                required={true}
                placeHolder={"Medicine name ..."}
                name={"medicine_id"}
                api={(page, search) =>
                  MedicinesService.make<MedicinesService>().indexWithPagination(
                    page,
                    search,
                  )
                }
                label={"Medicine Name"}
                optionValue={"id"}
                onSelect={(selectedItem) => {
                  handleInputChange(index, selectedItem?.id, "medicine_id");
                }}
                getOptionLabel={(data: Medicines) => data.name}
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
                  handleInputChange(index, select, "time");
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
                  handleInputChange(index, select, "dose_interval");
                }}
              />
            </div>
            <div className="w-full flex justify-between items-center ">
              <div className="w-full mr-5">
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
                    const id =Array.isArray(defaultValues) ?defaultValues[index]?.id:0
                    return await PrescriptionsService.make<PrescriptionsService>('admin').deleteMedicine(id??0).then(()=>{
                      setPending(true);
                      startTransition(rot.refresh);
                      setPending(false);
                    })
                  }
                }
              }
                className="w-8 h-8 text-error hover:border-red-500 rounded-xl hover:border-2 mt-3 cursor-pointer"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MultiMedicinesInput;

const a = [
  {
    medicine_id: 0,
    dosage: "gffghg",
    duration: "one day only",
    time: "After Meal",
    dose_interval: "Every Morning",
    comment: "fdsfsdf",
  },
  {
    medicine_id: 1,
    dosage: "dark",
    duration: "one day only",
    time: "After Meal",
    dose_interval: "Every Morning",
    comment: "fdgfdg",
  },
];
