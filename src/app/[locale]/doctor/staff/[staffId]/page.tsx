import { User } from "@/Models/User";
import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import { getMedia } from "@/Models/Media";
import RoundedImage from "@/components/common/RoundedImage";
import TranslateServer from "@/Helpers/TranslationsServer";
import { StaffService } from "@/services/StaffService";
import { Phone } from "@/Models/Phone";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";

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
  const data = await StaffService.make<StaffService>("doctor").show(staffId);
  const res: User | undefined = data.data.user;
  const permission = formatPermissions(res?.permissions ?? []);
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Patient Details</h2>
        <Link href={`/doctor/staff/${staffId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <div className={`flex items-center gap-3`}>
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
              Phone :{" "}
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
        <label className="label justify-start text-xl">
          Birth Date :{" "}
          <span className="ml-2 badge badge-outline  ">{res?.birth_date}</span>
        </label>
        <label className="label justify-start text-xl">
          Age : <span className="ml-2 badge badge-accent  ">{res?.age}</span>
        </label>
        <label className="label justify-start text-xl">
          Address :{" "}
          <span className="ml-2 badge badge-success  ">
            {TranslateClient(res?.address?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          City :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {TranslateClient(res?.address?.city?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          gender :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.gender}</span>
        </label>
        <label className="label justify-start text-xl">
          blood_group :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.blood_group}</span>
        </label>
        <label className="label justify-start text-xl">
          Is Blocked :{" "}
          {res?.is_blocked ? (
            <span className="ml-2 badge badge-error">Blocked</span>
          ) : (
            <span className="ml-2 badge badge-success">Not Blocked</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          Is Archived :{" "}
          {res?.is_archived ? (
            <span className="ml-2 badge badge-neutral">Archived</span>
          ) : (
            <span className="ml-2 badge badge-warning">Not Archived</span>
          )}
        </label>
      </Grid>
      <label className={"label"}>Permission : </label>
      <Grid md={3}>
        {" "}
        {permission.map((e, index) => (
          <span key={index} className={"badge w-fit p-2 my-2 badge-outline"}>
            {e}
          </span>
        ))}
      </Grid>
    </PageCard>
  );
};

export default page;
