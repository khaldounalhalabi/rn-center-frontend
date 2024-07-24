import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { AppointmentService } from "@/services/AppointmentService";
import { Appointment } from "@/Models/Appointment";
import AppointmentOverview from "@/components/doctor/appointment/AppointmentOverview";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const data =
    await AppointmentService.make<AppointmentService>("doctor").show(
      appointmentId,
    );
  const res: Appointment = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Appointment Details</h2>
        {res?.type == "online" && res?.status == "checkout" ? (
          ""
        ) : (
          <Link href={`/doctor/appointment/${res.id}/edit`}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
          </Link>
        )}
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <Grid md={"2"}>
          <label className="label justify-start text-xl">
            Clinic Name :{" "}
            <span className="ml-2 badge badge-success ">
              {await TranslateServer(res?.clinic?.name)}
            </span>
          </label>
          <label className="label justify-start text-xl">
            Doctor Name :{" "}
            <span className="ml-2 badge badge-accent  ">
              {await TranslateServer(res?.clinic?.user?.first_name)}{" "}
              {await TranslateServer(res?.clinic?.user?.middle_name)}{" "}
              {await TranslateServer(res?.clinic?.user?.last_name)}
            </span>
          </label>
          <label className="label justify-start text-xl">
            Customer Name :{" "}
            <span className="ml-2 badge badge-neutral ">
              {await TranslateServer(res?.customer?.user?.first_name)}{" "}
              {await TranslateServer(res?.customer?.user?.middle_name)}{" "}
              {await TranslateServer(res?.customer?.user?.last_name)}{" "}
            </span>
          </label>
          <label className="label justify-start text-xl">
            Service Name :{" "}
            <span className="ml-2 badge badge-primary  ">
              {await TranslateServer(res?.service?.name)}
            </span>
          </label>
        </Grid>
        <div className="px-2 sm:px-0 py-16 w-full">
          <AppointmentOverview appointment={res} />
        </div>
      </div>
    </PageCard>
  );
};

export default page;