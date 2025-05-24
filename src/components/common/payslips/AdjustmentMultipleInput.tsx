"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { useTranslations } from "next-intl";
import Select from "@/components/common/ui/selects/Select";
import { getEnumValues } from "@/helpers/Enums";
import PayslipAdjustmentTypeEnum from "@/enums/PayslipAdjustmentTypeEnum";

interface Adjustment {
  reason: string;
  value: number;
  type: "benefit" | "deduction";
}

interface AdjustmentMultipleInputProps {
  name: string;
  label?: string;
  maxFields?: number;
  required?: boolean;
  reasonPlaceholder?: string;
  valuePlaceholder?: string;
  defaultReason?: string;
  defaultValue?: number;
  defaultType?: "benefit" | "deduction";
  className?: string;
  defaultValueList?: Adjustment[];
}

const AdjustmentMultipleInput: React.FC<AdjustmentMultipleInputProps> = ({
  name,
  label,
  maxFields = Infinity,
  required = false,
  reasonPlaceholder = "Reason",
  valuePlaceholder = "Value",
  defaultReason = "",
  defaultValue = 0,
  defaultType = "benefit",
  className,
  defaultValueList = [],
}) => {
  const t = useTranslations("components");
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = getNestedPropertyValue(errors, `${name}`);

  const [fields, setFields] = useState<Adjustment[]>(defaultValueList ?? []);

  useEffect(() => {
    setValue(name, fields);
  }, [fields, name, setValue]);

  const addField = () => {
    if (fields.length < maxFields) {
      setFields([
        ...fields,
        {
          reason: defaultReason,
          value: defaultValue,
          type: defaultType,
        },
      ]);
    }
  };

  const removeField = (index: number) => {
    if (fields.length === 1 && required) {
      return;
    }

    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (
    index: number,
    fieldType: keyof Adjustment,
    value: string | number | any,
  ) => {
    const newFields = [...fields];
    // @ts-ignore
    newFields[index][fieldType] = value;
    setFields(newFields);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {label && (
        <Label className="flex items-center">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </Label>
      )}

      <div className="flex w-full flex-col gap-3">
        {fields.map((field, index) => (
          <div key={index} className="grid w-full grid-cols-4 gap-2">
            <Input
              className={className || "flex-1"}
              value={field.reason}
              placeholder={reasonPlaceholder}
              onChange={(e) => updateField(index, "reason", e.target.value)}
            />
            <Input
              className={className || "flex-1"}
              type="number"
              value={field.value}
              placeholder={valuePlaceholder}
              onChange={(e) =>
                updateField(index, "value", Number(e.target.value))
              }
            />
            <Select
              data={getEnumValues(PayslipAdjustmentTypeEnum)}
              selected={field.type}
              onChange={(value) =>
                updateField(index, "type", value as PayslipAdjustmentTypeEnum)
              }
              translated={true}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeField(index)}
              disabled={fields.length === 1 && required}
            >
              <Trash />
            </Button>
          </div>
        ))}

        {error && <p className="text-sm text-red-600">{error.message}</p>}

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={addField}
          disabled={fields.length >= maxFields}
        >
          {t("add")} {label}
        </Button>
      </div>
    </div>
  );
};

export default AdjustmentMultipleInput;
