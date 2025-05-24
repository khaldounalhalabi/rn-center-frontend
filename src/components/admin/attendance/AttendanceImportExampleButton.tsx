"use client";
import React from "react";
import { Button } from "@/components/ui/shadcn/button";
import { useTranslations } from "next-intl";
import useDownload from "@/hooks/DownloadFile";
import LoadingSpin from "@/components/icons/LoadingSpin";

const AttendanceImportExampleButton = () => {
  const t = useTranslations("components");
  const {download , isLoading} = useDownload();
  return (
    <Button variant={"outline"} onClick={()=>{
      download('/api/download?method=GET&url=admin/attendances/import-example', {
        method:"POST",
        fileExtension:"xlsx",
        customFilename:"Attendance Import Example"
      })
    }}>
      {t("import_example")}

      {isLoading && (<LoadingSpin />)}
    </Button>
  );
};

export default AttendanceImportExampleButton;