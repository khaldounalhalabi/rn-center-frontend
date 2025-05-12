import { Link } from "@/navigation";
import Eye from "@/components/icons/Eye";
import Pencil from "@/components/icons/Pencil";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import React from "react";
import { swal } from "@/helpers/UIHelpers";
import { BaseService } from "@/services/BaseService";
import Trash from "@/components/icons/Trash";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { ApiResponse } from "@/http/Response";
import { Button } from "@/components/ui/shadcn/button";

export type Buttons = "delete" | "edit" | "archive" | "show" | "logs";

export interface ActionsButtonsProps<T> {
  data?: T;
  id?: number | string;
  buttons: Buttons[];
  children?: React.JSX.Element | undefined;
  baseUrl: string;
  deleteUrl?: string;
  editUrl?: string;
  archiveUrl?: string;
  showUrl?: string;
  setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void;
  deleteMessage?: string;
  deleteHandler?: (response: ApiResponse<any>) => void;
}

const ActionsButtons: React.FC<ActionsButtonsProps<any>> = ({
  data,
  id,
  buttons,
  baseUrl,
  deleteUrl,
  showUrl,
  editUrl,
  archiveUrl,
  setHidden,
  children,
  deleteMessage,
  deleteHandler = undefined,
}) => {
  const t = useTranslations("components");
  const dataId = id ?? data?.id ?? undefined;
  const dUrl = deleteUrl ?? `${baseUrl}/${dataId ?? ""}`; // delete url
  const sUrl = showUrl ?? `${baseUrl}/${dataId ?? ""}`; // show url
  const eUrl = editUrl ?? `${baseUrl}/${dataId ?? ""}/edit` + ""; // edit url
  const aUrl = archiveUrl ?? `${baseUrl}/${dataId ?? ""}`; // archive url

  return (
    <div className={`flex items-center justify-between gap-1`}>
      {buttons.includes("show") ? (
        <Link href={sUrl}>
          <Button size={"icon"}>
            <Eye />
          </Button>
        </Link>
      ) : (
        ""
      )}
      {buttons.includes("edit") ? (
        <Link href={eUrl}>
          <Button size={"icon"} variant={"secondary"}>
            <Pencil />
          </Button>
        </Link>
      ) : (
        ""
      )}
      {buttons.includes("delete") ? (
        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => {
            swal
              .fire({
                title: deleteMessage ?? t("delete_question"),
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: t("yes"),
                denyButtonText: t("no"),
                cancelButtonText: t("cancel"),
                confirmButtonColor: "#007BFF",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  if (dataId) {
                    BaseService<any, any>()
                      .make()
                      .setBaseUrl(dUrl)
                      .delete()
                      .then((response: ApiResponse<any>) => {
                        toast.success(t("deleted"));

                        if (setHidden) {
                          setHidden((prevState) => [dataId, ...prevState]);
                        }

                        if (deleteHandler) {
                          deleteHandler(response);
                        }
                      })
                      .catch(() => swal.fire(t("errored"), "", "error"));
                  }
                } else if (result.isDenied) {
                  swal.fire(t("didnt_delete"), "", "info");
                }
              });
          }}
        >
          <Trash />
        </Button>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default ActionsButtons;
