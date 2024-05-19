import { Appointment } from "@/Models/Appointment";
import { NotificationsType } from "@/Models/NotificationPayload";
import NotificationHandler from "@/components/common/NotificationHandler";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import AppointmentStatuses from "@/enm/AppointmentStatus";
import { AppointmentService } from "@/services/AppointmentService";

const AppointmentStatusColumn = ({
  appointment,
  revalidate,
}: {
  appointment?: Appointment;
  revalidate?: () => void;
}) => {
  const handleSelectStatus = async (status: string, id: number) => {
    return await AppointmentService.make("admin").update(id, {
      status: status,
    });
  };

  return (
    <>
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.getNotificationType() ==
              NotificationsType.AdminAppointmentStatusChanged &&
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
