"use client";
import React, { useState } from "react";
import { Media } from "@/Models/Media";
import { useTranslations } from "next-intl";
import { MediaService } from "@/services/MediaService";
import Swal from "sweetalert2";
import Trash from "@/components/icons/Trash";
import Link from "next/link";
import DownloadIcon from "@/components/icons/DownloadIcon";

interface MediaTableProps {
  media: Media[];
  onDelete?: (mediaId: number) => void;
}

const MediaTable: React.FC<MediaTableProps> = ({ media, onDelete }) => {
  const t = useTranslations("common.patient.attachments");
  const [attachments, setAttachments] = useState<Media[]>(media);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const getFileName = (url: string): string => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };

  const handleDelete = async (mediaId: number) => {
    try {
      setIsDeleting(true);
      const result = await Swal.fire({
        title: t("delete_confirmation"),
        text: t("delete_warning"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("confirm_delete"),
        cancelButtonText: t("cancel"),
      });

      if (result.isConfirmed) {
        const response = await MediaService.make().delete(mediaId);
        if (response.ok()) {
          setAttachments(attachments.filter((item) => item.id !== mediaId));
          Swal.fire({
            title: t("deleted"),
            text: t("delete_success"),
            icon: "success",
          });
          if (onDelete) {
            onDelete(mediaId);
          }
        } else {
          Swal.fire({
            title: t("error"),
            text: t("delete_failed"),
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting attachment:", error);
      Swal.fire({
        title: t("error"),
        text: t("delete_failed"),
        icon: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!attachments || attachments.length === 0) {
    return <div className="text-center py-4">{t("no_attachments")}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>{t("file_name")}</th>
            <th>{t("file_type")}</th>
            <th>{t("size")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {attachments.map((item) => (
            <tr key={item.id}>
              <td>
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {getFileName(item.file_url)}
                </a>
              </td>
              <td>{item.file_type}</td>
              <td>{Math.round(item.size / 1024)} KB</td>
              <td className={"flex items-center gap-1 justify-center"}>
                <button
                  className="btn btn-square btn-sm text-error"
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <Trash />
                  )}
                </button>
                <Link
                  href={item?.file_url}
                  className={"btn btn-info btn-square btn-sm text-white"}
                  download={item.file_url}
                  target={"_blank"}
                >
                  <DownloadIcon className={"w-5 h-5"} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediaTable;
