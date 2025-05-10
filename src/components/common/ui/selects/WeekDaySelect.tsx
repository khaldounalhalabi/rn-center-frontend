import React, { HTMLProps } from "react";
import { useTranslations } from "next-intl";

const weeKDays = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const WeekDaySelect: React.FC<HTMLProps<HTMLSelectElement>> = ({
  defaultValue,
  ...props
}) => {
  const t = useTranslations("week_days");
  const componentTranslations = useTranslations("components");
  return (
    <select {...props} className={"select w-full"}>
      <option>{componentTranslations("select_day")}</option>
      {weeKDays.map((day) => (
        <option
          value={day}
          key={day}
          selected={!!(defaultValue && defaultValue === day)}
        >
          {t(day.toLowerCase() as any)}
        </option>
      ))}
    </select>
  );
};

export default WeekDaySelect;
