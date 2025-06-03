import Alert from "@/components/common/ui/Alert";
import Tooltip from "@/components/common/ui/Tooltip";
import Eye from "@/components/icons/Eye";
import LoadingSpin from "@/components/icons/LoadingSpin";
import Pencil from "@/components/icons/Pencil";
import Trash from "@/components/icons/Trash";
import { Button } from "@/components/ui/shadcn/button";
import { ApiResponse } from "@/http/Response";
import { Link } from "@/navigation";
import { BaseService } from "@/services/BaseService";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";

export type Buttons = "delete" | "edit" | "archive" | "show" | "logs";

export interface ActionsButtonsProps<T> {
  data?: T;
  id?: number | string;
  buttons: Buttons[];
  children?: React.JSX.Element | undefined | React.ReactNode;
  baseUrl: string;
  deleteUrl?: string;
  editUrl?: string;
  archiveUrl?: string;
  showUrl?: string;
  setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void;
  deleteMessage?: string;
  deleteHandler?: (response: ApiResponse<any>) => void;
  reverse?: boolean;
}

const ActionsButtons: React.FC<ActionsButtonsProps<any>> = ({
  data,
  id,
  buttons,
  baseUrl,
  deleteUrl,
  showUrl,
  editUrl,
  setHidden,
  children,
  deleteMessage,
  deleteHandler = undefined,
  reverse = false,
}) => {
  const t = useTranslations("components");
  const dataId = id ?? data?.id ?? undefined;
  const dUrl = deleteUrl ?? `${baseUrl}/${dataId ?? ""}`; // delete url
  const sUrl = showUrl ?? `${baseUrl}/${dataId ?? ""}`; // show url
  const eUrl = editUrl ?? `${baseUrl}/${dataId ?? ""}/edit` + ""; // edit url
  const [isDeleting, setDeleting] = useState(false);

  return (
    <div className={`flex items-center ${reverse && "flex-row-reverse"} gap-1`}>
      {buttons.includes("show") && (
        <Tooltip title={t("show_record")}>
          <Link href={sUrl}>
            <Button size={"icon"}>
              <Eye />
            </Button>
          </Link>
        </Tooltip>
      )}
      {buttons.includes("edit") && (
        <Tooltip title={t("edit_record")}>
          <Link href={eUrl}>
            <Button size={"icon"} variant={"secondary"}>
              <Pencil />
            </Button>
          </Link>
        </Tooltip>
      )}
      {buttons.includes("delete") && (
        <Alert
          trigger={
            <Button size={"icon"} variant={"destructive"}>
              {isDeleting ? <LoadingSpin /> : <Trash />}
            </Button>
          }
          onConfirm={() => {
            if (dataId) {
              setDeleting(true);
              BaseService<any, any>()
                .make()
                .setBaseUrl(dUrl)
                .delete()
                .then((response: ApiResponse<any>) => {
                  toast(t("deleted"), {
                    description: response.message as string,
                  });

                  if (setHidden) {
                    setHidden((prevState) => [dataId, ...prevState]);
                  }

                  if (deleteHandler) {
                    deleteHandler(response);
                  }
                  setDeleting(false);
                })
                .catch(() => toast(t("errored")));
            } else {
              toast(t("didnt_delete"));
            }
          }}
          onDeny={() => {
            toast(t("didnt_delete"));
          }}
          title={deleteMessage ?? t("delete_question")}
        />
      )}
      {children}
    </div>
  );
};

export default ActionsButtons;
