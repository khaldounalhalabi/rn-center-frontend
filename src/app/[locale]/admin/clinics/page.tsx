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
import { cities } from "@/constants/Cities";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.clinic.table");
  const dataTableData: DataTableData<Clinic> = {
    //TODO::add total appointments when it is done

    createUrl: `/admin/clinics/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user.first_name",
        sortable: true,
        label: `${t("clinic")}`,
        render: (_first_name, clinic) => {
          return (
              <p>{translate(clinic?.name)}</p>
          );
        },
      },
      {
        name: "user.first_name",
        sortable: true,
        label: `${t("doctor")}`,
        render: (_first_name, clinic) => {
          return (
              <p>
                {translate(clinic?.user?.first_name)}{" "}
                {translate(clinic?.user?.middle_name)}{" "}
                {translate(clinic?.user?.last_name)}
              </p>
          );
        },
      },
      {
        name: "user.address.city.name",
        sortable: true,
        label: `${t("city")}`,
        translatable: true,
      },
      {
        label: `${t("phone")}`,
        render: (_undefined, clinic) => clinic?.user?.phones[0]?.phone ?? "",
      },
      {
        label: `${t("status")}`,
        name: "status",
        sortable: true,
        render: (data) =>
          data == "active" ? (
            <span className={`badge badge-success`}>{t("active")}</span>
          ) : (
            <span className={`badge badge-error`}>{t("inActive")}</span>
          ),
      },
      {
        label: `${t("archived?")}`,
        name: "user.is_archived",
        sortable: true,
        render: (data) =>
          data ? (
            <span className={`badge badge-error`}>{t("archived")}</span>
          ) : (
            <span className={`badge badge-success`}>{t("notArchived")}</span>
          ),
      },
      {
        label: `${t("actions")}`,
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
        params,
      ),
    title: `${t("clinics")} :`,
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {t("archived")} :
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
            {t("city")} :
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
  return <DataTable {...dataTableData} />;
};

export default Page;
