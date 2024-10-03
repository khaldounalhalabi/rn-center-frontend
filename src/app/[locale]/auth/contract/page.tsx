import PageCard from "@/components/common/ui/PageCard";
import AgreeContractButton from "@/components/doctor/contract/AgreeContractButton";
import { SettingKeysEnum } from "@/enum/SettingKeysEnum";
import { Link } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import { SettingService } from "@/services/SettingService";

const Page = async () => {
  const setting = await SettingService.make<SettingService>(
    "public"
  ).getByLabel(SettingKeysEnum.ClinicContract);

  return (
    <PageCard>
      <div className="h-[75vh]">
        <div
          className="textarea textarea-bordered h-full w-full overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: setting?.data?.value }}
        ></div>
      </div>
      <p className="font-medium">
        <strong>Note: </strong> you must agree on the contract to be able to
        continue using POM system , please read carefully
      </p>
      <div className="flex items-center justify-end">
        <AgreeContractButton />
      </div>
    </PageCard>
  );
};

export default Page;
