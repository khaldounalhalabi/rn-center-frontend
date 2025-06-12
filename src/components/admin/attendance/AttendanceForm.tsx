"use client";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Trash from "@/components/icons/Trash";
import { Button } from "@/components/ui/shadcn/button";
import AttendanceLogTypeEnum from "@/enums/AttendanceLogTypeEnum";
import AttendanceLog from "@/models/AttendanceLog";
import AttendanceLogService from "@/services/AttendanceLogService";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const AttendanceForm = ({
  attendances = [],
  date,
  userId,
  onSuccess = undefined,
}: {
  attendances?: AttendanceLog[];
  date: string;
  userId: number;
  onSuccess?: () => void | Promise<void>;
}) => {
  const t = useTranslations("attendance");
  const handleSubmit = async (data: any) => {
    const formData = { ...data, attendance_at: date };
    if (fields.length == 0) {
      formData.attendance_shifts = [];
    }
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

    return logs.length > 0
      ? logs
      : [
          {
            attend_from: dayjs().format("HH:mm"),
            attend_to: dayjs().format("HH:mm"),
          },
        ];
  };

  let logs = extractLogs(attendances);

  const [fields, setFields] = useState<
    {
      attend_from: string | undefined;
      attend_to: string | undefined;
    }[]
  >(logs);

  useEffect(() => {
    setFields(extractLogs(attendances));
  }, []);

  const addField = () => {
    setFields((prevState) => [
      ...prevState,
      {
        attend_from: dayjs().format("HH:mm"),
        attend_to: dayjs().format("HH:mm"),
      },
    ]);
  };

  const removeField = (index: number) => {
    let newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      defaultValues={{ attendance_at: date, attendance_shifts: fields }}
      onSuccess={async () => {
        if (onSuccess) {
          await onSuccess();
        }
      }}
    >
      {fields?.map((inputs, index) => (
        <Grid
          key={index}
          cols={3}
          gap={5}
          md={3}
          className={"justify-between items-start"}
        >
          <FormInput
            name={`attendance_shifts.${index}.attend_from`}
            label={t("from")}
            defaultValue={inputs.attend_from}
            type={"time"}
          />
          <FormInput
            name={`attendance_shifts.${index}.attend_to`}
            label={t("to")}
            defaultValue={inputs.attend_to}
            type={"time"}
          />
          <Button
            className={"self-end"}
            variant={"destructive"}
            type={"button"}
            size={"icon"}
            onClick={() => {
              removeField(index);
            }}
          >
            <Trash />
          </Button>
        </Grid>
      ))}
      <div className={"my-5 flex items-center justify-end"}>
        <Button
          type={"button"}
          variant={"secondary"}
          onClick={() => {
            addField();
          }}
        >
          {t("add_slot")}
        </Button>
      </div>
    </Form>
  );
};

export default AttendanceForm;
