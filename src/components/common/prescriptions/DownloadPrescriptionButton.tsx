"use client";
import Tooltip from "@/components/common/ui/Tooltip";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import useDownload from "@/hooks/DownloadFile";
import useUser from "@/hooks/UserHook";
import { Prescription } from "@/models/Prescriptions";
import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const DownloadPrescriptionButton = ({
  prescription,
}: {
  prescription: Prescription;
}) => {
  const { download, isLoading } = useDownload();
  const t = useTranslations("components");
  const { role } = useUser();
  return (
    <Tooltip title={t("download")}>
      <Button
        size={"icon"}
        type={"button"}
        variant={"success"}
        onClick={() => {
          download(
            `/api/download?method=GET&url=${role}/prescriptions/${prescription?.id}/to-pdf`,
            {
              method: "POST",
              fileExtension: "pdf",
              customFilename: `${prescription?.customer?.user?.full_name ?? "Patient"} Prescription`,
            },
          );
        }}
      >
        {isLoading ? <LoadingSpin /> : <DownloadIcon />}
      </Button>
    </Tooltip>
  );
};

export default DownloadPrescriptionButton;
