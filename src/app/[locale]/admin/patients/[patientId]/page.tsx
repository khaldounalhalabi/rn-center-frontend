import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { User } from "@/Models/User";
import { Phone } from "@/Models/Phone";
import { PatientService } from "@/services/PatientService";
import RoundedImage from "@/components/common/RoundedImage";
import { getMedia } from "@/Models/Media";
import TranslateServer from "@/Helpers/TranslationsServer";
import PatientsOverview from "@/components/admin/patients/PatientsOverview";
import { Customer } from "@/Models/Customer";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.patient.show");

  const data = await PatientService.make<PatientService>().show(patientId);
  const user: User | undefined = data?.data.user;
  const patient: Customer = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("patientDetails")}</h2>
        <Link href={`/admin/patients/${patientId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <div className={`flex md:flex-row flex-col items-center gap-3`}>
          <RoundedImage
            src={getMedia(user?.image?.[0] ?? undefined)}
            alt={"doctor-profile"}
            className={"w-24 h-24"}
          />
          <div className={"flex flex-col"}>
            <h2 className={"font-bold text-lg"}>
              <span>
                {await TranslateServer(user?.first_name)}{" "}
                {await TranslateServer(user?.middle_name)}{" "}
                {await TranslateServer(user?.last_name)}
              </span>
            </h2>
            <h3>{user?.email}</h3>
            <div className={"flex gap-1"}>
              {t("phone")} :{" "}
              {user?.phones?.slice(0, 2).map((item: Phone, index) => {
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

      <PatientsOverview patient={patient} id={patientId} />
    </PageCard>
  );
};

export default page;
