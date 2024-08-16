import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { SettingService } from "@/services/SettingService";
import SettingForm from "@/components/admin/setting/SettingForm";

const page = async ({
  params: { settingId },
}: {
  params: { settingId: number };
}) => {
  const setting =
    await SettingService.make<SettingService>("admin").show(settingId);
  console.log(setting);
  return (
    <PageCard>
      <h2 className="card-title">Edit Setting</h2>
      <SettingForm
        defaultValues={{
          ...setting.data,
        }}
      />
    </PageCard>
  );
};

export default page;
