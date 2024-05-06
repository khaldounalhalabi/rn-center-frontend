import CheckTimeAvailable from "@/hooks/CheckTimeAvailable";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {getNestedPropertyValue} from "@/Helpers/ObjectHelpers";
import Grid from "@/components/common/ui/Grid";

const SelectTimeRange = ({
  data,
  date,
  limit,
}: {
  data: AvailableTime;
  date: string | undefined;
  limit: number;
}) => {
  const {
    setValue,
    formState: { defaultValues },
  } = useFormContext();
  const timRange = limit
    ? CheckTimeAvailable(data, date ?? "", limit)
    : { dayName: "No Data", time: [] };
  const [check, setCheck] = useState<number>();
  const defaultFrom = getNestedPropertyValue(defaultValues , 'from');
  const defaultTo = getNestedPropertyValue(defaultValues , 'to');

  return (
    <div>
      <div className='m-4'>
        {limit ? (
          <>
            <div className="h-8 my-1 flex justify-center items-center">
              <h1>{timRange?.dayName}</h1>
            </div>
            <div className={"flex justify-between flex-wrap gap-y-4"}>
              {!timRange?.time&&defaultFrom && defaultTo ? (
                  <button
                      type={"button"}
                      className={`btn btn-wide bg-pom text-white`}
                  >
                    {defaultFrom}-{defaultTo}
                  </button>
              ):false}
              {timRange?.time.map((e, index) => {
                return (
                  <button
                    type={"button"}
                    key={index}
                    onClick={() => {
                      setCheck(index);
                      setValue("from", e.startTime);
                      setValue("to", e.endTime);
                    }}
                    className={`btn btn-wide ${check == index && "bg-pom text-white"}`}
                  >
                    {e.startTime}-{e.endTime}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div>no Data</div>
        )}
      </div>
    </div>
  );
};

export default SelectTimeRange;
