import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Link from "next/link";
import { translate } from "@/Helpers/Translations";
import { SpecialityService } from "@/services/SpecialityService";
import { AddSpeciality } from "@/Models/Speciality";
import { getCookieClient } from "@/Actions/clientCookies";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const data =
    await SpecialityService.make<SpecialityService>().show(specialityId);
  const res: AddSpeciality = data?.data;
  const tagsArray = res?.tags.split(",");
  const locale = getCookieClient('NEXT_LOCALE');
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Speciality Details</h2>
        <Link href={`${locale}/admin/speciality/${res.id}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-xl">
            Speciality Name En:{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {translate(res?.name, true).en}
            </span>
          </h2>
          <h2 className="text-xl">
            Speciality Name Ar:{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {translate(res?.name, true).ar}
            </span>
          </h2>
        </div>
        <div className="my-5">
          <span className="my-3 w-4/12 text-lg md:text-xl">tags : </span>
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
            <span className="text-lg badge badge-neutral">no data</span>
          )}
        </div>
        <div className="my-5">
          <h2 className="my-3 text-lg md:text-xl">Description : </h2>
          <textarea
            rows={4}
            value={res?.description}
            className="textarea-bordered w-full text-lg textarea"
            readOnly={true}
          />
        </div>
      </div>
    </PageCard>
  );
};

export default page;
