import RoundedImage from "@/components/common/RoundedImage";
import { TranslateClient } from "@/Helpers/TranslationsClient";
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
    <div className="p-5">
      <div className="flex items-center justify-between">
        <RoundedImage
          src={getMedia(appoinmentData.data?.clinic?.user?.image?.[0])}
          alt={"clinic image"}
        />
        <div className="flex flex-col">
          <h1>{TranslateServer(appointment?.clinic?.name)}</h1>
          <p className="my-2">Dr. {TranslateServer(appointment?.clinic?.user?.full_name)}</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
