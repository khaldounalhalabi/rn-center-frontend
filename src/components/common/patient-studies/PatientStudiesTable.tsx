"use client";
import Eye from "@/components/icons/Eye";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import useUser from "@/hooks/UserHook";
import PatientStudy from "@/models/PatientStudy";
import { Link } from "@/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import ActionsButtons from "../Datatable/ActionsButtons";
import PatientStudyForm from "./PatientStudyForm";

interface MediaTableProps {
  files: PatientStudy[];
  onDelete?: (mediaId: number) => void;
  customerId: number;
}

const PatientStudiesTable: React.FC<MediaTableProps> = ({
  files,
  onDelete,
  customerId,
}) => {
  const t = useTranslations("patient_studies");
  const { role } = useUser();
  const [filesList, setFilesList] = useState<PatientStudy[]>(files);

  useEffect(() => {
    setFilesList(files);
  }, [files]);

  return (
    <div className="w-full flex flex-col justify-start">
      <PatientStudyForm customerId={customerId} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-start"}>{t("title")}</TableHead>
            <TableHead className={"text-start"}>{t("study_date")}</TableHead>
            <TableHead className={"text-start"}>{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filesList && filesList.length != 0 ? (
            filesList.map((item) => (
              <TableRow key={item.id}>
                <TableCell className={"text-start"}>{item.title}</TableCell>
                <TableCell className={"text-start"}>
                  {item.study_date}
                </TableCell>
                <TableCell className={"flex items-center justify-start gap-1"}>
                  <ActionsButtons
                    baseUrl={`/${role}/patient-studies`}
                    data={item}
                    buttons={["delete"]}
                    deleteHandler={() => {
                      if (onDelete) {
                        onDelete(item.id);
                      }
                    }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={"icon"} type="button">
                          <Eye />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuGroup>
                          {Object.entries(
                            item.available_modes?.validModes ?? {},
                          )?.map(([key, mode], index) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={mode.url} target="_blank">
                                {mode.displayName}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ActionsButtons>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">{t("no_files")}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientStudiesTable;
