"use client";
import React, { useState } from "react";
import Input, { InputProps } from "@/components/common/ui/Inputs/Input";
import Trash from "@/components/icons/Trash";
import {
  getNestedPropertyValue,
  sanitizeString,
} from "@/Helpers/ObjectHelpers";
import { useFormContext } from "react-hook-form";
import ImageUploader from "@/components/common/ui/ImageUploader";

interface MultiInputProps extends InputProps {
  defaultValue: any[];
}

const MultiImageUploader: React.FC<MultiInputProps> = ({
  className,
  label,
  name,
  type,
  defaultValue = [],
  ...props
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = getNestedPropertyValue(errors, `${name}`);
  const [inputNum, setInputNum] = useState(defaultValue?.length ?? 1);
  return (
    <>
      {label ? <label className={"label"}>{label}</label> : ""}
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        {[...Array(inputNum)].map((_field, index) => {
          return (
            <div className={"flex flex-col items-start"} key={index}>
              <div className={`flex justify-between items-center w-full gap-2`}>
                  <ImageUploader name={`${name}[${index}]`}/>
                <button
                  type={"button"}
                  className={"btn btn-square btn-sm"}
                  onClick={() =>
                    setInputNum((prevState: number) =>
                      prevState == 1 ? prevState : prevState - 1,
                    )
                  }
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
          onClick={() => setInputNum((prevState) => prevState + 1)}
        >
          Add New {label ?? sanitizeString(name)}
        </button>
      </div>
    </>
  );
};

export default MultiImageUploader;
