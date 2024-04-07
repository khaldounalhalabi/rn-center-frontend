"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";

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
            <p>{clinic?.name}</p>
            <p>
              {clinic?.user?.first_name} {clinic?.user?.middle_name}{" "}
              {clinic?.user?.last_name}
            </p>
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
        <ActionsButtons
          id={clinic?.id}
          buttons={["edit", "archive", "show"]}
          baseUrl={"/admin/clinics"}
          setHidden={setHidden}
        />
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
  filter: (params, setParams) => {
    return (
      <div className={"w-full grid grid-cols-1 md:grid-cols-2"}>
        <label className={"label"}>
          Archived :
          <input
            type="checkbox"
            className={"checkbox"}
            defaultChecked={params.is_archived}
            onChange={(event) => {
              const { checked } = event.target;
              setParams({ ...params, is_archived: checked });
            }}
          />
        </label>
      </div>
    );
  },
};

const Page = () => {
  return <DataTable {...dataTableData} />;
};

export default Page;
