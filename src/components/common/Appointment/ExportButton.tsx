import LoadingSpin from "@/components/icons/LoadingSpin";
import React from "react";
import HandleExportExcel from "@/hooks/HandleExportExcel";
import { getCookieClient } from "@/Actions/clientCookies";

const ExportButton = ({data,close}:{data:{year:string,month:string},close:any}) => {
    const { isLoading, handleExportData } = HandleExportExcel();
    const token = getCookieClient("token");
    const handleExport = () => {
        const api = `${process.env.localApi}doctor/appointments/export${data.year && !data.month?`?year=${data.year}`:data.month && !data.year?`?month=${data.month}`:data.year && data.month?`?year=${data.year}&month=${data.month}`:""}`
        const response = fetch(
            api,
            {
                method: "GET",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            },
        );
        close()
        return handleExportData(response);
    };

    return (
        <button
            type="button"
            className="inline-flex justify-center bg-blue-100 hover:bg-blue-200 px-4 py-2 border border-transparent rounded-md font-medium text-blue-900 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleExport}
        >
            {isLoading ? <LoadingSpin className={"w-6 h-6"} /> : "Apply"}
        </button>
    );
};

export default ExportButton