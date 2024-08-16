import { useState } from "react";
import { toast } from "react-toastify";

const HandleExportExcel = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = async (api: any) => {
    setIsLoading(true);
    try {
      const response = await api;

      if (response) {
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const disposition = response.headers.get("Content-Disposition");
        let filename = "";
        if (disposition && disposition.includes("attachment")) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        if (!filename) {
          filename = "downloaded_file";
        }
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Excel file exported successfully!");
      } else {
        console.log(response);
        toast.error("Failed to export Excel file.");
      }
    } catch (error) {
      toast.error("An error occurred while exporting the Excel file.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleExportData };
};

export default HandleExportExcel;
