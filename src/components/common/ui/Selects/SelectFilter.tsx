"use client";

import { TranslateStatusOrTypeClient } from "@/Helpers/TranslationsClient";
import {useTranslations} from "next-intl";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";

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
}: {
  data: any[];
  selected?: any[] | any;
  name?: string;
  isMultiple?: boolean;
  label?: string;
  onChange?: any;
  setStatus?: React.Dispatch<string>;
  status?: string;
  translated?: boolean;
}) => {
  const t = useTranslations("components")
  return (
    <label className={"text-start label flex flex-col items-start"}>
      {label ?? ""}
      <select
        className={"!text-start select select-bordered !flex-start "}
        defaultValue={selected ?? null}
        multiple={isMultiple ?? false}
        onChange={onChange ?? false}
      >
        <option value={undefined}>{t("select_item")}</option>
        {data.map((item, index) => (
          <option value={item == "all" ? "" : item} key={index}>
            {translated ? (<TranslatableEnum value={item}/>) : item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectFilter;
