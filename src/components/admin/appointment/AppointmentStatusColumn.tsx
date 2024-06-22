import { Appointment } from "@/Models/Appointment";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import NotificationHandler from "@/components/common/NotificationHandler";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import { AppointmentService } from "@/services/AppointmentService";
import { toast } from "react-toastify";
import { swal } from "@/Helpers/UIHelpers";

const AppointmentStatusColumn = ({
  appointment,
  revalidate,
}: {
  appointment?: Appointment;
  revalidate?: () => void;
}) => {
  const handleSelectStatus = async (
    status: string,
    id: number,
    setSelected: React.Dispatch<string | undefined>,
  ) => {
    if (status == AppointmentStatusEnum.CHECKIN) {
      swal
        .fire({
          title: "Are you sure?",
          text: "marking this appointment as checkin will cause all previous appointments which marked as checkin to be checkout!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            return AppointmentService.make<AppointmentService>("admin")
              .toggleStatus(id, {
                status: status,
              })
              .then((res) => {
                toast.success("Status Changed!");
              });
          } else {
            setSelected(appointment?.status);
          }
        });
    } else {
      return await AppointmentService.make<AppointmentService>("admin")
        .toggleStatus(id, {
          status: status,
        })
        .then((res) => {
          toast.success("Status Changed!");
        });
    }
  };

  return (
    <>
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.getNotificationType() ==
              RealTimeEvents.AppointmentStatusChange &&
            revalidate
          ) {
            revalidate();
          }
        }}
      />
      <SelectPopOver
        id={appointment?.id}
        status={appointment?.status}
        ArraySelect={AppointmentStatuses()}
        handleSelect={handleSelectStatus}
      />
    </>
  );
};

export default AppointmentStatusColumn;