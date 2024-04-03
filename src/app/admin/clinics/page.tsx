"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import Eye from "@/components/icons/Eye";
import Pencil from "@/components/icons/Pencil";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import { swal } from "@/Helpers/UIHelpers";
import Link from "next/link";

const dataTableData: DataTableData<Clinic> = {
  //TODO::add total appointments when it is done

  createUrl: "clinics/create",
  schema: [
    {
      name: "user.first_name",
      sortable: true,
      label: "Doctor",
      render: (_first_name, clinic) => {
        return (
          <div className={`flex flex-col items-start`}>
            <p>
              {clinic?.user?.first_name} {clinic?.user?.middle_name}{" "}
              {clinic?.user?.last_name}
            </p>
            <p>{clinic?.name}</p>
          </div>
        );
      },
    },
    {
      name: "user.address.city.name",
      sortable: true,
      label: "City",
    },
    {
      label: "Phone",
      render: (_undefined, clinic) => clinic?.user?.phones[0]?.phone ?? "",
    },
    { label: "Status", name: "status", sortable: true },
    {
      label: "Actions",
      render: (_undefined, clinic, setHidden) => (
        <div className={`flex justify-between items-center`}>
          <Link
            href={`clinics/${clinic?.id}`}
            className="btn btn-square btn-sm"
          >
            <Eye className="h-6 w-6 text-primary" />
          </Link>
          <Link
            href={`clinics/${clinic?.id}/edit`}
            className="btn btn-square btn-sm"
          >
            <Pencil className="h-6 w-6 text-success" />
          </Link>
          <button className="btn btn-square btn-sm">
            <ArchiveIcon
              className="h-6 w-6 text-error"
              onClick={() => {
                swal
                  .fire({
                    title: "Do you want to archive this clinic ?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    denyButtonText: `No`,
                    confirmButtonColor: "#007BFF",
                  })
                  .then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      if (clinic?.id) {
                        ClinicService.make()
                          .delete(clinic.id)
                          .then(() => {
                            swal.fire({
                              title: "Archived!",
                              confirmButtonColor: "#007BFF",
                              icon: "success",
                            });
                            if (setHidden) {
                              setHidden((prevState) => [
                                clinic.id,
                                ...prevState,
                              ]);
                            }
                          })
                          .catch(() =>
                            swal.fire("There Is Been An Error", "", "error"),
                          );
                      }
                    } else if (result.isDenied) {
                      swal.fire("Didn't Archive", "", "info");
                    }
                  });
              }}
            />
          </button>
        </div>
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage) =>
    await ClinicService.make().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
    ),
  title: "Clinics :",
};

const Page = () => {
  return <DataTable {...dataTableData} />;
};

export default Page;
