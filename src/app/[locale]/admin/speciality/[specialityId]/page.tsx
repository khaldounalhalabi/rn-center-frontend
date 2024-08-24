import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { SpecialityService } from "@/services/SpecialityService";
import { Speciality } from "@/Models/Speciality";
import { getTranslations } from "next-intl/server";
import Gallery from "@/components/common/ui/Gallery";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const t = await getTranslations("admin.speciality.show");
  const data =
    await SpecialityService.make<SpecialityService>().show(specialityId);
  const res: Speciality = data?.data;
  const tagsArray = res?.tags?.split(",") ?? [];
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("specialityDetails")}</h2>
        <Link href={`/admin/speciality/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-xl">
            {t("specialityName")} En:{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {(await TranslateServer(res?.name, true)).en}
            </span>
          </h2>
          <h2 className="text-xl">
            {t("specialityName")} Ar:{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {(await TranslateServer(res?.name, true)).ar}
            </span>
          </h2>
        </div>
        <div className="my-5">
          <span className="my-3 w-4/12 text-lg md:text-xl">{t("tags")} : </span>
          {tagsArray ? (
            tagsArray.map((e, index) => (
              <span
                key={index}
                className="rtl:mr-1 ltr:ml-1 text-lg badge badge-neutral"
              >
                {e}
              </span>
            ))
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </div>
        <div className="my-5">
          <h2 className="my-3 text-lg md:text-xl">{t("description")} : </h2>
          <textarea
            rows={4}
            value={res?.description}
            className="textarea-bordered w-full text-lg textarea"
            readOnly={true}
          />
        </div>
        <div className={"w-full"}>
          {res?.image?.length != 0 ? (
            <Gallery media={res?.image ? res?.image : [""]} />
          ) : (
            <div className="flex justify-between items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">{t("noData")}</span>
            </div>
          )}
        </div>
      </div>
    </PageCard>
  );
};

export default page;
