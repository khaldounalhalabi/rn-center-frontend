"use client";
import { getRole } from "@/actions/HelperActions";
import DialogPopup from "@/components/common/ui/DialogPopup";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import useDownload from "@/hooks/DownloadFile";
import dayjs from "dayjs";
import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ExportAttendanceButton = () => {
  const { download, isLoading } = useDownload();
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(dayjs().format("YYYY-MM-DD"));
  const [to, setTo] = useState(dayjs().format("YYYY-MM-DD"));
  const t = useTranslations("attendance");
  const compT = useTranslations("components");

  const onClick = () => {
    getRole().then((role) => {
      download(`/api/download?method=GET&url=${role}/attendances/export`, {
        method: "POST",
        fileExtension: "xlsx",
        customFilename: "Employees attendance",
        body: {
          params: {
            from: from,
            to: to,
          },
        },
      }).then(() => {
        setOpen(false);
      });
    });
  };
  return (
    <>
      <DialogPopup
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Datepicker
          onChange={(v) => {
            setFrom(v?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD"));
          }}
          label={t("from")}
          defaultValue={from}
        />

        <Datepicker
          onChange={(v) => {
            setTo(v?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD"));
          }}
          label={t("to")}
          defaultValue={to}
        />

        <div className={"flex items-center justify-between my-5"}>
          <Button
            variant={"destructive"}
            onClick={() => {
              setOpen(false);
            }}
          >
            {compT("cancel")}
          </Button>
          <Button
            onClick={() => {
              onClick();
            }}
          >
            {compT("export")} {isLoading && <LoadingSpin />}
          </Button>
        </div>
      </DialogPopup>
      <Button
        variant={"default"}
        size={"icon"}
        onClick={() => {
          setOpen(true);
        }}
      >
        <DownloadIcon />
      </Button>
    </>
  );
};

export default ExportAttendanceButton;
