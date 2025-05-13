"use client";
import AttendanceLog from "@/models/AttendanceLog";
import AttendanceLogService from "@/services/AttendanceLogService";
import Form from "@/components/common/ui/Form";
import { useEffect, useState } from "react";
import AttendanceLogTypeEnum from "@/enums/AttendanceLogTypeEnum";
import dayjs from "dayjs";
import Trash from "@/components/icons/Trash";
import FormTimePicker from "@/components/common/ui/date-time-pickers/FormTimePicker";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("attendance");
  const handleSubmit = async (data: any) => {
    const formData = { ...data, attendance_at: date };
    console.log(formData);
    return AttendanceLogService.make().editOrCreateUserAttendance(
      userId,
      formData,
    );
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
  logs =
    logs.length > 0
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
          className={"flex w-full items-center justify-between gap-10"}
          key={index}
        >
          <FormTimePicker
            name={`attendance_shifts.${index}.attend_from`}
            label={t("from")}
            df={inputs.attend_from}
          />
          <FormTimePicker
            name={`attendance_shifts.${index}.attend_to`}
            label={t("to")}
            df={inputs.attend_to}
          />
          <button className={"btn btn-square"} type={"button"}>
            <Trash
              onClick={() => {
                removeField(index);
              }}
              className={"h-6 w-6 text-destructive"}
            />
          </button>
        </div>
      ))}
      <div className={"my-5 flex items-center justify-end"}>
        <button
          className={"btn btn-sm"}
          type={"button"}
          onClick={() => {
            addField();
          }}
        >
          {t("add_slot")}
        </button>
      </div>
    </Form>
  );
};

export default AttendanceForm;
