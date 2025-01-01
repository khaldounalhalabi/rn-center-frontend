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
  return (
    <select {...props}>
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
