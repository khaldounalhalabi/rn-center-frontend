"use client";
import React, { useState } from "react";
import { Media } from "@/models/Media";
import { useTranslations } from "next-intl";
import { MediaService } from "@/services/MediaService";
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
import Alert from "@/components/common/ui/Alert";
import { toast } from "sonner";
import LoadingSpin from "@/components/icons/LoadingSpin";

interface MediaTableProps {
  media: Media[];
  onDelete?: (mediaId: number) => void;
}

const MediaTable: React.FC<MediaTableProps> = ({ media, onDelete }) => {
  const t = useTranslations("common.patient.attachments");
  const [attachments, setAttachments] = useState<Media[]>(media);
  const [isDeleting, setIsDeleting] = useState<number | undefined>(undefined);
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
    setIsDeleting(mediaId);
    const response = await MediaService.make().delete(mediaId);
    setIsDeleting(undefined);
    if (response.ok()) {
      setAttachments(attachments.filter((item) => item.id !== mediaId));
      toast(t("deleted"), {
        description: t("delete_success"),
      });
      if (onDelete) {
        onDelete(mediaId);
      }
    } else {
      toast(t("error"), {
        description: t("delete_failed"),
      });
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
              <Alert
                trigger={
                  <Button
                    disabled={isDeleting == item.id}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    {isDeleting == item.id ? <LoadingSpin /> : <Trash />}
                  </Button>
                }
                title={t("delete_confirmation")}
                description={t("delete_warning")}
                onConfirm={() => {
                  handleDelete(item.id);
                }}
              />
              <Button
                onClick={() => {
                  download(item.file_url);
                }}
                disabled={isDownloading}
                size={"icon"}
              >
                {isDownloading ? <LoadingSpin /> : <DownloadIcon />}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MediaTable;
