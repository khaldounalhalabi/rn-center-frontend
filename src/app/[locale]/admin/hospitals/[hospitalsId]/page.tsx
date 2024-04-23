import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/i18Router";
import { HospitalService } from "@/services/HospitalService";
import { Hospital } from "@/Models/Hospital";
import { translate } from "@/Helpers/Translations";
import { Department } from "@/Models/Departments";
import { Phone } from "@/Models/Phone";
import Grid from "@/components/common/ui/Grid";
import Gallery from "@/components/common/ui/Gallery";

const page = async ({
  params: { hospitalsId },
}: {
  params: { hospitalsId: number };
}) => {
  const data = await HospitalService.make<HospitalService>().show(hospitalsId);
  const res: Hospital = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Hospital Details</h2>
        <Link href={`/admin/hospitals/${hospitalsId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          Hospital Name En:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {translate(res?.name, true)?.en}
          </span>
        </label>
        <label className="label">
          Hospital Name Ar:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {translate(res?.name, true).ar}
          </span>
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          Phones :
          {res?.phones?.length != 0  ? (
            res?.phones?.map((phone: Phone, index: number) => (
              <span key={index} className="badge badge-neutral">
                {phone.phone}
              </span>
            ))
          ) : (
            <span className="text-lg badge badge-neutral">No Phones</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          Departments :
          {res?.available_departments?.length != 0 ? (
            res?.available_departments?.map((e: Department, index: number) => {
              return (
                <span key={index} className="badge badge-accent">
                  {translate(e.name)}
                </span>
              );
            })
          ) : (
            <span className="text-lg badge badge-neutral">No Departments</span>
          )}
        </label>

        <label className="flex flex-wrap items-center gap-2 w-full label">
          Address :
          {res?.address?.name ? (
                <span  className="badge badge-accent">
                  {translate(res?.address?.name)}
                </span>

          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          City :
          {res?.address?.city ? (
                <span  className="badge badge-accent">
                  {`${res?.address?.city}`}
                </span>

          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
        <div className='flex justify-between'>
          <label className="label">Map : </label>
          <div>{res?.address?.map_iframe ?<div  dangerouslySetInnerHTML={{ __html: res?.address?.map_iframe  }}></div> : <span className="text-lg badge badge-neutral">No Data</span> }</div>
        </div>
         </Grid>
      <Grid md={"1"} >

        {res?.images?.length !=0?
            <Gallery media={res?.images ? res?.images :['']}/>
            :
            <div className='flex items-center justify-between'>
              <label className='label'> Image : </label>
              <span className="text-lg badge badge-neutral">No Data</span>
            </div>
        }
      </Grid>
    </PageCard>
  );
};

export default page;
