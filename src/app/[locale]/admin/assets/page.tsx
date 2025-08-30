"use client";

import AssetFormSheet from "@/components/common/assets/AssetFormSheet";
import AssetShowSheet from "@/components/common/assets/AssetShowSheet";
import CheckinForm from "@/components/common/assets/CheckinForm";
import CheckoutAssetSheet from "@/components/common/assets/CheckoutAssetForm";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import Select from "@/components/common/ui/selects/Select";
import Tooltip from "@/components/common/ui/Tooltip";
import { Badge } from "@/components/ui/shadcn/badge";
import { Progress } from "@/components/ui/shadcn/progress";
import AssetTypeEnum from "@/enums/AssetTypeEnum";
import UserAssetStatusEnum from "@/enums/UserAssetStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import Asset from "@/models/Asset";
import AssetService from "@/services/AssetService";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("assets");
  const typesT = useTranslations("types_statuses");
  const { role } = useUser();
  const [revalidated, setRevalidated] = useState(false);
  const schema: DataTableSchema<Asset>[] = [
    {
      label: "ID",
      name: "id",
      sortable: true,
    },
    {
      label: t("asset"),
      name: "name",
      sortable: true,
    },
    {
      label: t("serial_number"),
      name: "serial_number",
      sortable: true,
      render(serial, asset, setHidden, revalidate) {
        if (asset?.type == AssetTypeEnum.ASSET) {
          return serial;
        }
        return undefined;
      },
    },
    {
      label: t("type"),
      name: "type",
      sortable: true,
      render(type, asset, setHidden, revalidate) {
        let variant: "success" | "default" | "outline" = "default";
        if (asset?.type == AssetTypeEnum.ACCESSORIES) {
          variant = "success";
        }

        if (asset?.type == AssetTypeEnum.CONSUMABLE) {
          variant = "outline";
        }

        return <Badge variant={variant}>{type}</Badge>;
      },
    },
    {
      label: t("quantity"),
      name: "quantity",
      render(quantity, asset, setHidden, revalidate) {
        if (asset?.type != AssetTypeEnum.ASSET) {
          const value = Math.round(
            (quantity * 100) / (asset?.total_quantity ?? 100),
          );
          return (
            <div className="grid grid-cols-2 gap-3 items-center !min-w-max">
              <Progress value={value} />
              <span className="flex items-center w-full text-xs">
                {quantity} / {asset?.total_quantity} {asset?.quantity_unit}
              </span>
            </div>
          );
        }
        return undefined;
      },
      headerProps: {
        className: "!min-w-12",
      },
    },
    {
      label: t("assigned_quantity"),
      name: "assigned_quantity",
      render(assignedQuantity, asset, setHidden, revalidate) {
        if (asset?.type != AssetTypeEnum.ASSET) {
          return assignedQuantity;
        }
        return undefined;
      },
    },
    {
      label: t("purchase_date"),
      name: "purchase_date",
      sortable: true,
    },
    {
      label: t("options"),
      render(data, fullObject, setHidden, revalidate) {
        const refetch = () => {
          if (revalidate) {
            revalidate();
            setRevalidated((prev) => !prev);
          }
        };
        return (
          <ActionsButtons
            buttons={["delete"]}
            data={fullObject}
            baseUrl={`/${role}/assets`}
            setHidden={setHidden}
            reverse
          >
            {fullObject && (
              <>
                <CheckoutAssetSheet asset={fullObject} revalidate={refetch} />

               
                  <CheckinForm asset={fullObject} revalidate={refetch} />
               
              </>
            )}
            <AssetFormSheet
              type="update"
              asset={fullObject}
              revalidate={refetch}
            />
            <AssetShowSheet
              assetId={fullObject?.id ?? 0}
              revalidated={revalidated}
            />
          </ActionsButtons>
        );
      },
    },
  ];

  const datatable: DataTableData<Asset> = {
    api(page, search, sortCol, sortDir, perPage, params) {
      return AssetService.make(role).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      );
    },
    schema: schema,
    filter(params, setParams) {
      return (
        <Grid md={1}>
          <Select
            data={getEnumValues(AssetTypeEnum)}
            translated
            onChange={(v) => {
              setParams({ ...params, type: v });
            }}
            label={t("type")}
            selected={params.type}
          />

          <Select
            data={[
              {
                label: typesT("asset_checkin"),
                value: UserAssetStatusEnum.CHECKIN,
              },
              {
                label: typesT("asset_checkout"),
                value: UserAssetStatusEnum.CHECKOUT,
              },
            ]}
            selected={params.availability_status}
            onChange={(v) => {
              setParams({ ...params, availability_status: v });
            }}
            label={t("status")}
          />
        </Grid>
      );
    },
    extraButton(revalidate) {
      return <AssetFormSheet revalidate={revalidate} type="store" />;
    },
  };
  return (
    <PageCard title={t("index_title")}>
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;
