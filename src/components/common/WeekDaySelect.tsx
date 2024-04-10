import React, { HTMLProps } from "react";

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
  return (
    <select {...props}>
      {weeKDays.map((day) => (
        <option
          value={day}
          key={day}
          selected={!!(defaultValue && defaultValue === day)}
        >
          {day}
        </option>
      ))}
    </select>
  );
};

export default WeekDaySelect;
