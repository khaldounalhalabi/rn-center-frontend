import PageCard from "@/components/common/ui/PageCard";
import AgreeContractButton from "@/components/doctor/contract/AgreeContractButton";
import { SettingKeysEnum } from "@/enum/SettingKeysEnum";
import { Link } from "@/navigation";
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
      <div className="flex items-center justify-between">
        <Link className="btn btn-neutral" href={"/"}>
          Reject
        </Link>
        <AgreeContractButton />
      </div>
    </PageCard>
  );
};

export default Page;
