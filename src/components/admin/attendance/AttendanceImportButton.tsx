"use client";
import React, { useState } from "react";
import AttendanceLogService from "@/services/AttendanceLogService";
import DialogPopup from "@/components/common/ui/DialogPopup";
import { Button } from "@/components/ui/shadcn/button";
import { UploadIcon } from "lucide-react";
import Form from "@/components/common/ui/Form";
import { useTranslations } from "next-intl";
import ImageUploader from "@/components/common/ui/images/ImageUploader";

const AttendanceImportButton = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("components");
  const onSubmit = (data: any) => {
    return AttendanceLogService.make().import(data);
  };
  return (
    <>
      <DialogPopup
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Form
          handleSubmit={onSubmit}
          buttonText={t("import")}
          onCancel={() => {
            setOpen(false);
          }}
          onSuccess={() => {
            setOpen(false);
          }}
        >
          <ImageUploader
            name={"excel_file"}
            acceptedFileTypes={[
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ]}
          />
        </Form>
      </DialogPopup>
      <Button
        variant={"secondary"}
        size={"icon"}
        onClick={() => {
          setOpen(true);
        }}
      >
        <UploadIcon />
      </Button>
    </>
  );
};

export default AttendanceImportButton;
