"use client";
import AttendanceLog from "@/Models/AttendanceLog";
import AttendanceLogService from "@/services/AttendanceLogService";
import Form from "@/components/common/ui/Form";
import { useEffect, useState } from "react";
import AttendanceLogTypeEnum from "@/enum/AttendanceLogTypeEnum";
import dayjs from "dayjs";
import PlusIcon from "@/components/icons/PlusIcon";
import Trash from "@/components/icons/Trash";
import Timepicker from "@/components/common/ui/TimePicker";

const AttendanceForm = ({
  attendances = [],
  date,
  userId,
  setClose,
}: {
  attendances?: AttendanceLog[];
  date: string;
  userId: number;
  setClose: () => void;
}) => {
  const handleSubmit = async (data: any) => {
    data = { ...data, attendance_at: date };
    return AttendanceLogService.make().editOrCreateUserAttendance(userId, data);
  };

  const extractLogs = (data: AttendanceLog[]) => {
    let logs: {
      attend_from: string | undefined;
      attend_to: string | undefined;
    }[] = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i]?.type == AttendanceLogTypeEnum.CHECKIN &&
        data[i + 1]?.type == AttendanceLogTypeEnum.CHECKOUT
      ) {
        logs.push({
          attend_from: dayjs(data[i]?.attend_at).format("HH:mm"),
          attend_to: dayjs(data[i + 1]?.attend_at).format("HH:mm"),
        });
      }
    }

    return logs;
  };

  const logs = extractLogs(attendances);

  const [fields, setFields] = useState<
    {
      attend_from: string | undefined;
      attend_to: string | undefined;
    }[]
  >(
    logs.length > 0 ? logs : [{ attend_from: undefined, attend_to: undefined }],
  );

  useEffect(() => {
    setFields(extractLogs(attendances));
  });

  const addField = () => {
    setFields((prevState) => [
      ...prevState,
      { attend_from: undefined, attend_to: undefined },
    ]);
  };

  const removeField = (index: number) => {
    fields.splice(index, 1);
    setFields([...fields]);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={() => {
        setClose();
      }}
    >
      {fields?.map((inputs, index) => (
        <div
          className={"flex items-center gap-10 justify-between w-full"}
          key={index}
        >
          <Timepicker
            name={`attendance_shifts[${index}][attend_from]`}
            label={"From"}
            df={inputs.attend_from ?? dayjs().format("HH:mm")}
          />
          <Timepicker
            name={`attendance_shifts[${index}][attend_to]`}
            label={"To"}
            df={inputs.attend_to ?? dayjs().format("HH:mm")}
          />
          <button className={"btn btn-square"} type={"button"}>
            <Trash
              onClick={() => {
                removeField(index);
              }}
              className={"w-6 h-6 text-error"}
            />
          </button>
        </div>
      ))}
      <div className={"flex justify-end items-center"}>
        <button
          className={"btn btn-sm btn-square"}
          type={"button"}
          onClick={() => {
            addField();
          }}
        >
          <PlusIcon />
        </button>
      </div>
    </Form>
  );
};

export default AttendanceForm;
