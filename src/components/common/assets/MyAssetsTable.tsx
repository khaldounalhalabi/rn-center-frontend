"use client";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Badge } from "@/components/ui/shadcn/badge";
import { Progress } from "@/components/ui/shadcn/progress";
import AssetTypeEnum from "@/enums/AssetTypeEnum";
import useUser from "@/hooks/UserHook";
import UserAsset from "@/models/UserAsset";
import UserAssetService from "@/services/UserAssetService";
import { useTranslations } from "next-intl";

function MyAssetsTable() {
  const { role } = useUser();
  const t = useTranslations("assets");
  const schema: DataTableSchema<UserAsset>[] = [
    {
      label: t("asset"),
      name: "asset.name",
      sortable: true,
    },
    {
      label: t("checkin_condition"),
      name: "checkin_condition",
      render: (data, fullObject, setHidden, revalidate) => (
        <Progress value={data} max={10} />
      ),
    },
    {
      label: t("quantity"),
      name: "quantity",
    },
    {
      label: t("expected_return_date"),
      name: "expected_return_date",
    },
    {
      label: t("type"),
      name: "asset.type",
      sortable: true,
      render(type, userAsset, setHidden, revalidate) {
        let variant: "success" | "default" | "outline" = "default";
        if (userAsset?.asset?.type == AssetTypeEnum.ACCESSORIES) {
          variant = "success";
        }

        if (userAsset?.asset?.type == AssetTypeEnum.CONSUMABLE) {
          variant = "outline";
        }

        return (
          <Badge variant={variant}>
            <TranslatableEnum value={type} />
          </Badge>
        );
      },
    },
  ];

  const datatable: DataTableData<UserAsset> = {
    api: (page, search, sortCol, sortDir, perPage, params) =>
      UserAssetService.make(role).assignedToMe(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    schema: schema,
  };
  return <DataTable {...datatable} />;
}

export default MyAssetsTable;
