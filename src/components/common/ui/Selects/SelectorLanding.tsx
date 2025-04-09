"use client";
import React, { useEffect, useRef, useState } from "react";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { CityService } from "@/services/CityService";
import { City } from "@/Models/City";

const SelectorLanding = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpen);
  }, []);
  const [city, setCity] = useState({ id: 0, name: "" });
  const {
    formState: { errors },
    setValue,
  } = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: ["city"],
    queryFn: async () => {
      return CityService.make<CityService>().getAllCities();
    },
  });
  const res: City[] = data?.data ? data?.data : [{ id: 0, name: "" }];

  return (
    <div className={` relative z-0`}>
      <input
        id={name}
        onClick={() => {
          setOpen(!open);
        }}
        className="block kodchasan py-2.5 px-0 w-full   bg-transparent border-0 border-b-2 border-[#c1d5df] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1FB8B9]  peer"
        placeholder={" "}
        defaultValue={TranslateClient(city?.name)}
      />
      <label
        htmlFor={name}
        className={
          `kodchasan  absolute   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0` +
          " peer-focus:text-[#2e5b83]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0" +
          ` peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`
        }
      >
        City
      </label>
      <div
        ref={ref}
        className={` h-36  shadow-xl overflow-y-scroll ${open ? "flex" : "hidden"} w-full gap-4 flex-col absolute  bottom-0 left-0 bg-white translate-y-[90%] z-50`}
      >
        {res?.map((city, index) => (
          <p
            key={index}
            className={
              "hover:bg-[#1fb8b9] hover:text-white p-1 cursor-pointer "
            }
            onClick={() => {
              setCity(city);
              setValue(name, city?.id);
              setOpen(!open);
            }}
          >
            {TranslateClient(city.name)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectorLanding;
