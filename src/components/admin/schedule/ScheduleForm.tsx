"use client";
import { ChangeEvent, useState } from "react";
import PageCard from "@/components/common/ui/PageCard";
import Trash from "@/components/icons/Trash";
import dayjs from "dayjs";
import { Schedule, SchedulesCollection } from "@/models/Schedule";
import Form from "@/components/common/ui/Form";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { ScheduleService } from "@/services/ScheduleService";
import { Navigate } from "@/actions/Navigate";
import { useTranslations } from "next-intl";
import Grid from "@/components/common/ui/Grid";
import plugin from "dayjs/plugin/isSameOrBefore";
import { getEnumValues } from "@/helpers/Enums";
import WeekDayEnum from "@/enums/WeekDayEnum";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Copy, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import Tooltip from "@/components/common/ui/Tooltip";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";

dayjs.extend(plugin);

function SlotInput(props: {
  timeRange: Schedule;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange1: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  index: number;
}) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div className="my-1 grid grid-cols-3 gap-5 w-full">
      <div className={"w-full"}>
        <Input
          value={props.timeRange.start_time ?? dayjs().format("HH:mm")}
          onChange={props.onChange}
          type={"time"}
        />
        <ErrorMessage
          name={`schedules.${props.index}.start_time`}
          errors={errors}
          render={({ message }) => (
            <p className={"text-destructive text-sm"}>{message}</p>
          )}
        />
      </div>
      <div className={"w-full"}>
        <Input
          value={props.timeRange.end_time ?? dayjs().format("HH:mm")}
          onChange={props.onChange1}
          type={"time"}
        />
        <ErrorMessage
          name={`schedules.${props.index}.end_time`}
          errors={errors}
          render={({ message }) => (
            <p className={"text-destructive text-sm"}>{message}</p>
          )}
        />
      </div>
      <Button
        type="button"
        onClick={props.onClick}
        variant={"destructive"}
        size={"icon"}
      >
        <Trash />
      </Button>
    </div>
  );
}

const ClinicScheduleForm = ({
  method,
  defaultValues,
  clinic_id = undefined,
  user_id = undefined,
}: {
  method: "store" | "update";
  defaultValues?: SchedulesCollection;
  clinic_id?: number;
  user_id?: number;
}) => {
  const [schedule, setSchedule] = useState<SchedulesCollection>({
    saturday:
      defaultValues?.saturday || method == "update"
        ? defaultValues?.saturday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    sunday:
      defaultValues?.sunday || method == "update"
        ? defaultValues?.sunday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    monday:
      defaultValues?.monday || method == "update"
        ? defaultValues?.monday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    tuesday:
      defaultValues?.tuesday || method == "update"
        ? defaultValues?.tuesday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    wednesday:
      defaultValues?.wednesday || method == "update"
        ? defaultValues?.wednesday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    thursday:
      defaultValues?.thursday || method == "update"
        ? defaultValues?.thursday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    friday:
      defaultValues?.friday || method == "update"
        ? defaultValues?.friday ?? []
        : [
            {
              start_time: dayjs("09:00").format("HH:mm"),
              end_time: dayjs("21:00").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
  });

  const handleAddTimeRange = (day: WeekDayEnum) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [
        ...prevSchedule[day],
        {
          start_time: dayjs().format("HH:mm"),
          end_time: dayjs().format("HH:mm"),
        },
      ],
    }));
  };

  const handleRemoveTimeRange = (day: WeekDayEnum, index: number) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].filter((_, i: number) => i !== index),
    }));
  };

  const handleChangeTimeRange = (
    day: WeekDayEnum,
    index: number,
    time: string,
    timeType: "start_time" | "end_time",
  ) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].map((timeRange, i) =>
        i === index ? { ...timeRange, [timeType]: time } : timeRange,
      ),
    }));
  };

  const handleCopySchedule = (fromDay: WeekDayEnum, toDay: WeekDayEnum) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [toDay]: prevSchedule[fromDay],
    }));
  };
  const onSubmit = async (data: {
    clinic_id?: number;
    user_id?: number;
    schedules?: { start_time: string; end_time: string; day_of_week: string }[];
  }) => {
    if (clinic_id) {
      data.clinic_id = clinic_id;
    } else {
      data.user_id = user_id;
    }
    data.schedules = [];
    Object.entries(schedule).map((value) => {
      // @ts-ignore
      value[1].map(
        (item: {
          start_time: string;
          end_time: string;
          day_of_week: string;
        }) => {
          data.schedules?.push({
            start_time: item.start_time,
            end_time: item.end_time,
            day_of_week: value[0] as string,
          });
        },
      );
    });

    return await ScheduleService.make().store(data);
  };
  const t = useTranslations("admin.schedules.create");
  return (
    <PageCard>
      <Form
        handleSubmit={onSubmit}
        onSuccess={() => {
          if (clinic_id) {
            Navigate(`/admin/clinics`);
          } else {
            Navigate(`/admin/secretaries`);
          }
        }}
      >
        <Grid md={2}>
          <FormInput
            required={true}
            name={"clinic_id"}
            type={"number"}
            defaultValue={clinic_id}
            className={"hidden"}
            hidden={true}
          />

          <FormInput
            required={true}
            name={"user_id"}
            type={"number"}
            defaultValue={user_id}
            className={"hidden"}
            hidden={true}
          />
        </Grid>
        {getEnumValues(WeekDayEnum).map((day, dayIndex) => (
          <div
            key={day}
            className="flex items-center justify-between border-b border-b-foreground"
          >
            <div className="p-3 w-full">
              <h2>
                <TranslatableEnum value={day} />
              </h2>
              {schedule[day].map((timeRange, index) => (
                <SlotInput
                  key={index}
                  timeRange={timeRange}
                  onChange={(event) =>
                    handleChangeTimeRange(
                      day,
                      index,
                      event?.target?.value ?? "",
                      "start_time",
                    )
                  }
                  onChange1={(event) =>
                    handleChangeTimeRange(
                      day,
                      index,
                      event?.target?.value ?? "",
                      "end_time",
                    )
                  }
                  onClick={() => handleRemoveTimeRange(day, index)}
                  index={
                    index + dayIndex + (index == 0 && dayIndex != 0 ? 1 : 0)
                  }
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Tooltip title={t("add_slot")}>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  type="button"
                  onClick={() => handleAddTimeRange(day)}
                >
                  <Plus />
                </Button>
              </Tooltip>
              <Popover>
                <PopoverTrigger>
                  <Tooltip title={t("copy_day_schedule")}>
                    <Button variant={"secondary"} size={"icon"} type={"button"}>
                      <Copy />
                    </Button>
                  </Tooltip>
                </PopoverTrigger>
                <PopoverContent className={"max-w-52"}>
                  <div className="flex flex-col">
                    {getEnumValues(WeekDayEnum).map((d, index) => (
                      <div
                        className="flex items-center justify-between p-2"
                        key={index}
                      >
                        {d}
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={() => {
                            handleCopySchedule(day, d);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </Form>
    </PageCard>
  );
};

export default ClinicScheduleForm;
