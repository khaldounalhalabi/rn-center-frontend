"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Slider } from "@/components/ui/shadcn/slider";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export interface RangeInputProps {
  className?: string | undefined;
  name: string;
  label?: string;
  required?: boolean;
  unit?:
    | "IQD"
    | "day"
    | "week"
    | "month"
    | "hour"
    | "sec"
    | "min"
    | "%"
    | undefined
    | string;
  min?: number;
  max?: number;
  step?: number;
  hidden?: boolean;
  defaultValue?: number | undefined;
  onChange?: (value: number) => void;
  withError?: boolean;
  showValue?: boolean;
  valueLabel?: string;
}

const FormRange: React.FC<RangeInputProps> = ({
  label,
  name,
  required = false,
  unit,
  min = 0,
  max = 100,
  step = 1,
  hidden = false,
  defaultValue = undefined,
  onChange = undefined,
  withError = true,
  showValue = true,
  valueLabel,
}) => {
  const {
    control,
    setValue,
    formState: { defaultValues },
  } = useFormContext();

  const translateUnit = useTranslations("units");
  const [currentValue, setCurrentValue] = useState<number>(
    defaultValue ?? getNestedPropertyValue(defaultValues, name) ?? min
  );

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(name, defaultValue);
      setCurrentValue(defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const handleValueChange = (value: number[]) => {
    const newValue = value[0];
    setCurrentValue(newValue);
    setValue(name, newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const getDisplayValue = () => {
    if (valueLabel) {
      return valueLabel;
    }
    return unit ? `${currentValue} ${translateUnit(unit as any)}` : currentValue.toString();
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={hidden ? "hidden" : "space-y-3"}>
          {label && (
            <FormLabel>
              {label} {unit && ` (${translateUnit(unit as any)})`}
            </FormLabel>
          )}
          <FormControl>
            <div className="space-y-2">
              <Slider
                {...field}
                value={[currentValue]}
                onValueChange={handleValueChange}
                min={min}
                max={max}
                step={step}
                disabled={hidden}
                className="w-full"
              />
              {showValue && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{min}</span>
                  <span className="font-medium">{getDisplayValue()}</span>
                  <span>{max}</span>
                </div>
              )}
            </div>
          </FormControl>
          {withError && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default FormRange; 