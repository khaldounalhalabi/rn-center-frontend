import React, { useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

interface InputField {
  key: string;
  value: string;
}

const OtherDataInput = ({ defaultValues }: { defaultValues?: string }) => {
  const parseJsonString = (jsonString: string | undefined): InputField[] => {
    if (!jsonString) {
      return [];
    }

    try {
      const parsedObject = JSON.parse(jsonString);
      return Object.entries(parsedObject).map(([key, value]) => ({
        key,
        value: String(value),
      }));
    } catch (error) {
      console.error("Failed to parse JSON string:", error);
      return [];
    }
  };

  const jsonString: string | undefined = defaultValues;
  const defaultInputs: InputField[] = parseJsonString(jsonString);

  const [inputs, setInputs] = useState<InputField[]>(defaultInputs);

  const handleAddFields = () => {
    setInputs([...inputs, { key: "", value: "" }]);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const values = [...inputs];
    values[index][event.target.name as keyof InputField] = event.target.value;
    setInputs(values);
  };
  const result = inputs.reduce((acc: { [key: string]: string }, input) => {
    acc[input.key] = input.value;
    return acc;
  }, {});
  const { setValue } = useFormContext();
  useEffect(() => {
    const stringifyValue = JSON.stringify(result);
    setValue("other_data", stringifyValue);
  }, [result, setValue]);
  const t = useTranslations("common.patient.create");

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="content-center card-title">{t("otherData")} :</h1>
        <button
          type={"button"}
          className="btn btn-accent"
          onClick={handleAddFields}
        >
          {t("add")}
        </button>
      </div>
      {inputs.map((input, index) => (
        <div className="w-full flex justify-between my-3" key={index}>
          <div className="flex flex-col items-start w-5/12">
            <label className="label">{t("inputType")} :</label>
            <input
              className="input input-bordered w-full focus:outline-pom focus:border-pom"
              type="text"
              name="key"
              placeholder="Type Input ..."
              value={input.key}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="flex flex-col w-5/12 items-start">
            <label className="label">{t("inputValue")} :</label>
            <input
              className="input input-bordered w-full focus:outline-pom focus:border-pom"
              type="text"
              name="value"
              placeholder="Value ..."
              value={input.value}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="flex justify-center items-center pt-8">
            <Trash
              className="hover:border-2 mt-3 hover:border-red-500 rounded-xl w-8 h-8 text-error cursor-pointer"
              onClick={() => handleRemoveFields(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherDataInput;
