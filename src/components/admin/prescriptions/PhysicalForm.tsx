import Grid from "@/components/common/ui/Grid";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export interface Stringify {
  blood: string;
  food: string;
  tendency: string;
  heart: string;
  diabetic: string;
  medical: string;
  female: string;
  breast: string;
  current: string;
  surgery: string;
  accident: string;
  others: string;
  pulse: string;
  temperature: string;
}

const PhysicalForm = ({ defaultValue }: { defaultValue?: string }) => {
  const defaultStringify = defaultValue ? JSON.parse(defaultValue) : "";

  const { setValue } = useFormContext();

  const [value, setValueStringify] = useState<Stringify>(
    defaultStringify
      ? defaultStringify
      : {
          blood: "",
          food: "",
          tendency: "",
          heart: "",
          diabetic: "",
          medical: "",
          female: "",
          breast: "",
          current: "",
          surgery: "",
          accident: "",
          others: "",
          pulse: "",
          temperature: "",
        },
  );
  const handleInputChange = (
    valueInput: string | number | undefined,
    name: string,
  ) => {
    const newValue = { ...value, [name]: valueInput };
    setValueStringify(newValue);
    const stringifyValue = JSON.stringify(value);
    setValue("physical_information", stringifyValue);
  };

  return (
    <>
      <h2 className="card-title">Physical Information</h2>
      <Grid md={4}>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>High Blood Pressure:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"blood"}
            defaultValue={value.blood ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Food Allergies:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"food"}
            defaultValue={value.food ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Tendency Bleed:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"tendency"}
            defaultValue={value.tendency ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Heart Disease:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"heart"}
            defaultValue={value.heart ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Diabetic:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"diabetic"}
            defaultValue={value.diabetic ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Medical History:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"medical"}
            defaultValue={value.medical ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Female Pregnancy:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"female"}
            defaultValue={value.female ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Breast Feeding:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"breast"}
            defaultValue={value.breast ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Current Medication:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"current"}
            defaultValue={value.current ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Surgery:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"surgery"}
            defaultValue={value.surgery ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Accident:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"accident"}
            defaultValue={value.accident ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Others:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"others"}
            defaultValue={value.others ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Pulse Rate:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"pulse"}
            defaultValue={value.pulse ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
        <div className={`flex flex-col items-start w-full`}>
          <label className={"label"}>Temperature:</label>
          <input
            className={`input input-bordered w-full  focus:outline-pom focus:border-pom`}
            placeholder={"..."}
            type="text"
            name={"temperature"}
            defaultValue={value.temperature ?? undefined}
            onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          />
        </div>
      </Grid>
    </>
  );
};

export default PhysicalForm;
