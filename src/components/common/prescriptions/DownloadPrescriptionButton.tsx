"use client";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import useDownload from "@/hooks/DownloadFile";
import { Prescription } from "@/models/Prescriptions";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const DownloadPrescriptionButton = ({
  prescription,
}: {
  prescription: Prescription;
}) => {
  const { download, isLoading } = useDownload();
  const t = useTranslations("components");
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          type={"button"}
          onClick={() => {
            download(
              `/api/download?method=GET&url=secretary/prescriptions/${prescription?.id}/to-pdf`,
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
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("download")}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DownloadPrescriptionButton;
