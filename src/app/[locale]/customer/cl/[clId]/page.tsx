import { Navigate } from "@/Actions/navigate";
import MakeAppointmentForm from "@/components/customer/Appointment/MakeAppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";
import { ClinicsService } from "@/services/ClinicsService";

const Page = async ({ params: { clId } }: { params: { clId: number } }) => {
  const clinic = (
    await ClinicsService.make<ClinicsService>("public").show(clId)
  )?.data;

  console.log(clinic);

  if (!clinic) {
    await Navigate("/404");
  }

  const availableTimes = (
    await AppointmentService.make<AppointmentService>(
      "customer"
    ).getAvailableTimes(clinic.id)
  )?.data;

  return (
    <MakeAppointmentForm availableTimes={availableTimes} clinic={clinic} />
  );
};

export default Page;
