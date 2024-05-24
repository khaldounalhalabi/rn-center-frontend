import Trash from "@/components/icons/Trash";
import {swal} from "@/Helpers/UIHelpers";
import {BaseService} from "@/services/BaseService";
import {toast} from "react-toastify";
import React from "react";
import {CategoryService} from "@/services/CategoryService";

export interface ActionsButtonsProps<T> {
    data?: T;
    id?: number | string;
    deleteUrl?: string;
    baseUrl?:string
    setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void;
}
const DeleteCategory :React.FC<ActionsButtonsProps<any>> = ({
                            data,
                            id,
                            setHidden,
                        })=>{

    const dataId = id ?? data?.id ?? undefined;


    return (
        <button className="btn btn-sm btn-square">
            <Trash
                className="w-6 h-6 text-error"
                onClick={() => {
                    swal
                        .fire({
                            title: "Deleting this service category will cause the deletion of all the services under it are you sure you want to delete it ? ",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Yes",
                            denyButtonText: `No`,
                            confirmButtonColor: "#007BFF",
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                if (dataId) {
                                    CategoryService.make().delete(dataId)
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
            />
        </button>
    )
}
export default DeleteCategory