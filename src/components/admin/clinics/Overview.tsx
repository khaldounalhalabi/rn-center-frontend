import React from "react";
import { Clinic } from "@/Models/Clinic";

const Overview = ({ clinic }: { clinic?: Clinic | undefined | null }) => {
  return (
    <div className={"card p-5 bg-base-200 my-3 w-full"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
        <div className={"w-full"}>
          <label className={"label"}>Specializations :</label>
          <div className={"flex flex-wrap w-full gap-3"}>
            {clinic?.specialities?.map((spec) => {
              return (
                <div key={spec.id} className={"badge badge-info"}>
                  {spec.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Blood Group : </label>
          <div className={"badge badge-error"}>{clinic?.user?.blood_group}</div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Gender : </label>
          <p className={"badge badge-success"}>{clinic?.user?.gender}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Date Of Birth : </label>
          <div className={"badge badge-neutral"}>
            {clinic?.user?.birth_date}
          </div>
          <label className={"label"}>Age : </label>
          <div className={"badge badge-neutral"}>{clinic?.user?.age}</div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Experience Years : </label>
          <p className={"badge badge-accent"}>{clinic?.experience_years}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Address :</label>
          <div className={"flex flex-col"}>
            <p>{clinic?.user?.address.name}</p>
            <p>{clinic?.user?.address.city.name}</p>
            <p>{clinic?.user?.address.country}</p>
          </div>
        </div>

        <div className={"w-full"}>
          <label className={"label"}>Appointment Cost :</label>
          <p className={"badge badge-primary"}>{clinic?.appointment_cost}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Max Appointments Per Day :</label>
          <p className={"badge badge-warning"}>{clinic?.max_appointments}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>
            Maximum Days To Schedule An Appointment :
          </label>
          <p className={"badge badge-neutral"}>
            {clinic?.appointment_day_range}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Hospital :</label>
          <p className={"badge badge-error"}>
            {clinic?.hospital?.name ?? "No Hospital"}
          </p>
        </div>

        <div className={"w-full"}>
          <label className={"label"}>Registered On :</label>
          <p className={"badge badge-secondary"}>{clinic?.created_at}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>Last Updated At :</label>
          <p className={"badge badge-primary"}>{clinic?.updated_at}</p>
        </div>
      </div>
      <div className={"w-full"}>
        <label className={"label"}>Experience :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={clinic?.experience}
        ></textarea>
      </div>
      <div className={"w-full"}>
        <label className={"label"}>About :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={clinic?.about_us}
        ></textarea>
      </div>
    </div>
  );
};

export default Overview;
