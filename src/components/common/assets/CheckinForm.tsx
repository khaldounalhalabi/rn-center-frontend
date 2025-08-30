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
import { User } from "@/models/User";
import AssetService from "@/services/AssetService";
import { UserService } from "@/services/UserService";
import { HandHelping } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Form from "../ui/Form";
import Grid from "../ui/Grid";
import Tooltip from "../ui/Tooltip";
import FormDatepicker from "../ui/date-time-pickers/FormDatepicker";
import FormInput from "../ui/inputs/FormInput";
import FormRange from "../ui/inputs/FormRange";
import ApiSelect from "../ui/selects/ApiSelect";

const CheckinForm = ({
  asset,
  revalidate,
}: {
  asset: Asset;
  revalidate?: () => Promise<void> | void;
}) => {
  const t = useTranslations("assets");
  const [open, setOpen] = useState(false);
  const { role } = useUser();
  const submit = async (data: any) => {
    data.asset_id = asset.id;
    return await AssetService.make(role).checkin(data);
  };

  const onSuccess = async () => {
    if (revalidate) {
      await revalidate();
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip title={t("checkin", { asset_name: asset.name })}>
        <SheetTrigger asChild>
          <Button
            disabled={!asset?.can_checkin}
            type="button"
            variant={"outline"}
            size={"icon"}
          >
            <HandHelping />
          </Button>
        </SheetTrigger>
      </Tooltip>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("checkin", { asset_name: asset?.name })}</SheetTitle>
        </SheetHeader>
        <Form handleSubmit={submit} onSuccess={onSuccess}>
          <Grid>
            <div className="md:col-span-2">
              <ApiSelect
                api={function (page?: number, search?: string) {
                  return UserService.make(role).employees(page, search);
                }}
                name={"user_id"}
                getOptionLabel={(item: User) => (
                  <span className="w-full flex items-center gap-2">
                    <Badge variant={"secondary"}>{item?.role}</Badge>
                    {item?.full_name}
                  </span>
                )}
                optionValue="id"
                label={t("user_name")}
              />
            </div>
            {asset?.type != AssetTypeEnum.ASSET && (
              <FormInput
                min={0}
                max={asset?.quantity}
                type="number"
                name="quantity"
                label={t("quantity") + ` / max(${asset?.quantity})`}
              />
            )}
            {asset?.type != AssetTypeEnum.CONSUMABLE && (
              <FormDatepicker
                name="expected_return_date"
                label={t("expected_return_date")}
                shouldDisableDate={(date) => date.isBefore(Date.now(), "date")}
              />
            )}
            <div className="md:col-span-2">
              {asset.type != AssetTypeEnum.CONSUMABLE && (
                <FormRange
                  name="checkin_condition"
                  label={t("checkin_condition")}
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

export default CheckinForm;
