import Eye from "@/components/icons/Eye";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import UserAssetStatusEnum from "@/enums/UserAssetStatusEnum";
import useUser from "@/hooks/UserHook";
import AssetService from "@/services/AssetService";
import Grid from "../ui/Grid";
import Gallery from "../ui/images/Gallery";
import { Label } from "../ui/labels-and-values/Label";
import { LabelValue } from "../ui/labels-and-values/LabelValue";
import TranslatableEnum from "../ui/labels-and-values/TranslatableEnum";
import { Value } from "../ui/labels-and-values/Value";

import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
const AssetShowSheet = ({ assetId , revalidated }: { assetId: number , revalidated:boolean}) => {
  const { role } = useUser();
  const t = useTranslations("assets");
  const { data: asset, isPending } = useQuery({
    queryKey: ["show_asset" , revalidated],
    queryFn: () => AssetService.make(role).show(assetId),
    select(data) {
      return data.data;
    },
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <Eye />
        </Button>
      </SheetTrigger>
      <SheetContent md>
        <SheetHeader>
          <SheetTitle>
            {t("show_title", { asset_name: asset?.name })}
          </SheetTitle>
        </SheetHeader>
        <Grid>
          {isPending ? (
            <Skeleton className="md:col-span-2 w-full" />
          ) : (
            <>
              {" "}
              <LabelValue label={t("name")} value={asset?.type} />
              <LabelValue
                label={t("serial_number")}
                value={asset?.serial_number}
              />
              <LabelValue
                label={t("type")}
                value={<TranslatableEnum value={asset?.type} />}
              />
              <Label label={t("quantity")}>
                <Value value={asset?.quantity} />
                {asset?.quantity_unit}
              </Label>
              <LabelValue
                label={t("purchase_date")}
                value={asset?.purchase_date}
              />
              <LabelValue
                label={t("assigned_quantity")}
                value={asset?.assigned_quantity}
              />
              <LabelValue
                label={t("total_quantity")}
                value={asset?.total_quantity}
              />
            </>
          )}
          {isPending ? (
            <Skeleton className="md:col-span-2" />
          ) : (
            (asset?.user_assets?.length ?? 0) > 0 && (
              <Label
                label={t("user_assets")}
                col
                className="md:col-span-2 w-full"
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("user_name")}</TableHead>
                      <TableHead>{t("quantity")}</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead>{t("expected_return_date")}</TableHead>
                      <TableHead>{t("checkin_condition")}</TableHead>
                      <TableHead>{t("checkout_condition")}</TableHead>
                      <TableHead>{t("checkin_date")}</TableHead>
                      <TableHead>{t("checkout_date")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asset?.user_assets?.map((userAsset, index) => (
                      <TableRow key={index}>
                        <TableCell>{userAsset?.user?.full_name}</TableCell>
                        <TableCell>{userAsset?.quantity}</TableCell>
                        <TableCell>
                          {userAsset?.status == UserAssetStatusEnum.CHECKIN ? (
                            <Badge variant={"success"}>
                              <TranslatableEnum value="asset_checkin" />
                            </Badge>
                          ) : (
                            <Badge variant={"destructive"}>
                              <TranslatableEnum value="asset_checkout" />
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{userAsset?.expected_return_date}</TableCell>
                        <TableCell>
                          {userAsset?.checkin_condition ?? 10} / 10
                        </TableCell>
                        <TableCell>
                          {userAsset?.checkout_condition ?? 10} / 10
                        </TableCell>
                        <TableCell>{userAsset?.checkin_date}</TableCell>
                        <TableCell>{userAsset?.checkout_date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Label>
            )
          )}
          <div className="md:col-span-2">
            {isPending ? (
              <Skeleton className="w-full" />
            ) : (
              <Label label={t("image")} col>
                <Gallery md media={asset?.image ?? []} />
              </Label>
            )}
          </div>
        </Grid>
      </SheetContent>
    </Sheet>
  );
};

export default AssetShowSheet;
