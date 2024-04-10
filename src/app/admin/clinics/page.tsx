"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { translate } from "@/Helpers/ObjectHelpers";

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
  api: async (page, search, sortCol, sortDir, perPage, params) =>
    await ClinicService.make().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
      params,
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
        <label className={`label`}>
          City :
          <input
            type={"text"}
            className={"input input-bordered input-sm"}
            value={params.city}
            defaultValue={params.city_name}
            onChange={(event) => {
              setParams({ ...params, city_name: event.target.value });
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
