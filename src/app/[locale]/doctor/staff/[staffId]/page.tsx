import { User } from "@/Models/User";
import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import { getMedia } from "@/Models/Media";
import RoundedImage from "@/components/common/RoundedImage";
import TranslateServer, {TranslateStatusOrTypeServer} from "@/Helpers/TranslationsServer";
import { StaffService } from "@/services/StaffService";
import { Phone } from "@/Models/Phone";
import Grid from "@/components/common/ui/Grid";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";

function formatPermission(permission: string): string {
  return permission
    .split("-") // قسّم النص إلى أجزاء عند كل شرطة
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // كبّر أول حرف من كل كلمة
    .join(" "); // أعد تجميع الأجزاء مع فراغ بين كل جزء
}

function formatPermissions(permissions: string[]): string[] {
  return permissions.map(formatPermission);
}

const page = async ({
  params: { staffId },
}: {
  params: { staffId: number };
}) => {
  const t = await getTranslations("doctor.staff.show");
  const data = await StaffService.make<StaffService>("doctor").show(staffId);
  const res: User | undefined = data.data.user;
  const permission = formatPermissions(res?.permissions ?? []);
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("staffDetails")}</h2>
        <Link href={`/doctor/staff/${staffId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <div className={`flex flex-col md:flex-row items-center gap-3`}>
          <RoundedImage
            src={getMedia(res?.image?.[0] ?? undefined)}
            alt={"doctor-profile"}
            className={"w-24 h-24"}
          />
          <div className={"flex flex-col"}>
            <h2 className={"font-bold text-lg"}>
              <span>
                {await TranslateServer(res?.first_name)}{" "}
                {await TranslateServer(res?.middle_name)}{" "}
                {await TranslateServer(res?.last_name)}
              </span>
            </h2>
            <h3>{res?.email}</h3>
            <div className={"flex gap-1"}>
              {t("phones")} :{" "}
              {res?.phones?.slice(0, 2).map((item: Phone, index) => {
                return (
                  <span className="ml-2 badge badge-accent  " key={item.id}>
                    {" "}
                    {item.phone} {index != 0 && index != 2 ? "/" : ""}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue label={t("birth-date")} value={res?.birth_date} />
        <LabelValue label={t("age")} value={res?.age} color={"info"} />
        <LabelValue
          label={t("address")}
          value={await TranslateServer(res?.address?.name)}
          color={"error"}
        />
        <LabelValue
          label={t("city")}
          value={await TranslateServer(res?.address?.city?.name)}
          color={"secondary"}
        />
        <LabelValue label={t("gender")} value={await TranslateStatusOrTypeServer(res?.gender)} />
        <LabelValue label={t("blood")} value={res?.blood_group} />
        <LabelValue
          label={t("isBlocked")}
          value={res?.is_blocked ? t("blocked") : t("notBlocked")}
          color={res?.is_blocked ? "error" : "success"}
        />

        <LabelValue
          label={t("isArchived")}
          value={res?.is_archived ? t("archived") : t("notArchived")}
          color={res?.is_archived ? "warning" : "neutral"}
        />
      </Grid>
      <Label label={t("permission")} col={true}>
        <Grid md={3}>
          {" "}
          {permission.map((e, index) => (
            <span key={index} className={"badge w-fit p-2 my-2 badge-outline"}>
              {e}
            </span>
          ))}
        </Grid>
      </Label>
    </PageCard>
  );
};

export default page;
