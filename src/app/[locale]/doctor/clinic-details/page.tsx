import PageCard from "@/components/common/ui/PageCard";
import {Link} from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslateServer from "@/Helpers/TranslationsServer";
import MapIFrame from "@/components/common/ui/MapIFrame";
import {Clinic} from "@/Models/Clinic";
import {AuthService} from "@/services/AuthService";
import RoundedImage from "@/components/common/RoundedImage";
import {getMedia} from "@/Models/Media";
import {Phone} from "@/Models/Phone";
import {TranslateClient} from "@/Helpers/TranslationsClient";


const page = async ()=>{

    const data = await AuthService.make<AuthService>("doctor").GetClinicDetails()
    const res :Clinic = data.data
    console.log(res)
    return (
      <PageCard>
        <div className="flex justify-between items-center  w-full h-24">
          <h2 className="card-title ">Clinic Name : {' '}
            {await TranslateServer(res.name)}{" "}

          </h2>

          <Link href={`/doctor/clinic-details/edit`}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
          </Link>
        </div>
        <hr />
          <div className={"card p-5 bg-base-200 my-3 "}>
              <div className={`flex items-center gap-3`}>
                  <RoundedImage
                      src={getMedia(res?.user?.image?.[0] ?? undefined)}
                      alt={"doctor-profile"}
                      className={"w-24 h-24"}
                  />
                  <div className={"flex flex-col"}>
                      <h2 className={"font-bold text-lg"}>
                          {await TranslateServer(res?.name)}
                      </h2>
                      <h3>
                          {await TranslateServer(res?.user?.first_name)}{" "}
                          {await TranslateServer(res?.user?.middle_name)}{" "}
                          {await TranslateServer(res?.user?.last_name)}
                      </h3>
                      <p>{res?.user?.email}</p>
                      <div className={"flex gap-1"}>
                          {res?.user?.phones?.slice(0, 2).map((item: Phone, index) => {
                              return (
                                  <p key={item.id}>
                                      {item.phone} {index != 0 && index != 2 ? "/" : ""}
                                  </p>
                              );
                          })}
                      </div>
                  </div>
              </div>
              <div className={"grid grid-cols-1 md:grid-cols-3 gap-3"}>
                  <div
                      className={
                          "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
                      }
                  >
                      <h1 suppressHydrationWarning>
                          {res?.total_appointments?.toLocaleString()}
                      </h1>
                      <h2>{("Total Appointments")}</h2>
                  </div>
                  <div
                      className={
                          "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
                      }
                  >
                      <h1 suppressHydrationWarning>
                          {res?.today_appointments_count.toLocaleString()}
                      </h1>
                      <h2>{("Today Appointments")}</h2>
                  </div>
                  <div
                      className={
                          "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
                      }
                  >
                      <h1 suppressHydrationWarning>
                          {res?.upcoming_appointments_count.toLocaleString()}
                      </h1>
                      <h2 className={""}>{("Upcoming Appointments")}</h2>
                  </div>
              </div>
          </div>
          <div className={"card p-5 bg-base-200 my-3 w-full"}>
              <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                  <div className={"w-full"}>
                      <label className={"label"}>{("Specializations")} :</label>
                      <div className={"flex flex-wrap w-full gap-3"}>
                          {res?.specialities?.map((spec) => {
                              return (
                                  <div key={spec.id} className={"badge badge-info"}>
                                      {TranslateClient(spec.name)}
                                  </div>
                              );
                          })}
                      </div>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>Approximate Appointment Time : </label>
                      <div className={"badge badge-neutral"}>
                          {res?.approximate_appointment_time} min
                      </div>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{("Status")} : </label>
                      <p className={"badge badge-warning"}>{res?.status}</p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{("Experience Year")} : </label>
                      <p className={"badge badge-accent"}>{res?.experience_years}</p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{("Address")} :</label>
                      <div className={"flex flex-col"}>
                          <p>{TranslateClient(res?.user?.address?.name)}</p>
                          <p>{TranslateClient(res?.user?.address?.city?.name)}</p>
                          <p>{res?.user?.address?.country}</p>
                      </div>
                  </div>

                  <div className={"w-full"}>
                      <label className={"label"}>{("Cost")} :</label>
                      <p className={"badge badge-primary"} suppressHydrationWarning>
                          {res?.appointment_cost.toLocaleString()} IQD
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{("Max Appointments Per Day")} :</label>
                      <p className={"badge badge-warning"} suppressHydrationWarning>
                          {res?.max_appointments.toLocaleString()}
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>
                          {("Appointment Day Range")} :
                      </label>
                      <p className={"badge badge-neutral"}>
                          {res?.appointment_day_range}
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{("Hospital")} :</label>
                      <p className={"badge badge-error"}>
                          {TranslateClient(res?.hospital?.name) ?? "No Hospital"}
                      </p>
                  </div>

                  <div className={"w-full"}>
                      <label className={"label"}>{("Registered at")} :</label>
                      <p className={"badge badge-secondary"}>{res?.created_at}</p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{("last Updated At")} :</label>
                      <p className={"badge badge-accent"}>{res?.updated_at}</p>
                  </div>

                  <div className={"w-full"}>
                      <label className={"label"}>Subscription :</label>
                      <p className={"badge badge-warning"}>
                          {res?.active_subscription?.subscription?.name}
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{"Subscription Type"} :</label>
                      <p className={"badge badge-primary"}>
                          {res?.active_subscription?.type}
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{"Subscription Cost"} :</label>
                      <p className={"badge badge-success"}>
                          {res?.active_subscription?.subscription?.cost ?? 0}
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{"Deduction Cost"} :</label>
                      <p className={"badge badge-success"}>
                          {res?.active_subscription?.deduction_cost ?? 0}
                      </p>
                  </div>
                  <div className={"w-full"}>
                      <label className={"label"}>{"Subscription Start Time"} :</label>
                      <p className={"badge badge-neutral"}>
                          {res?.active_subscription?.start_time}
                      </p>
                  </div>
                  {(res?.active_subscription?.subscription?.period ?? 0) >= 0 && (
                      <div className={"w-full"}>
                          <label className={"label"}>{"End Time"} :</label>
                          <p className={"badge badge-accent"}>
                              {res?.active_subscription?.end_time}
                          </p>
                      </div>
                  )}
              </div>
              <div className={"w-full"}>
                  <label className={"label"}>{"Subscription Description"} :</label>
                  <textarea
                      className="textarea textarea-bordered h-24 w-full"
                      disabled={true}
                      defaultValue={res?.active_subscription?.subscription?.description}
                  ></textarea>
              </div>
              <div className={"w-full"}>
                  <label className={"label"}>{("Experience")} :</label>
                  <textarea
                      className="textarea textarea-bordered h-24 w-full"
                      disabled={true}
                      defaultValue={res?.experience}
                  ></textarea>
              </div>
              <div className={"w-full"}>
                  <label className={"label"}>{("About")} :</label>
                  <textarea
                      className="textarea textarea-bordered h-24 w-full"
                      disabled={true}
                      defaultValue={res?.about_us}
                  />
              </div>
              <MapIFrame iframe={res?.user?.address?.map_iframe} />
          </div>
      </PageCard>
    );
}

export default page