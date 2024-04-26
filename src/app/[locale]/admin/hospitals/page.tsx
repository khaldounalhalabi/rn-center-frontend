"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { HospitalService } from "@/services/HospitalService";
import { Hospital } from "@/Models/Hospital";
import ImagePreview from "@/components/common/ui/ImagePreview";
import { Media } from "@/Models/Media";

const tableData: DataTableData<Hospital> = {
  createUrl: `/admin/hospitals/create`,
  title: "Hospitals",
  schema: [
    {
      name: "name",
      label: "Hospitals",
      sortable: true,
      translatable: true,
    },
    {
      name: "address.city.name",
      label: "City",
      sortable: true,
      translatable: true,
    },
    {
      name: "images",
      label: "Images",
      render: (images: Media[]) => (
        <div className="max-w-[75px]">
          <ImagePreview src={images.length > 0 ? images[0].file_url : ""} />
        </div>
      ),
    },
    {
      label: "Actions",
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
};
const Page = () => {
  return <DataTable {...tableData} />;
};

export default Page;
