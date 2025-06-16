"use client";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import useDownload from "@/hooks/DownloadFile";
import { useTranslations } from "next-intl";

const AttendanceImportExampleButton = ({ role }: { role: RoleEnum }) => {
  const t = useTranslations("components");
  const { download, isLoading } = useDownload();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        download(
          `/api/download?method=GET&url=${role}/attendances/import-example`,
          {
            method: "POST",
            fileExtension: "xlsx",
            customFilename: "Attendance Import Example",
          },
        );
      }}
    >
      {t("import_example")}

      {isLoading && <LoadingSpin />}
    </Button>
  );
};

export default AttendanceImportExampleButton;
