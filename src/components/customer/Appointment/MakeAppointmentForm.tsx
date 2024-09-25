"use client";
import { Navigate } from "@/Actions/navigate";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import { AppointmentService } from "@/services/AppointmentService";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { HandleDatePicker } from "@/hooks/CheckTimeAvailable";
import Input from "@/components/common/ui/Inputs/Input";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ApiResponse } from "@/Http/Response";
import { SystemOffersService } from "@/services/SystemOffersService";
import { SystemOffers } from "@/Models/SystemOffer";
import { Clinic } from "@/Models/Clinic";
import { AvailableTime } from "@/Models/AvailableTime";

const MakeAppointmentForm = ({
  clinic,
  availableTimes,
}: {
  clinic: Clinic;
  availableTimes: AvailableTime;
}) => {
  const handleSubmit = (data: { date: string; note: string }) => {
    return AppointmentService.make<AppointmentService>("customer").store({
      clinic_id: clinic.id,
      ...data,
    });
  };
  return (
    <div className="p-10 w-full">
      <Form
        handleSubmit={handleSubmit}
        onSuccess={() => {
          Navigate("/customer/appointments");
        }}
        otherSubmitButton={(isSubmitting) => (
          <AuthSubmitButton isSubmitting={isSubmitting}>
            Submit
          </AuthSubmitButton>
        )}
        defaultButton={false}
      >
        <Grid gap={5}>
          <Datepicker
            name={"date"}
            label={"Date"}
            required={true}
            shouldDisableDate={(day) => {
              return HandleDatePicker(
                availableTimes,
                day,
                clinic.appointment_day_range,
                clinic.max_appointments,
              );
            }}
          />{" "}
          <Input
            className="input input-bordered w-full focus:outline-brand-primary focus:border-brandoutline-brand-primary"
            label={"Note"}
            type={"text"}
            name={"note"}
          />
          <ApiSelect
            api={function (
              page?: number,
              search?: string,
            ): Promise<ApiResponse<SystemOffers[]>> {
              return SystemOffersService.make<SystemOffersService>(
                "public",
              ).getSystemOffersByClinic(clinic.id, page, search);
            }}
            name={"system_offers"}
            placeHolder={"Select an offer ..."}
            label={"Available Offers"}
            optionValue={"id"}
            optionLabel="title"
            isMultiple={true}
            closeOnSelect={true}
          />
        </Grid>
      </Form>
    </div>
  );
};

export default MakeAppointmentForm;
