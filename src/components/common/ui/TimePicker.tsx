"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";

const TimePicker = ({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string | undefined;
}) => {
  const { setValue } = useFormContext();
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [date, setDate] = useState("AM");
  const [showMt, setShowMt] = useState(true);
  const [showAllDate, setShowAllDate] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setShowAllDate);
  }, []);
  const handleSetHour = (value: string) => {
    setHour(value);
    setShowMt(false);
  };
  const handleSetMinute = (value: string) => {
    setMinute(value);
  };

  const handleSaveDate = () => {
    const dateNew = `${hour}:${minute} ${date}`;
    setValue(name, dateNew);
    setShowAllDate(false);
  };
   const defaultTime = defaultValue? defaultValue.split(':'):''
  return (
    <div>
      <Input
        name="test"
        type="text"
        defaultValue={
          hour == "00" && minute == "00"
            ? defaultValue
              ? defaultValue
              : `${hour}:${minute} ${date}`
            : `${hour}:${minute} ${date}`
        }
        onClick={() => {
          setShowAllDate(true);
        }}
      />
      <div
        ref={ref}
        className={`h-86 w-56 shadow-lg z-10 absolute shadow-gray-500 ${showAllDate ? "block" : "hidden"}`}
      >
        <div className="h-16  w-56  flex justify-center items-center bg-white">
          <h2 className="text-2xl w-full ml-11 flex">
            <input
              className={`cursor-pointer text-end focus:outline-0 w-16 font-bold ${showMt ? "text-blue-300" : "text-gray-600"}`}
              onClick={() => setShowMt(true)}
              onChange={(e)=>setHour(e.target.value)}

              defaultValue={defaultTime?defaultTime[0]:hour}
            />

            :
            <input
              className={`cursor-pointer  w-16 focus:outline-0 font-bold ${showMt ? "text-gray-600" : "text-blue-300"} mr-2`}
              onClick={() => setShowMt(false)}
              onChange={(e)=>setMinute(e.target.value)}
              defaultValue={defaultTime?defaultTime[1]:minute}

            />

            <span className={` font-bold  w-16  text-lg`}>{date}</span>
          </h2>
        </div>
        <div className="bg-gray-200 h-56 flex justify-center items-end">
          <div
            className={`w-52 h-52  rounded-full overflow-hidden  bg-white relative ${showMt ? "block" : "hidden"}`}
            style={{
              backgroundImage:
                "url(https://dc594.4shared.com/img/DExkxCo3fa/s24/18efd85d3f0/7617477db1e3a9f43335813d653ce7?async&rand=0.5551264449922271)",
              backgroundSize: "cover",
            }}
          >
            <span
              onClick={() => handleSetHour("01")}
              className="absolute top-[calc(16.66666666%-12px)] right-[25%]  w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer "
            >
              1
            </span>
            <span
              onClick={() => handleSetHour("02")}
              className="absolute top-[calc(33.333333%-20px)] right-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              2
            </span>
            <span
              onClick={() => handleSetHour("03")}
              className="absolute top-[calc(50%-12px)] right-[7%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              3
            </span>
            <span
              onClick={() => handleSetHour("04")}
              className="absolute bottom-[calc(33.333333%-20px)] right-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              4
            </span>
            <span
              onClick={() => handleSetHour("05")}
              className="absolute bottom-[calc(16.66666666%-12px)] right-[25%]  w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              5
            </span>
            <span
              onClick={() => handleSetHour("06")}
              className="absolute w-[24px] bottom-[5%] right-[calc(50%-12px)] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              6
            </span>
            <span
              onClick={() => handleSetHour("07")}
              className="absolute bottom-[calc(16.66666666%-12px)] left-[25%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              7
            </span>
            <span
              onClick={() => handleSetHour("08")}
              className="absolute bottom-[calc(33.333333%-20px)] left-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              8
            </span>
            <span
              onClick={() => handleSetHour("09")}
              className="absolute top-[calc(50%-12px)] left-[7%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              9
            </span>
            <span
              onClick={() => handleSetHour("10")}
              className="absolute top-[calc(33.333333%-20px)] left-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              10
            </span>
            <span
              onClick={() => handleSetHour("11")}
              className="absolute top-[calc(16.66666666%-12px)] left-[25%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              11
            </span>
            <span
              onClick={() => handleSetHour("12")}
              className="absolute w-[24px] top-[5%] right-[calc(50%-12px)] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              12
            </span>
            <span className="absolute w-[24px] h-[24px] top-[calc(50%-24px)]  left-[50%] text-2xl">
              .
            </span>
          </div>
          <div
            className={`w-52 h-52  rounded-full overflow-hidden  bg-white relative ${showMt ? "hidden" : "block"}`}
            style={{
              backgroundImage:
                "url(https://dc594.4shared.com/img/DExkxCo3fa/s24/18efd85d3f0/7617477db1e3a9f43335813d653ce7?async&rand=0.5551264449922271)",
              backgroundSize: "cover",
            }}
          >
            <span
              onClick={() => handleSetMinute("05")}
              className="absolute top-[calc(16.66666666%-12px)] right-[25%]  w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer "
            >
              5
            </span>
            <span
              onClick={() => handleSetMinute("10")}
              className="absolute top-[calc(33.333333%-20px)] right-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              10
            </span>
            <span
              onClick={() => handleSetMinute("15")}
              className="absolute top-[calc(50%-12px)] right-[7%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              15
            </span>
            <span
              onClick={() => handleSetMinute("20")}
              className="absolute bottom-[calc(33.333333%-20px)] right-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              20
            </span>
            <span
              onClick={() => handleSetMinute("25")}
              className="absolute bottom-[calc(16.66666666%-12px)] right-[25%]  w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              25
            </span>
            <span
              onClick={() => handleSetMinute("30")}
              className="absolute w-[24px] bottom-[5%] right-[calc(50%-12px)] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              30
            </span>
            <span
              onClick={() => handleSetMinute("35")}
              className="absolute bottom-[calc(16.66666666%-12px)] left-[25%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              35
            </span>
            <span
              onClick={() => handleSetMinute("40")}
              className="absolute bottom-[calc(33.333333%-20px)] left-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              40
            </span>
            <span
              onClick={() => handleSetMinute("45")}
              className="absolute top-[calc(50%-12px)] left-[7%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              45
            </span>
            <span
              onClick={() => handleSetMinute("50")}
              className="absolute top-[calc(33.333333%-20px)] left-[12%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              50
            </span>
            <span
              onClick={() => handleSetMinute("55")}
              className="absolute top-[calc(16.66666666%-12px)] left-[25%] w-[24px] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              55
            </span>
            <span
              onClick={() => handleSetMinute("00")}
              className="absolute w-[24px] top-[5%] right-[calc(50%-12px)] hover:bg-blue-300 rounded-full text-center cursor-pointer"
            >
              00
            </span>
            <span className="absolute w-[24px] h-[24px] top-[calc(50%-24px)]  left-[50%] text-2xl">
              .
            </span>
          </div>
        </div>
        <div className="flex h-12 pb-3 justify-between items-center px-5 bg-gray-200">
          <span
            onClick={() => setDate("AM")}
            className={`w-9 h-9 cursor-pointer hover:bg-blue-300 text-gray-600 rounded-full text-center pt-[6px] ${date == "AM" ? "bg-blue-300" : "bg-white"}`}
          >
            AM
          </span>
          <span
            onClick={() => setDate("PM")}
            className={`w-9 h-9 cursor-pointer hover:bg-blue-300 text-gray-600 rounded-full text-center pt-[6px] ${date == "PM" ? "bg-blue-300" : "bg-white"}`}
          >
            PM
          </span>
        </div>
        <div className="bg-gray-200 h-12 flex justify-center items-center border-t-2 border-gray-400 text-sm">
          <span
            className="cursor-pointer hover:text-blue-300"
            onClick={handleSaveDate}
          >
            DONE
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
