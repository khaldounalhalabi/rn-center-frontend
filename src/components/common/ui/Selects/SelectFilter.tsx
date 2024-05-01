"use client";

const SelectFilter = ({
  data,
  name,
  selected = [],
  isMultiple = false,
  label = undefined,
  onChange,
  setStatus,
  status,
}: {
  data: any[];
  selected?: any[] | any;
  name?: string;
  isMultiple?: boolean;
  label?: string;
  onChange?: any;
  setStatus?: React.Dispatch<string>;
  status?: string;
}) => {
  return (
    <label className={"label flex flex-col w-10/12 items-start"}>
      {label ?? ""}
      <select
        className={"select select-bordered w-full"}
        defaultValue={selected}
        multiple={isMultiple ?? false}
        onChange={onChange ?? false}
      >
        {data.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectFilter;
