import RoundedImage from "@/components/common/RoundedImage";
import Grid from "@/components/common/ui/Grid";
import AppointmentCancelButton from "@/components/customer/Appointment/AppointmentCancelButton";
import AppointmentStatusValue from "@/components/customer/Appointment/AppointmentStatusValue";
import LocationPinIcon from "@/components/icons/LovationPinIcon";
import TranslateServer from "@/Helpers/TranslationsServer";
import { getMedia } from "@/Models/Media";
import { AppointmentService } from "@/services/AppointmentService";

const Page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const appoinmentData =
    await AppointmentService.make<AppointmentService>("customer").show(
      appointmentId
    );

  const appointment = appoinmentData?.data ?? undefined;
  return (
    <div className="py-5 px-10 h-full flex flex-col items-start justify-between">
      <div className="flex items-center md:justify-start gap-2">
        <RoundedImage
          src={getMedia(appoinmentData.data?.clinic?.user?.image?.[0])}
          alt={"clinic image"}
        />
        <div className="flex flex-col">
          <h1>{TranslateServer(appointment?.clinic?.name)}</h1>
          <p className="my-2">
            Dr. {TranslateServer(appointment?.clinic?.user?.full_name)}
          </p>
          <div className="flex items-center gap-2">
            <LocationPinIcon className="h-6 w-6 text-error" />
            {TranslateServer(appointment?.clinic?.user?.address?.name)}
          </div>
        </div>
      </div>
      <Grid md={2} sm={1} className="px-3">
        <label className="text-title text-lg">
          Sequence :
          <span className="text-brand-primary">
            {appointment?.appointment_sequence}
          </span>
        </label>
        <label className="text-title text-lg">
          Status : <AppointmentStatusValue status={appointment?.status} />
        </label>
        <label className="text-title text-lg">
          Appointment cost :{" "}
          <span className="text-brand-primary">{appointment?.total_cost}</span>
        </label>
        <label className="text-title text-lg">
          Full name :
          <span className="text-brand-primary">
            {TranslateServer(appointment?.clinic?.user?.full_name)}
          </span>
        </label>

        <label className="text-title text-lg">
          Age :
          <span className="text-brand-primary">
            {appointment?.clinic?.user?.age}
          </span>
        </label>

        <label className="text-title text-lg">
          Address :
          <span className="text-brand-primary">
            {TranslateServer(appointment?.clinic?.user?.address?.name)}
          </span>
        </label>

        <label className="text-title text-lg">
          Date :<span className="text-brand-primary">{appointment?.date}</span>
        </label>
      </Grid>
      <label className="text-title text-lg px-3">
        Note :<span className="text-brand-primary">{appointment?.note}</span>
      </label>
      <AppointmentCancelButton appointment={appointment} />
    </div>
  );
};

export default Page;
