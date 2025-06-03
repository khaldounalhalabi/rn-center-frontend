"use client";
import DownloadIcon from "@/components/icons/DownloadIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import useDownload from "@/hooks/DownloadFile";
import useUser from "@/hooks/UserHook";
import { Customer } from "@/models/Customer";

const DownloadPatientReportButton = ({ patient }: { patient?: Customer }) => {
  const { role } = useUser();
  const { download, isLoading } = useDownload();
  const onClick = () => {
    if (patient) {
      download(
        `/api/download?method=GET&url=${role}/customers/${patient?.id}/pdf-report`,
        {
          method: "POST",
          fileExtension: "pdf",
          customFilename: `${patient?.user?.full_name} Report`,
        },
      );
    }
  };
  return (
    <Button
      disabled={!role || role == RoleEnum.PUBLIC}
      type={"button"}
      variant={"success"}
      onClick={onClick}
      size={"icon"}
    >
      {isLoading ? <LoadingSpin /> : <DownloadIcon />}
    </Button>
  );
};

export default DownloadPatientReportButton;
