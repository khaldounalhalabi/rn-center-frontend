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
    const formData = { ...data, attendance_at: date };
    console.log(formData);
    return AttendanceLogService.make().editOrCreateUserAttendance(userId, formData);
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

  let logs = extractLogs(attendances);
  logs =  logs.length > 0
    ? logs
    : [
      {
        attend_from: dayjs().format("HH:mm"),
        attend_to: dayjs().format("HH:mm"),
      },
    ];

  const [fields, setFields] = useState<
    {
      attend_from: string | undefined;
      attend_to: string | undefined;
    }[]
  >(
    logs.length > 0
      ? logs
      : [
          {
            attend_from: dayjs().format("HH:mm"),
            attend_to: dayjs().format("HH:mm"),
          },
        ],
  );

  useEffect(() => {
    setFields(extractLogs(attendances));
  }, []);

  const addField = () => {
    setFields((prevState) => [
      ...prevState,
      { attend_from: undefined, attend_to: undefined },
    ]);
  };

  const removeField = (index: number) => {
    if (index === 1) {
      setFields([]);
      return;
    }
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const onSuccess = async () => {
    setClose();
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={logs}
    >
      {fields?.map((inputs, index) => (
        <div
          className={"flex items-center gap-10 justify-between w-full"}
          key={index}
        >
          <Timepicker
            name={`attendance_shifts.${index}.attend_from`}
            label={"From"}
            df={inputs.attend_from}
          />
          <Timepicker
            name={`attendance_shifts.${index}.attend_to`}
            label={"To"}
            df={inputs.attend_to}
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
