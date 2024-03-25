"use client";
import { useFormContext } from "react-hook-form";
import "./select.css";
import dynamic from "next/dynamic";

const cities = [
  {
    label: "بغداد",
    value: "بغداد",
  },
  {
    label: "نينوى",
    value: "نينوى",
  },
  {
    label: "البصرة",
    value: "البصرة",
  },
  {
    label: "صلاح الدين",
    value: "صلاح الدين",
  },
  {
    label: "دهوك",
    value: "دهوك",
  },
  {
    label: "اربيل",
    value: "اربيل",
  },
  {
    label: "السليمانية",
    value: "السليمانية",
  },
  {
    label: "واسط",
    value: "واسط",
  },
  {
    label: "ميسان",
    value: "ميسان",
  },
  {
    label: "ذي قار",
    value: "ذي قار",
  },
  {
    label: "المثنى",
    value: "المثنى",
  },
  {
    label: "بابل",
    value: "بابل",
  },
  {
    label: "كربلاء",
    value: "كربلاء",
  },
  {
    label: "النجف",
    value: "النجف",
  },
  {
    label: "الانبار",
    value: "الانبار",
  },
  {
    label: "القادسية",
    value: "القادسية",
  },
  {
    label: "كركوك",
    value: "كركوك",
  },
];
const SelectCity = ({ name }: { name: string }) => {
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const { register, setValue } = useFormContext();

  return (
    <>
      <input className={"hidden"} {...register(name)} hidden={true} />
      <Select
        id={Date.now().toString()}
        className="react-select-container"
        classNamePrefix="react-select"
        options={cities}
        isClearable={true}
        // @ts-ignore
        onChange={(newValue) => setValue(name, newValue?.value)}
      />
    </>
  );
};

export default SelectCity;
