import {SettingService} from "@/services/SettingService";
import {SettingKeysEnum} from "@/enum/SettingKeysEnum";
import PageCard from "@/components/common/ui/PageCard";
import {getTranslations} from "next-intl/server";

const Page = async () => {
    const t = await getTranslations("contact_and_payment");

    const setting = await SettingService.make<SettingService>(
        "public",
    ).getByLabel(SettingKeysEnum.ClinicContract);

    return (
        <PageCard>
            <div className="h-[75vh]">
                <div
                    className="textarea textarea-bordered h-full w-full overflow-y-scroll"
                    dangerouslySetInnerHTML={{ __html: setting?.data?.value }}
                ></div>
            </div>
        </PageCard>
    );
}

export default Page;