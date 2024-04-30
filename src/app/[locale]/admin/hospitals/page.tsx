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
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.hospitals.table");
  const tableData: DataTableData<Hospital> = {
    createUrl: `/admin/hospitals/create`,
    title: `${t("hospitals")}`,
    schema: [
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
  };
  return <DataTable {...tableData} />;
};

export default Page;
