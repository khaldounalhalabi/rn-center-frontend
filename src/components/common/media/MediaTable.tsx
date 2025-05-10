"use client";
import React, { useState } from "react";
import { Media } from "@/models/Media";
import { useTranslations } from "next-intl";
import { MediaService } from "@/services/MediaService";
import Swal from "sweetalert2";
import Trash from "@/components/icons/Trash";
import DownloadIcon from "@/components/icons/DownloadIcon";
import useDownload from "@/hooks/DownloadFile";
import LoadingSpin from "@/components/icons/LoadingSpin";

interface MediaTableProps {
  media: Media[];
  onDelete?: (mediaId: number) => void;
}

const MediaTable: React.FC<MediaTableProps> = ({ media, onDelete }) => {
  const t = useTranslations("common.patient.attachments");
  const [attachments, setAttachments] = useState<Media[]>(media);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { download, isLoading: isDownloading } = useDownload();

  const getFileName = (url: string): string => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };

  const getFileExtension = (url: string): string => {
    // First try to get extension from the URL
    const fileName = getFileName(url);
    const extensionMatch = fileName.match(/\.([^.]+)$/);
    
    if (extensionMatch && extensionMatch[1]) {
      return extensionMatch[1].toLowerCase();
    }
    
    // If no extension found in URL, try to extract from MIME type
    const mimeToExtensionMap: Record<string, string> = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'text/plain': 'txt',
      'application/zip': 'zip',
      'application/vnd.rar': 'rar',
      'video/mp4': 'mp4',
      'audio/mpeg': 'mp3'
    };
    
    // Find the file in attachments to check its mime type
    const fileItem = attachments.find(item => item.file_url === url);
    if (fileItem && fileItem.file_type) {
      return mimeToExtensionMap[fileItem.file_type] || 'unknown';
    }
    
    return 'unknown';
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
              <td>
                <span className="badge badge-ghost uppercase">
                  {getFileExtension(item.file_url)}
                </span>
              </td>
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
                <button
                  className={"btn btn-info btn-square btn-sm text-white"}
                  onClick={() => {
                    download(item.file_url);
                  }}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <LoadingSpin />
                  ) : (
                    <DownloadIcon className={"w-5 h-5"} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediaTable;
