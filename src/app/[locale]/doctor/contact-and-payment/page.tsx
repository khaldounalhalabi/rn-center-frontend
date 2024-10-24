import PageCard from "@/components/common/ui/PageCard";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { getTranslations } from "next-intl/server";
import { SettingService } from "@/services/SettingService";
import { SettingKeysEnum } from "@/enum/SettingKeysEnum";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import ImagePreview from "@/components/common/ui/ImagePreview";
import { getMedia } from "@/Models/Media";

const Page = async () => {
  const t = await getTranslations("contact_and_payment");
  const settings = (
    await SettingService.make<SettingService>("public").getByLabels([
      SettingKeysEnum.ZainCashQr,
      SettingKeysEnum.ZainCashNumber,
      SettingKeysEnum.ContactNumber1,
      SettingKeysEnum.ContactNumber2,
      SettingKeysEnum.PaymentWayDescription,
    ])
  )?.data;
  return (
    <PageCard>
      <div className="flex items-center justify-center">
        <ImagePreview
          src={getMedia(
            settings?.filter((s) => s.label == SettingKeysEnum.ZainCashQr)?.[0]
              ?.image?.[0]
          )}
          className="w-1/3"
        />
      </div>
      <Label label={t("payment_description")} col={true}>
        <div
          className="textarea textarea-bordered h-full w-full overflow-y-scroll"
          dangerouslySetInnerHTML={{
            __html:
              settings?.filter(
                (s) => s.label == SettingKeysEnum.PaymentWayDescription
              )?.[0]?.value ?? "",
          }}
        ></div>
      </Label>
      <LabelValue
        label={t("phone")}
        value={
          settings?.filter(
            (s) => s.label == SettingKeysEnum.ContactNumber1
          )?.[0]?.value
        }
        color={"info"}
      />
    </PageCard>
  );
};

export default Page;
