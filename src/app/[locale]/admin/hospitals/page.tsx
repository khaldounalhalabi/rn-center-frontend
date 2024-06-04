"use client";
import React, { ChangeEvent } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { HospitalService } from "@/services/HospitalService";
import { Hospital } from "@/Models/Hospital";
import ImagePreview from "@/components/common/ui/ImagePreview";
import { Media } from "@/Models/Media";
import { useTranslations } from "next-intl";
import { cities } from "@/constants/Cities";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import AppointmentStatuses from "@/enum/AppointmentStatus";
import {AppointmentService} from "@/services/AppointmentService";
import {toast} from "react-toastify";
import StatusArray from "@/enum/status";

const Page = () => {
  const t = useTranslations("admin.hospitals.table");
  const handleSelectStatus = async ( id: number) => {
    return await HospitalService.make<HospitalService>("admin").toggleStatus(id).then((res)=>{
      toast.success("Status Changed!");
    })
  };
  const tableData: DataTableData<Hospital> = {
    createUrl: `/admin/hospitals/create`,
    title: `${t("hospitals")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("hospitals")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "address.city.name",
        label: `${t("city")}`,
        sortable: true,
        translatable: true,
      },
      {
        name:"status",
        label:"Status",
        sortable:true,
        render:(_undefined, data)=>(
            <SelectPopOver
                id={data?.id}
                status={data?.status}
                ArraySelect={StatusArray()}
                handleSelect={(status:string,id:number)=>{
                  if(data?.status != status){
                    return handleSelectStatus(id)
                  }
                }}
            />
        )
      },
      {
        name: "images",
        label: `${t("images")}`,
        render: (images: Media[]) => (
          <div className="max-w-[75px]">
            <ImagePreview src={images.length > 0 ? images[0].file_url : ""} />
          </div>
        ),
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/hospitals`}
            editUrl={`/admin/hospitals/${data?.id}/edit`}
            showUrl={`/admin/hospitals/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await HospitalService.make<HospitalService>().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className="label">
            {t("city")} :
            <select
              className="select-bordered select"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setParams({ ...params, city: e.target.value });
              }}
            >
              {cities.map((city, index) => (
                <option
                  key={index}
                  value={city.name}
                  selected={params.city == city.name}
                >
                  {TranslateClient(city.name)}
                </option>
              ))}
            </select>
          </label>
        </div>
      );
    },
  };
  return <DataTable {...tableData} />;
};

export default Page;