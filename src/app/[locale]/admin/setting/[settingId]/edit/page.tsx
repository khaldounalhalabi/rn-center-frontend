import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { SettingService } from "@/services/SettingService";
import SettingForm from "@/components/admin/setting/SettingForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { settingId },
}: {
  params: { settingId: number };
}) => {
  const t = await getTranslations("admin.setting");
  const setting =
    await SettingService.make<SettingService>("admin").show(settingId);
  return (
    <PageCard>
      <h2 className="card-title">{t("editSetting")}</h2>
      <SettingForm
        defaultValues={{
          ...setting.data,
        }}
      />
    </PageCard>
  );
};

export default page;
