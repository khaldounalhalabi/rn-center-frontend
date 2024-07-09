import ExcelIcon from "@/components/icons/ExcelIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";
import React from "react";
import HandleExportExcel from "@/hooks/HandleExportExcel";
import { getCookieClient } from "@/Actions/clientCookies";

const ExportButton = () => {
  const { isLoading, handleExportData } = HandleExportExcel();
  const token = getCookieClient("token");
  const handleExport = () => {
    const response = fetch(
      `${process.env.localApi}doctor/appointments/export`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    return handleExportData(response);
  };

  return (
    <button
      disabled={isLoading}
      className={` rounded-lg px-1  ${isLoading?"bg-gray-400":"hover:bg-info"}`}
      onClick={handleExport}
    >
      <ExcelIcon
        className={`w-7 h-7 cursor-pointer ${isLoading ? "hidden" : ""}`}
      />
      {isLoading ? <LoadingSpin className={"w-6 h-6"} /> : ""}
    </button>
  );
};

export default ExportButton