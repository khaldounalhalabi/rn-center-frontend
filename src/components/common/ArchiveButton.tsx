import ArchiveIcon from "@/components/icons/ArchiveIcon";
import { swal } from "@/Helpers/UIHelpers";
import React from "react";
import {toast} from "react-toastify";

interface ArchiveButtonProps {
  data: any;
  api: any;
  id: number | undefined;
  revalidate?: () => void;
  user: any;
}
const ArchiveButton: React.FC<ArchiveButtonProps> = ({
  data,
  api,
  id,
  revalidate,
  user,
}) => {
  return (
    <button className="btn btn-sm btn-square">
      <ArchiveIcon
        className="w-6 h-6 text-warning"
        onClick={() => {
          swal
            .fire({
              title: data?.user?.is_archived
                ? "Do You Want To Un-Archive This Doctor ?"
                : "Do you want to archive this item ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Yes",
              denyButtonText: `No`,
              confirmButtonColor: "#007BFF",
            })
            .then((result) => {
              if (result.isConfirmed) {
                api
                  .make(user)
                  .toggleArchive(id)
                  .then((res: any) => {
                      toast.success(res.data == "archived" ? "Archived!" : "Un-Archived !");
                      if (revalidate) revalidate();
                  })
                  .catch((e: any) => {
                    swal.fire("There Is Been An Error", "", "error");
                  });
              }
            });
        }}
      />
    </button>
  );
};

export default ArchiveButton;
