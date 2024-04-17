import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Link from "next/link";
import { HospitalService } from "@/services/HospitalService";
import { AddHospital, Hospital } from "@/Models/Hospital";
import { translate } from "@/Helpers/Translations";
import { Department } from "@/Models/Departments";
import { Phone } from "@/Models/Phone";
import Grid from "@/components/common/ui/Grid";
import { Media, getMedia } from "@/Models/Media";

const page = async ({
  params: { hospitalsId },
}: {
  params: { hospitalsId: number };
}) => {
  const data = await HospitalService.make().show(hospitalsId);
  const res: Hospital = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Holiday Details</h2>
        <Link href={`/admin/hospitals/${hospitalsId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-xl">
            Hospital Name En:{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {translate(res?.name, true)?.en}
            </span>
          </h2>
          <h2 className="text-xl">
            Hospital Name Ar:{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {translate(res?.name, true).ar}
            </span>
          </h2>
        </div>
        <div className="my-5">
          {res?.phones ? (
            <Grid md={"2"}>
              {res?.phones?.map((phone: Phone, index: number) => (
                <div key={index} className="">
                  <span className="inline-block my-3 w-3/12 text-lg md:text-xl">
                    Phone {index} :
                  </span>
                  <span className="text-lg badge badge-neutral">
                    {phone.phone}
                  </span>
                </div>
              ))}
            </Grid>
          ) : (
            <div>
              <span className="inline-block my-3 w-3/12 text-lg md:text-xl">
                Phone :{" "}
              </span>
              <span className="text-lg badge badge-neutral">No Phones</span>
            </div>
          )}
        </div>
        <div className="my-5">
          <span className="inline-block my-3 w-3/12 text-lg md:text-xl">
            Departments :{" "}
          </span>
          {res?.available_departments ? (
            res?.available_departments.map((e: Department, index: number) => {
              return (
                <span
                  key={index}
                  className="rtl:mr-1 ltr:ml-1 text-lg badge badge-accent"
                >
                  {translate(e.name)}
                </span>
              );
            })
          ) : (
            <span className="text-lg badge badge-neutral">
              {" "}
              No Departments{" "}
            </span>
          )}
        </div>
        <div className="my-5">
          <span className="my-3 w-3/12 text-lg md:text-xl">Image : </span>
          <div className="flex justify-between my-1">
            {res?.images ? (
              res?.images?.map((e: Media, index: number) => (
                <div
                  key={index}
                  className="bg-gray-400 p-3 rounded-2xl w-5/12 max-h-40"
                >
                  <img
                    src={getMedia(e)}
                    alt=".."
                    className="rounded-2xl w-full h-full"
                  />
                </div>
              ))
            ) : (
              <span className="my-1 text-lg badge badge-accent">No Data</span>
            )}
          </div>
        </div>
      </div>
    </PageCard>
  );
};

export default page;
