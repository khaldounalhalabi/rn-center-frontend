"use client";

import { useTranslations } from "next-intl";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import { ChangeEventHandler } from "react";
import { Label } from "@/components/common/ui/LabelsValues/Label";

const SelectFilter = ({
  data,
  name,
  selected = [],
  isMultiple = false,
  label = undefined,
  onChange,
  setStatus,
  status,
  translated = false,
  sm = false,
  col = true,
}: {
  data: any[];
  selected?: any[] | any;
  name?: string;
  isMultiple?: boolean;
  label?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  setStatus?: React.Dispatch<string>;
  status?: string;
  translated?: boolean;
  sm?: boolean;
  col?: boolean;
}) => {
  const t = useTranslations("components");
  return (
    <Label label={label} col={col ?? false}>
      <select
        className={`!text-start select select-bordered ${sm && "select-sm"} flex-start w-full`}
        defaultValue={selected ?? null}
        multiple={isMultiple ?? false}
        onChange={onChange}
      >
        <option value={""}>{t("select_item")}</option>
        {data.map((item, index) => (
          <option value={item == "all" ? "" : item} key={index}>
            {translated ? <TranslatableEnum value={item} /> : item}
          </option>
        ))}
      </select>
    </Label>
  );
};

export default SelectFilter;
