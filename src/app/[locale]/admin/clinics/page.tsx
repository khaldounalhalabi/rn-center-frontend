"use client";
import React, { ChangeEvent } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { translate } from "@/Helpers/Translations";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import { swal } from "@/Helpers/UIHelpers";
import { UserService } from "@/services/UserService";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ApiResponse } from "@/Http/Response";
import { CityService } from "@/services/CityService";
import { City } from "@/Models/City";
import Select from "@/components/common/ui/Selects/Select";
import { cities } from "@/constants/Cities";

const dataTableData: DataTableData<Clinic> = {
  //TODO::add total appointments when it is done

  createUrl: `/admin/clinics/create`,
  schema: [
    {
      name: "user.first_name",
      sortable: true,
      label: "Doctor",
      render: (_first_name, clinic) => {
        return (
          <div className={`flex flex-col items-start`}>
            <p>{translate(clinic?.name)}</p>
            <p>
              {translate(clinic?.user?.first_name)}{" "}
              {translate(clinic?.user?.middle_name)}{" "}
              {translate(clinic?.user?.last_name)}
            </p>
          </div>
        );
      },
    },
    {
      name: "user.address.city.name",
      sortable: true,
      label: "City",
      translatable: true,
    },
    {
      label: "Phone",
      render: (_undefined, clinic) => clinic?.user?.phones[0]?.phone ?? "",
    },
    {
      label: "Status",
      name: "status",
      sortable: true,
      render: (data) =>
        data == "active" ? (
          <span className={`badge badge-success`}>Active</span>
        ) : (
          <span className={`badge badge-error`}>In-active</span>
        ),
    },
    {
      label: "Archived ?",
      name: "user.is_archived",
      sortable: true,
      render: (data) =>
        data ? (
          <span className={`badge badge-error`}>Archived</span>
        ) : (
          <span className={`badge badge-success`}>Not Archived</span>
        ),
    },
    {
      label: "Actions",
      render: (_undefined, clinic, setHidden, revalidate) => (
        <ActionsButtons
          id={clinic?.id}
          buttons={["edit", "show"]}
          baseUrl={`/admin/clinics`}
        >
          <button className="btn btn-sm btn-square">
            <ArchiveIcon
              className="w-6 h-6 text-warning"
              onClick={() => {
                swal
                  .fire({
                    title: clinic?.user?.is_archived
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
                      if (clinic?.user) {
                        UserService.make<UserService>()
                          .toggleArchive(clinic?.user_id)
                          .then((res) => {
                            swal.fire({
                              title:
                                res.data == "archived"
                                  ? "Archived!"
                                  : "Un-Archived !",
                              confirmButtonColor: "#007BFF",
                              icon: "success",
                            });
                            if (revalidate) revalidate();
                          })
                          .catch((e) => {
                            swal.fire("There Is Been An Error", "", "error");
                          });
                      }
                    }
                  });
              }}
            />
          </button>
        </ActionsButtons>
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage, params) =>
    await ClinicService.make<ClinicService>().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
      params
    ),
  title: "Clinics :",
  filter: (params, setParams) => {
    return (
      <div className={"w-full grid grid-cols-1"}>
        <label className={"label"}>
          Archived :
          <input
            type="checkbox"
            className={"checkbox"}
            defaultChecked={params.is_archived}
            onChange={(event) => {
              const { checked } = event.target;
              setParams({ ...params, is_archived: checked ? 1 : 0 });
            }}
          />
        </label>
        <label className="label">
          City :
          <select
            className="select-bordered select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setParams({ ...params, city_name: e.target.value });
            }}
          >
            {cities.map((city, index) => (
              <option
                key={index}
                value={city.name}
                selected={params.city_name == city.name}
              >
                {translate(city.name)}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  },
};

const Page = () => {
  return <DataTable {...dataTableData} />;
};

export default Page;
