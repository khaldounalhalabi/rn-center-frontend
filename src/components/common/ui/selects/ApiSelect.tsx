"use client";
import React, { useEffect, useRef, useState } from "react";
import { IApiSelectProps, isEqual, isOption, Option } from "./SelectUtils";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
import XMark from "@/components/icons/XMark";
import LoadingSpin from "@/components/icons/LoadingSpin";
import ChevronDown from "@/components/icons/ChevronDown";
import { useFormContext } from "react-hook-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

function ApiSelect<TResponse, TData>({
  api,
  getDataArray,
  label,
  clearable = true,
  styles = undefined,
  name,
  isMultiple = false,
  closeOnSelect = true,
  optionLabel = undefined,
  optionValue = undefined,
  getOptionLabel = undefined,
  getOptionValue = undefined,
  onSelect = undefined,
  placeHolder = undefined,
  defaultValues = undefined,
  onChange = undefined,
  required = false,
  onClear = undefined,
  onRemoveSelected = undefined,
  inputProps = {},
  revalidate,
  withoutPlaceHolder = true,
}: IApiSelectProps<TResponse, TData>) {
  const t = useTranslations("components");
  if (withoutPlaceHolder) {
    placeHolder = undefined;
  }
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const validationError = getNestedPropertyValue(errors, `${name}.message`);

  const getOption = (item: TData): Option => ({
    label: getOptionLabel
      ? getOptionLabel(item)
      : getNestedPropertyValue(item, String(optionLabel)) ?? undefined,
    value: getOptionValue
      ? getOptionValue(item)
      : getNestedPropertyValue(item, String(optionValue)) ?? undefined,
  });

  let df: Option[] = [];

  if (defaultValues) {
    df = defaultValues.map((val) => {
      if (isOption(val)) {
        return val;
      } else return getOption(val);
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: any; value: any }[]>(df);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const fullContainer = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: [`tableData_${label}`, search],
      queryFn: async ({ pageParam }) => {
        let s = !search || search == "" ? undefined : search;
        return await api(pageParam, s, false, 1);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return !lastPage.paginate?.is_last
          ? lastPage.paginate?.current_page
            ? lastPage.paginate?.current_page + 1
            : null
          : null;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 10,
      retryDelay: 100,
    });
  useEffect(() => {
    refetch();
    setSelected(df);
  }, [revalidate]);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      fullContainer.current &&
      !fullContainer.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleChoseItem = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: TData,
  ) => {
    e.stopPropagation();

    if (onSelect) {
      onSelect(item, selected, setSelected, e);
    }
    const option = getOption(item);
    if (isMultiple) {
      if (include(option, selected)) {
        setSelected((prev) => prev.filter((sel) => !isEqual(sel, option)));
      } else {
        setSelected((prev) => [option, ...prev]);
      }
    } else {
      if (include(option, selected)) {
        setSelected([]);
      } else {
        setSelected([option]);
      }
    }

    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      if (search) {
        setSearch(undefined);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClickingOnSearchInput = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleRemoveFromSelected = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    clickedItem: Option,
  ) => {
    e.stopPropagation();
    setSelected((prev) => prev.filter((i) => !isEqual(i, clickedItem)));
    onRemoveSelected ? onRemoveSelected(clickedItem) : false;
  };

  const handleDataScrolling = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    inputRef?.current?.dispatchEvent(new Event("input", { bubbles: true }));
  }, [selected]);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const getInputValue = () => {
    if (isMultiple) {
      return selected.map((option) => option.value);
    } else {
      return selected?.[0]?.value ?? "";
    }
  };

  return (
    <div
      className={`relative w-full select-none ${styles?.baseContainerClasses ?? ""}`}
      ref={fullContainer}
    >
      <label
        className={`flex ${styles?.labelClasses ?? "label select-text justify-start font-medium"}`}
      >
        {label ?? ""}
        {required ? <span className="ml-1 text-red-600">*</span> : false}
        <input
          ref={inputRef}
          name={name ?? ""}
          value={getInputValue()}
          className={`hidden`}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(e);
            }
            if (name) {
              setValue(name, getInputValue());
            }
          }}
          {...inputProps}
        />
      </label>

      <div
        onClick={() => handleOpen()}
        className={`flex cursor-pointer justify-between ${styles?.selectClasses ?? "w-full rounded-sm border border-gray-300 p-3 text-gray-700 sm:text-sm"}`}
      >
        <div
          className="flex w-full items-center justify-between"
          role="listbox"
          aria-expanded={isOpen}
          aria-activedescendant={
            selected.length ? selected[0].value : undefined
          }
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1">
              {selected.map((option, index) => (
                <div className="flex flex-wrap gap-1" key={index}>
                  <span
                    className={`${styles?.selectedItemsBadgeClasses ?? "badge badge-ghost hover:badge-error"} cursor-pointer`}
                    onClick={(e) => handleRemoveFromSelected(e, option)}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles?.placeholder ?? ""}>{placeHolder}</p>
          )}
          <div className="flex items-center gap-2">
            {isFetching && (
              <div className="">
                {styles?.loadingIcon ? (
                  styles.loadingIcon()
                ) : (
                  <LoadingSpin className="h-full w-full text-pom" />
                )}
              </div>
            )}
            {selected.length > 0 && clearable ? (
              <XMark
                className="h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected([]);
                  onClear ? onClear() : "";
                }}
              />
            ) : (
              ""
            )}
            <ChevronDown className="h-5 w-5 font-extrabold hover:text-gray-600" />
          </div>
        </div>
        <div
          className={
            isOpen
              ? `absolute left-0 !z-50 overflow-y-scroll ${styles?.dropDownItemsContainerClasses ?? "w-full rounded-lg border border-gray-200 bg-white px-3 pb-3 shadow-2xl"}`
              : "hidden"
          }
          style={{
            top: `${(fullContainer?.current?.clientHeight ?? 0) + 5}px`,
            maxHeight: `${styles?.dropDownContainerMaxHeight ?? "200"}px`,
          }}
          onScroll={(e) => handleDataScrolling(e)}
          onTouchMove={(e) => handleDataScrolling(e)}
        >
          <div className={`sticky top-0 bg-inherit`}>
            <input
              className={`${styles?.searchInputClasses ?? "my-2 w-full rounded-md p-1 focus:border-pom focus:outline-pom"}`}
              onClick={(e) => handleClickingOnSearchInput(e)}
              onChange={(e) => handleSearchChange(e)}
              value={search ?? ""}
              name={"search-box"}
              type={"text"}
              placeholder={`${t("search")}`}
              ref={searchInputRef}
            />
          </div>

          {data?.pages?.map((res) => {
            const items = getDataArray
              ? getDataArray(res) ?? []
              : (res.data as TData[]);
            return items?.map((item, index) => (
              <div
                key={index}
                className={` ${
                  include(getOption(item), selected)
                    ? `${styles?.selectedDropDownItemClasses ?? "border-pom bg-pom"}`
                    : ""
                } ${styles?.dropDownItemClasses ?? "my-1 w-full cursor-pointer rounded-md p-2 text-black hover:border-pom hover:bg-pom"}`}
                onClick={(e) => handleChoseItem(e, item)}
              >
                {getOption(item).label ?? ""}
              </div>
            ));
          })}

          {isFetching && (
            <div className="my-2 flex w-full items-center justify-center">
              {t("loading")} ...
            </div>
          )}
        </div>
      </div>
      {validationError && (
        <p className="min-h-5 text-error">{validationError}</p>
      )}
    </div>
  );
}

const include = (option: Option, selected: Option[]): boolean =>
  selected.filter((op) => isEqual(op, option)).length > 0;

export default ApiSelect;
