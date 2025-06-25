import AssetTypeEnum from "@/enums/AssetTypeEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import Asset from "@/models/Asset";
import AssetService from "@/services/AssetService";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Form from "../ui/Form";
import Grid from "../ui/Grid";
import FormDatepicker from "../ui/date-time-pickers/FormDatepicker";
import Gallery from "../ui/images/Gallery";
import ImageUploader from "../ui/images/ImageUploader";
import FormInput from "../ui/inputs/FormInput";
import FormSelect from "../ui/selects/FormSelect";

function generateSerialNumber(length: number = 10): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let serial = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    serial += characters[randomIndex];
  }
  return serial;
}

const AssetForm = ({
  asset,
  type,
  onSuccess,
}: {
  asset?: Asset;
  type: "store" | "update";
  onSuccess?: () => Promise<void> | void;
}) => {
  const { image, ...rest } = asset ?? { image: [] };

  const t = useTranslations("assets");
  const [selectedType, setSelectedType] = useState<AssetTypeEnum | undefined>(
    asset?.type,
  );

  const { role } = useUser();
  const onSubmit = (data: any) => {
    const service = AssetService.make(role);
    if (type == "store") {
      return service.store(data);
    } else {
      return service.update(asset?.id, data);
    }
  };

  const success = async () => {
    if (onSuccess) {
      await onSuccess();
    }
  };

  return (
    <Form handleSubmit={onSubmit} onSuccess={success} defaultValues={rest}>
      <Grid>
        <FormInput name="name" label={t("name")} />
        {type == "store" && (
          <FormSelect
            items={getEnumValues(AssetTypeEnum)}
            label={t("type")}
            onChange={(v) => setSelectedType(v as AssetTypeEnum)}
            name="type"
          />
        )}
        {selectedType == AssetTypeEnum.ASSET && (
          <FormInput
            name="serial_number"
            label={t("serial_number")}
            defaultValue={
              type == "store" ? generateSerialNumber(7) : asset?.serial_number
            }
          />
        )}
        {selectedType != AssetTypeEnum.ASSET && (
          <FormInput type="number" name="quantity" label={t("quantity")} />
        )}
        <FormDatepicker
          name="purchase_date"
          label={t("purchase_date")}
          df={asset?.purchase_date ?? dayjs().format("YYYY-MM-DD")}
        />
        {selectedType != AssetTypeEnum.ASSET && (
          <FormInput name="quantity_unit" label={t("quantity_unit")} />
        )}
        <div className="md:col-span-2">
          {type == "update" && (asset?.image?.length ?? 0) > 0 && (
            <Gallery media={asset?.image ?? []} sm />
          )}
          <ImageUploader name="image" label={t("image")} />
        </div>
      </Grid>
    </Form>
  );
};

export default AssetForm;
