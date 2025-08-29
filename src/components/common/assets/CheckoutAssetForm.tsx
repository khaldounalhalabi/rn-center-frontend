import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import AssetTypeEnum from "@/enums/AssetTypeEnum";
import useUser from "@/hooks/UserHook";
import Asset from "@/models/Asset";
import UserAsset from "@/models/UserAsset";
import AssetService from "@/services/AssetService";
import UserAssetService from "@/services/UserAssetService";
import { Grab } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Form from "../ui/Form";
import Grid from "../ui/Grid";
import Tooltip from "../ui/Tooltip";
import FormInput from "../ui/inputs/FormInput";
import FormRange from "../ui/inputs/FormRange";
import { LabelValue } from "../ui/labels-and-values/LabelValue";
import ApiSelect from "../ui/selects/ApiSelect";

const CheckoutAssetSheet = ({
  asset,
  revalidate,
}: {
  asset: Asset;
  revalidate?: () => Promise<void> | void;
}) => {
  const [userAsset, setUserAsset] = useState<UserAsset | undefined>(undefined);
  const t = useTranslations("assets");
  const [open, setOpen] = useState(false);
  const { role } = useUser();
  const submit = async (data: any) => {
    data.asset_id = asset.id;
    if (asset.type == AssetTypeEnum.ASSET && asset?.asset_assigned_user) {
      data.user_id = asset.asset_assigned_user.id;
    }
    return await AssetService.make(role).checkout(data);
  };

  const onSuccess = async () => {
    if (revalidate) {
      await revalidate();
    }
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip title={t("checkout", { asset_name: asset.name })}>
        <SheetTrigger asChild>
          <Button
            disabled={!asset?.can_checkout}
            variant={"success"}
            type="button"
            size={"icon"}
          >
            <Grab />
          </Button>
        </SheetTrigger>
      </Tooltip>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("checkout", { asset_name: asset?.name })}</SheetTitle>
        </SheetHeader>
        <Form handleSubmit={submit} onSuccess={onSuccess}>
          <Grid>
            <div className="md:col-span-2">
              {asset.type == AssetTypeEnum.ASSET &&
              asset?.asset_assigned_user ? (
                <LabelValue
                  label={t("user_name")}
                  value={asset.asset_assigned_user.full_name}
                />
              ) : (
                <ApiSelect
                  api={function (page?: number, search?: string) {
                    return UserAssetService.make(role).getAssignedByAsset(
                      asset?.id,
                      page,
                      search,
                    );
                  }}
                  name={"user_id"}
                  getOptionLabel={(item: UserAsset) => (
                    <span className="w-full flex items-center gap-2">
                      <Badge variant={"secondary"}>{item?.user?.role}</Badge>
                      {item?.user?.full_name}
                    </span>
                  )}
                  getOptionValue={(selected) => selected.user_id}
                  label={t("user_name")}
                  onSelect={(selected) => {
                    setUserAsset(selected);
                  }}
                />
              )}
            </div>
            {asset?.type == AssetTypeEnum.ACCESSORIES && (
              <FormInput
                min={0}
                max={userAsset?.quantity}
                type="number"
                name="quantity"
                label={t("quantity") + ` / max(${userAsset?.quantity ?? 0})`}
              />
            )}
            <div className="md:col-span-2">
              {asset.type != AssetTypeEnum.CONSUMABLE && (
                <FormRange
                  name="checkout_condition"
                  label={t("checkout_condition")}
                  min={0}
                  max={10}
                  step={1}
                />
              )}
            </div>
          </Grid>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutAssetSheet;
