"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import { Input } from "@/components/ui/shadcn/input";
import MedicineStatusEnum from "@/enums/MedicineStatusEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { getEnumValues } from "@/helpers/Enums";
import { Medicine } from "@/models/Medicine";
import { MedicineService } from "@/services/MedicinesSevice";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.medicine.table");
  const tableData: DataTableData<Medicine> = {
    createUrl: `/secretary/medicines/create`,
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
            baseUrl={`/secretary/medicines`}
            editUrl={`/secretary/medicines/${data?.id}/edit`}
            showUrl={`/secretary/medicines/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    filter: (params, setParams) => {
      return (
        <Grid md={1}>
          <Select
            label={t("status")}
            data={getEnumValues(MedicineStatusEnum)}
            translated
            onChange={(e) => {
              setParams({ ...params, status: e });
            }}
            selected={params?.status}
          />
          <Label label={t("quantity") + " >"} col>
            <Input
              type={"number"}
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
            <Input
              type={"number"}
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
      await MedicineService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return (
    <PageCard title={t("medicines")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;
