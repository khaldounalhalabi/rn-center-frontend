import useUser from "@/hooks/UserHook";
import { RealTimeEventsTypeEnum } from "@/models/NotificationPayload";
import { AuthService } from "@/services/AuthService";
import { ReactNode } from "react";
import { NotificationHandler } from "../common/helpers/NotificationHandler";

const PermissionProvider = ({ children }: { children?: ReactNode }) => {
  const { user, setUser } = useUser();
  return (
    <NotificationHandler
      handle={(payload) => {
        if (payload.type == RealTimeEventsTypeEnum.PermissionsUpdated) {
          AuthService.make()
            .me()
            .then((response) => {
              setUser(response?.data);
              console.log("Permissions updated");
            });
        }
      }}
    >
      {children}
    </NotificationHandler>
  );
};

export default PermissionProvider;
