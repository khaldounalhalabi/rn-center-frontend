import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import RoundedImage from "@/components/common/RoundedImage";
import LocationPinIcon from "@/components/icons/LovationPinIcon";
import TranslateServer from "@/Helpers/TranslationsServer";
import { getMedia } from "@/Models/Media";
import { Link } from "@/navigation";
import { ClinicsService } from "@/services/ClinicsService";
import ClinicTaps from "@/components/customer/Clinic/ClinicTaps";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data = await ClinicsService.make<ClinicsService>("public").show(clinicId);
  const clinic = data?.data
  return (
    <div className="p-10">
      <div className="w-full flex md:flex-row flex-col justify-between items-center  pb-2">
        <div className="flex md:flex-row flex-col items-center justify-center md:justify-start gap-2">
          <RoundedImage
            className={"hidden md:block"}
            src={
            clinic?.user?.image?.[0]
                ? getMedia(clinic?.user?.image?.[0])
                : "/no-clinic-image.png"
          }
            alt={"clinic image"}
          />
          <div className="max-h-[45vh]">
            <img
              className="md:hidden w-full h-full"
              src={
                clinic?.user?.image?.[0]
                    ? getMedia(clinic?.user?.image?.[0])
                    : "/no-clinic-image.png"
              }
            />
          </div>
          <div className="hidden md:flex flex-col items-start justify-start">
            <h1 className="text-title text-lg">
              {await TranslateServer(clinic?.name)}
            </h1>
            <p className="text-gray-400 text-sm md:text-md">
              Dr. {await TranslateServer(clinic?.user?.full_name)}
            </p>
            <div className="flex items-center gap-2">
              <LocationPinIcon className="h-6 w-6 text-error" />
              {await TranslateServer(clinic?.user?.address?.name)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex md:hidden flex-col items-start justify-start">
            <h1 className="text-title text-sm md:text-lg">
              {await TranslateServer(clinic?.name)}
            </h1>
            <p className="text-gray-400 text-xs md:text-md">
              Dr. {await TranslateServer(clinic?.user?.full_name)}
            </p>
            <div className="flex items-center gap-2 text-xs md:text">
              <LocationPinIcon className="h-6 w-6 text-error" />
              {await TranslateServer(clinic?.user?.address?.name)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <h1 className="text-brand-primary md:text-lg">
              {clinic?.appointment_cost} IQD
            </h1>
            <Link href={`/customer/clinics/${clinic?.id}/make-appointment`}>
              <AuthSubmitButton className="md:px-10 md:py-3 px-3 py-1">
                Book
              </AuthSubmitButton>
            </Link>
          </div>
        </div>
      </div>
      <ClinicTaps clinic={clinic}/>

    </div>
  );
};

export default Page;