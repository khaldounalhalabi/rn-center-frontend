"use client";
import React, { useState } from "react";
import { Media } from "@/models/Media";
import { useTranslations } from "next-intl";
import { MediaService } from "@/services/MediaService";
import Swal from "sweetalert2";
import Trash from "@/components/icons/Trash";
import DownloadIcon from "@/components/icons/DownloadIcon";
import useDownload from "@/hooks/DownloadFile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Loader2 } from "lucide-react";

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
      "application/pdf": "pdf",
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/vnd.ms-excel": "xls",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "text/plain": "txt",
      "application/zip": "zip",
      "application/vnd.rar": "rar",
      "video/mp4": "mp4",
      "audio/mpeg": "mp3",
    };

    // Find the file in attachments to check its mime type
    const fileItem = attachments.find((item) => item.file_url === url);
    if (fileItem && fileItem.file_type) {
      return mimeToExtensionMap[fileItem.file_type] || "unknown";
    }

    return "unknown";
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
    return (
      <div className="py-4 text-center">
        <Badge>{t("no_attachments")}</Badge>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"text-start"}>{t("file_name")}</TableHead>
          <TableHead className={"text-start"}>{t("file_type")}</TableHead>
          <TableHead className={"text-start"}>{t("size")}</TableHead>
          <TableHead className={"text-start"}>{t("actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attachments.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={"text-start"}>
              <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                <Button variant={"link"} type={"button"}>
                  {getFileName(item.file_url)}
                </Button>
              </a>
            </TableCell>
            <TableCell className={"text-start"}>
              <span className="badge badge-ghost uppercase">
                {getFileExtension(item.file_url)}
              </span>
            </TableCell>
            <TableCell className={"text-start"}>
              {Math.round(item.size / 1024)} KB
            </TableCell>
            <TableCell className={"flex items-center justify-start gap-1"}>
              <Button
                onClick={() => handleDelete(item.id)}
                disabled={isDeleting}
                variant={"destructive"}
                size={"icon"}
              >
                {isDeleting ? <Loader2 /> : <Trash />}
              </Button>
              <Button
                onClick={() => {
                  download(item.file_url);
                }}
                disabled={isDownloading}
                size={"icon"}
              >
                {isDownloading ? <Loader2 /> : <DownloadIcon />}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MediaTable;
