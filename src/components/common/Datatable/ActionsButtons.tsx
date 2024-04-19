import Link from "next/link";
import Eye from "@/components/icons/Eye";
import Pencil from "@/components/icons/Pencil";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import React from "react";
import { swal } from "@/Helpers/UIHelpers";
import { BaseService } from "@/services/BaseService";
import Trash from "@/components/icons/Trash";

type Buttons = "delete" | "edit" | "archive" | "show";

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
}) => {
  const dataId = id ?? data?.id ?? undefined;
  const dUrl = deleteUrl ?? `${baseUrl}/${dataId ?? ""}`; // delete url
  const sUrl = showUrl ?? `${baseUrl}/${dataId ?? ""}`; // show url
  const eUrl = editUrl ?? `${baseUrl}/${dataId ?? ""}/edit` + ""; // edit url
  const aUrl = archiveUrl ?? `${baseUrl}/${dataId ?? ""}`; // archive url

  return (
    <div className={`flex justify-between items-center`}>
      {buttons.includes("show") ? (
        <Link href={sUrl} className="btn btn-square btn-sm">
          <Eye className="h-6 w-6 text-primary" />
        </Link>
      ) : (
        ""
      )}
      {buttons.includes("edit") ? (
        <Link href={eUrl} className="btn btn-square btn-sm">
          <Pencil className="h-6 w-6 text-success" />
        </Link>
      ) : (
        ""
      )}
      {buttons.includes("archive") ? (
        <button className="btn btn-square btn-sm">
          <ArchiveIcon
            className="h-6 w-6 text-warning"
            onClick={() => {
              swal
                .fire({
                  title: "Do you want to archive this item ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: `No`,
                  confirmButtonColor: "#007BFF",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    if (dataId) {
                      BaseService.make()
                        .setBaseUrl(aUrl)
                        .delete()
                        .then(() => {
                          swal.fire({
                            title: "Archived!",
                            confirmButtonColor: "#007BFF",
                            icon: "success",
                          });
                          if (setHidden) {
                            setHidden((prevState) => [dataId, ...prevState]);
                          }
                        })
                        .catch(() =>
                          swal.fire("There Is Been An Error", "", "error"),
                        );
                    }
                  } else if (result.isDenied) {
                    swal.fire("Didn't Archive", "", "info");
                  }
                });
            }}
          />
        </button>
      ) : (
        ""
      )}
      {buttons.includes("delete") ? (
        <button className="btn btn-square btn-sm">
          <Trash
            className="h-6 w-6 text-error"
            onClick={() => {
              swal
                .fire({
                  title: "Do you want to Delete this item ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: `No`,
                  confirmButtonColor: "#007BFF",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    if (dataId) {
                      BaseService.make()
                        .setBaseUrl(dUrl)
                        .delete()
                        .then(() => {
                          swal.fire({
                            title: "Deleted!",
                            confirmButtonColor: "#007BFF",
                            icon: "success",
                          });
                          if (setHidden) {
                            setHidden((prevState) => [dataId, ...prevState]);
                          }
                        })
                        .catch(() =>
                          swal.fire("There Is Been An Error", "", "error"),
                        );
                    }
                  } else if (result.isDenied) {
                    swal.fire("Didn't Delete", "", "info");
                  }
                });
            }}
          />
        </button>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default ActionsButtons;
