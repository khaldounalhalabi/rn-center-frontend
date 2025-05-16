import Trash from "@/components/icons/Trash";
import { swal } from "@/helpers/UIHelpers";
import { toast } from "react-toastify";
import React from "react";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { Button } from "@/components/ui/shadcn/button";

export interface ActionsButtonsProps<T> {
  data?: T;
  id?: number | string;
  deleteUrl?: string;
  baseUrl?: string;
  setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void;
}

const DeleteCategoryButton: React.FC<ActionsButtonsProps<any>> = ({
  data,
  id,
  setHidden,
}) => {
  const dataId = id ?? data?.id ?? undefined;

  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      onClick={() => {
        swal
          .fire({
            title:
              "Deleting this service category will cause the deletion of all the services under it are you sure you want to delete it ? ",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
            confirmButtonColor: "#007BFF",
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (dataId) {
                ServiceCategoryService.make()
                  .delete(dataId)
                  .then(() => {
                    toast.success("Deleted!");

                    if (setHidden) {
                      setHidden((prevState) => [dataId, ...prevState]);
                    }
                  })
                  .catch(() =>
                    swal.fire("There Is Been An Error", "", "error"),
                  );
              }
            } else if (result.isDenied) {
              swal.fire("Didn't Delete", "", "info");
            }
          });
      }}
    >
      <Trash />
    </Button>
  );
};
export default DeleteCategoryButton;
