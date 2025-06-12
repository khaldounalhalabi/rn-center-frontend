"use client";
import Payrun from "@/models/Payrun";
import React, { useState } from "react";
import PayrunService from "@/services/PayrunService";
import { toast } from "sonner";
import { Button } from "@/components/ui/shadcn/button";
import { RefreshCcw } from "lucide-react";
import Tooltip from "@/components/common/ui/Tooltip";
import { useTranslations } from "next-intl";

const ReprocessPayrunButton = ({
  revalidate,
  payrun,
}: {
  payrun?: Payrun;
  revalidate?: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);
  const t = useTranslations("payruns")
  const handleClick = () => {
  setLoading(true);
    PayrunService.make()
      .reprocessPayrun(payrun?.id ?? 0)
      .then((res) => {
        setLoading(false);
        toast.success(res.message as string);
        if (revalidate) {
          revalidate();
        }
      });
  };
  return (
    <Tooltip title={t("reprocess")}>
      <Button variant={"outline"} size={"icon"} onClick={handleClick}>
        <RefreshCcw className={isLoading ? "animate-spin" : ""} />
      </Button>
    </Tooltip>
  );
};

export default ReprocessPayrunButton;
