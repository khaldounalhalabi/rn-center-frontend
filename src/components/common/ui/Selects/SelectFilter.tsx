"use client";

import { TranslateStatusOrTypeClient } from "@/Helpers/TranslationsClient";
import {useTranslations} from "next-intl";

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
    <label className={"label flex flex-col w-10/12 items-start"}>
      {label ?? ""}
      <select
        className={"select select-bordered w-full"}
        defaultValue={selected ?? null}
        multiple={isMultiple ?? false}
        onChange={onChange ?? false}
      >
        <option value={undefined}>{t("select_item")}</option>
        {data.map((item, index) => (
          <option value={item == "all" ? "" : item} key={index}>
            {translated ? TranslateStatusOrTypeClient(item) : item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectFilter;
