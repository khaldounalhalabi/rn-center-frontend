"use client";
import DialogPopup from "@/components/common/ui/DialogPopup";
import Form from "@/components/common/ui/Form";
import ImageUploader from "@/components/common/ui/images/ImageUploader";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import AttendanceLogService from "@/services/AttendanceLogService";
import { UploadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const AttendanceImportButton = ({ role }: { role: RoleEnum }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("components");
  const onSubmit = (data: any) => {
    return AttendanceLogService.make(role).import(data);
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
