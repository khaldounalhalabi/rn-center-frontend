import Trash from "@/components/icons/Trash";
import { swal } from "@/helpers/UIHelpers";
import React from "react";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { Button } from "@/components/ui/shadcn/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("components");

  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      onClick={() => {
        swal
          .fire({
            title: t("delete_service_category_question"),
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: t("yes"),
            denyButtonText: t("no"),
            confirmButtonColor: "#007BFF",
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (dataId) {
                ServiceCategoryService.make()
                  .delete(dataId)
                  .then((res) => {
                    toast(t("deleted"), {
                      description: res.message as string,
                    });

                    if (setHidden) {
                      setHidden((prevState) => [dataId, ...prevState]);
                    }
                  })
                  .catch(() => swal.fire(t("errored"), "", "error"));
              }
            } else if (result.isDenied) {
              swal.fire(t("didnt_delete"), "", "info");
            }
          });
      }}
    >
      <Trash />
    </Button>
  );
};
export default DeleteCategoryButton;
