"use client";
import React, { useEffect, useState } from "react";
import { InputProps } from "@/components/common/ui/Inputs/Input";
import Trash from "@/components/icons/Trash";
import {
  getNestedPropertyValue,
  sanitizeString,
} from "@/Helpers/ObjectHelpers";
import { useFormContext } from "react-hook-form";

interface MultiInputProps extends InputProps {
  name: string;
  maxFields?: number;
}

const MultiInput: React.FC<MultiInputProps> = ({
  className,
  label,
  name,
  type,
  required = false,
  maxFields = Infinity,
  ...props
}) => {
  const {
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}`);
  let defaultValue = getNestedPropertyValue(defaultValues, name) ?? [];

  const [inputs, setInputs] = useState<any[]>(defaultValue);

  const handleInputChange = (index: number, value: any) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < maxFields) {
      setInputs([...inputs, ""]);
    }
  };

  const removeInput = (value: any) => {
    const index = inputs.indexOf(value);
    const temp = inputs;
    if (index > -1) {
      temp.splice(index, 1);
    }
    setInputs([...temp]);
  };

  useEffect(() => {
    setValue(name, inputs);
  }, [inputs]);

  return (
    <>
      {label ? (
        <label className={"label justify-start"}>
          {label}{" "}
          {typeof error === "object" && error !== null ? (
            <p className={"text-error"}>{error.message}</p>
          ) : (
            ""
          )}
          {required ? <span className="ml-1 text-red-600">*</span> : false}
        </label>
      ) : (
        ""
      )}

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        {inputs.map((field: any, index: number) => {
          return (
            <div className={"flex flex-col items-start"} key={index}>
              <div className={`flex justify-between items-center w-full gap-2`}>
                <input
                  key={`a-${index}`}
                  type={type}
                  className={
                    className ??
                    `input input-bordered w-full ${error ? "border-error" : ""} focus:outline-pom focus:border-pom`
                  }
                  {...props}
                  defaultValue={field ?? ""}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(index, e.target.value);
                  }}
                />

                <button
                  type={"button"}
                  className={"btn btn-square btn-sm"}
                  onClick={() => {
                    removeInput(field);
                  }}
                >
                  <Trash className={"h-6 w-6 text-error"} />
                </button>
              </div>
              {error &&
              Array.isArray(error) &&
              error?.length > 0 &&
              error[index] ? (
                <p className={"text-error"}>{error[index].message}</p>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>

      <div className={`flex items-center m-3`}>
        <button
          type={"button"}
          className={`btn btn-sm btn-neutral`}
          onClick={() => addInput()}
          disabled={inputs.length >= maxFields}
        >
          Add New {label ?? sanitizeString(name ?? "")}
        </button>
      </div>
    </>
  );
};

export default MultiInput;