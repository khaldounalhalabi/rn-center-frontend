"use client";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface ISelectProps {
  placeholder?: string;
  options: string[];
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
  translated?: boolean;
}

const MultiSelect = ({
  placeholder,
  options,
  defaultValues,
  onChange,
  translated = false,
}: ISelectProps) => {
  const t = useTranslations();
  const [selectedItems, setSelectedItems] = useState<string[]>(
    defaultValues ?? [],
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (value: string): boolean =>
    selectedItems.includes(value);

  useEffect(() => {
    if (onChange) {
      onChange(selectedItems);
    }
  }, [selectedItems]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          ref={triggerRef}
        >
          {selectedItems?.length <= 0 && (
            <div>{placeholder ?? t("components.select_item")}</div>
          )}

          {selectedItems?.length > 0 && (
            <div className={"flex items-center gap-1"}>
              <Badge>
                {translated
                  ? t(`types_statuses.${selectedItems?.[0]}` as any)
                  : selectedItems?.[0]}
              </Badge>
              {selectedItems?.length > 1 && (
                <span>
                  {t("components.and_items_count", {
                    items_count: selectedItems.length - 1,
                  })}
                </span>
              )}
            </div>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={"w-full"}
        style={{
          width: triggerRef.current
            ? `${triggerRef.current.offsetWidth}px`
            : "auto",
        }}
      >
        <DropdownMenuCheckboxItem
          onSelect={(e) => e.preventDefault()}
          checked={false}
          onCheckedChange={() => setSelectedItems([])}
        >
          {t("components.select_item")}
        </DropdownMenuCheckboxItem>
        {options.map((value: string, index: number) => {
          return (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value)}
              onCheckedChange={() => handleSelectChange(value)}
            >
              {translated ? t(`types_statuses.${value}` as any) : value}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
