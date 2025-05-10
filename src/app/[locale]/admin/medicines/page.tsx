"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { MedicineService } from "@/services/MedicinesSevice";
import { Medicine } from "@/Models/Medicine";
import { useTranslations } from "next-intl";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import { RoleEnum } from "@/enum/RoleEnum";
import SelectFilter from "@/components/common/ui/selects/SelectFilter";
import { getEnumValues } from "@/Helpers/Enums";
import MedicineStatusEnum from "@/enum/MedicineStatusEnum";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import Grid from "@/components/common/ui/Grid";

const Page = () => {
  const t = useTranslations("common.medicine.table");
  const tableData: DataTableData<Medicine> = {
    createUrl: `/admin/medicines/create`,
    title: `${t("medicines")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("medicineName")}`,
        sortable: true,
      },
      {
        name: "quantity",
        label: `${t("quantity")}`,
        sortable: true,
      },
      {
        name: "status",
        label: `${t("status")}`,
        render: (status) => <TranslatableEnum value={status} />,
        sortable: true,
      },
      {
        name: "barcode",
        label: `${t("barcode_value")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/medicines`}
            editUrl={`/admin/medicines/${data?.id}/edit`}
            showUrl={`/admin/medicines/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    filter: (params, setParams) => {
      return (
        <Grid md={1}>
          <SelectFilter
            label={t("status")}
            data={getEnumValues(MedicineStatusEnum)}
            translated
            onChange={(e: { target: { value: any } }) => {
              setParams({ ...params, status: e.target?.value });
            }}
            sm
            selected={[params?.status]}
          />
          <Label label={t("quantity") + " >"} col>
            <input
              type={"number"}
              className={"input input-bordered input-sm w-full"}
              onChange={(e) => {
                setParams({
                  ...params,
                  quantity: [e.target?.value, params?.quantity?.[1]],
                });
              }}
              defaultValue={params?.quantity?.[0]}
            />
          </Label>

          <Label label={t("quantity") + " <"} col>
            <input
              type={"number"}
              className={"input input-bordered input-sm w-full"}
              onChange={(e) => {
                setParams({
                  ...params,
                  quantity: [params?.quantity?.[0], e.target?.value],
                });
              }}
              defaultValue={params?.quantity?.[1]}
            />
          </Label>
        </Grid>
      );
    },
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await MedicineService.make<MedicineService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;
