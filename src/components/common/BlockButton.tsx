import { swal } from "@/Helpers/UIHelpers";
import React from "react";
import BlockIcon from "@/components/icons/BlockIcon";
import { toast } from "react-toastify";

interface BlockButtonProps {
  data: any;
  api: any;
  id: number | undefined;
  revalidate?: () => void;
  user: any;
}

const BlockButton: React.FC<BlockButtonProps> = ({
  data,
  api,
  id,
  revalidate,
  user,
}) => {
  return (
    <button className="btn btn-sm btn-square">
      <BlockIcon
        className="w-6 h-6 text-error"
        onClick={() => {
          swal
            .fire({
              title: data?.user?.is_archived
                ? "Do You Want To Un-Block This ?"
                : "Do you want to Block this item ?",
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
                  .toggleBlock(id)
                  .then((res: any) => {
                    toast.success(res.data.toUpperCase());

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

export default BlockButton;
