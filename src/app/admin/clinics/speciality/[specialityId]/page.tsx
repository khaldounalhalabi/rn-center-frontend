import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Link from "next/link";
import { translate } from "@/Helpers/ObjectHelpers";
import { SpecialityService } from "@/services/SpecialityService";
import { AddSpeciality } from "@/Models/Speciality";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const data = await SpecialityService.make().show(specialityId);
  const res: AddSpeciality = data?.data;

  return (
    <PageCard>
      <div className="w-full h-24 flex justify-between items-center">
        <h2 className="card-title">Holiday Details</h2>
        <Link href={`/admin/clinics/speciality/${res.id}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="my-2 flex justify-between items-center">
          <h2 className="text-xl">
            Speciality Name :{" "}
            <span className="text-lg bg-base-200 rounded-xl px-2">
              {translate(res?.name)}
            </span>
          </h2>
        </div>
        <div className="my-5">
          <h2 className="text-lg md:text-xl my-3">tags : </h2>
          <p className="text-lg  alert alert-info">{res.tags}</p>
        </div>
        <div className="my-5">
          <h2 className="text-lg md:text-xl my-3">Description : </h2>
          <p className="text-lg alert alert-success">{res.description}</p>
        </div>
      </div>
    </PageCard>
  );
};

export default page;
