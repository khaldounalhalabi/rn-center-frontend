"use client";

import { Label } from "@/components/common/ui/labels-and-values/Label";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/shadcn/select";
import { useTranslations } from "next-intl";

const Select = ({
  data,
  selected = undefined,
  label = undefined,
  onChange,
  translated = false,
  col = true,
}: {
  data: any[];
  selected?: string;
  label?: string;
  onChange?: ((value: string) => void) | undefined;
  translated?: boolean;
  col?: boolean;
}) => {
  const t = useTranslations("components");
  return (
    <Label col={col} label={label}>
      <ShadcnSelect defaultValue={selected} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("select_item")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((item, index) => (
              <SelectItem value={item == "all" ? "" : item} key={index}>
                {translated ? <TranslatableEnum value={item} /> : item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ShadcnSelect>
    </Label>
  );
};

export default Select;
