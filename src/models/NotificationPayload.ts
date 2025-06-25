import { getClientCookie } from "@/actions/ClientCookies";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";

export class NotificationPayload {
  private message_en: string = "";
  private message_ar: string = "";
  private resource_id: string | number = 0;
  private resource_type: string = "";
  private notification_title: string = "";
  private notification_type: NotificationsTypeEnum;
  private data: Record<string, any> = {};

  constructor(data: Record<string, any>) {
    this.data = data;
    this.message_ar = data?.message_ar ?? "";
    this.message_en = data?.message_en ?? "";
    this.resource_id = data?.resource_id ?? 0;
    this.resource_type = data?.resource ?? "";
    this.notification_type = data?.type ?? "";
    this.notification_title = data?.title;
  }

  public get messageEn(): string {
    return this.message_en;
  }

  public get messageAr(): string {
    return this.message_ar;
  }

  public get resourceId(): string | number {
    return this.resource_id;
  }

  public get resource(): string {
    return this.resource_type;
  }

  public get title(): string {
    return this.notification_title;
  }

  public get type(): NotificationsTypeEnum | RealTimeEventsTypeEnum {
    return this.notification_type;
  }

  public getData(key: string) {
    return getNestedPropertyValue(this.data, key);
  }

  public isNotification() {
    if (this.type != undefined) {
      return (Object.values(NotificationsTypeEnum) as Array<string>).includes(
        String(this.type),
      );
    } else {
      return false;
    }
  }

  public isRealTimeEvent() {
    if (this.type != undefined) {
      return (Object.values(RealTimeEventsTypeEnum) as Array<string>).includes(
        this.type as string,
      );
    } else {
      return false;
    }
  }

  public get message(): string {
    const locale = getClientCookie("NEXT_LOCALE") ?? "en";
    if (locale == "ar") {
      return this.messageAr;
    } else {
      return this.messageEn;
    }
  }

  public getUrl(role: RoleEnum, permissions: PermissionEnum[]): string {
    const type = this.type;
    switch (type) {
      case NotificationsTypeEnum.NewVacationRequest:
        return `/${role}/vacations?vacation_id=${this.getData("vacation_id")}`;
      case NotificationsTypeEnum.PayslipStatusChanged:
        return `/${role}/payruns/${this.getData("payrun_id")}?payslip_id=${this.getData("payslip_id")}`;

      case NotificationsTypeEnum.AppointmentEvent:
        if (this.getData("event") != "DELETED") {
          return `/${role}/appointment/${this.getData("appointment_id")}`;
        } else {
          return "";
        }

      case NotificationsTypeEnum.NewPayrunAdded:
        return `/${role}/payslips?payslip_id=${this.getData("payslip_id")}`;
      case NotificationsTypeEnum.PayslipUpdated:
        return `/${role}/payslips?payslip_id=${this.getData("payslip_id")}`;
      case NotificationsTypeEnum.NewVacationAdded:
        return `/${role}/vacations?vacation_id=${this.getData("vacation_id")}`;
      case NotificationsTypeEnum.VacationStatusChanged:
        return `/${role}/vacations?vacation_id=${this.getData("vacation_id")}`;
      case NotificationsTypeEnum.VacationUpdated:
        return `/${role}/vacations?vacation_id=${this.getData("vacation_id")}`;
      case NotificationsTypeEnum.NewTaskComment:
        return `/${role}/tasks?task_id=${this.getData("task_id")}`;
      case NotificationsTypeEnum.TaskStatusChanged:
        return `/${role}/tasks?task_id=${this.getData("task_id")}`;
      case NotificationsTypeEnum.NewTaskAssigned:
        return `/${role}/tasks?task_id=${this.getData("task_id")}`;

      default:
        return "";
    }
  }
}

export enum NotificationsTypeEnum {
  // Admin notifications
  NewVacationRequest = "Admin\\NewVacationRequestNotification",
  PayslipStatusChanged = "Admin\\PayslipStatusChangedNotification",

  // Common
  AppointmentEvent = "Common\\AppointmentEventNotification",
  NewPayrunAdded = "Common\\NewPayrunAddedNotification",
  NewVacationAdded = "Common\\NewVacationAddedNotification",
  VacationStatusChanged = "Common\\VacationStatusChangedNotification",
  VacationUpdated = "Common\\VacationUpdatedNotification",
  PayslipUpdated = "Common\\PayslipUpdatedNotification",
  NewTaskComment = "Common\\NewCommentOnTaskNotification",
  TaskStatusChanged = "Common\\TaskStatusChangedNotification",

  //Secretary
  NewTaskAssigned = "Secretary\\NewTaskAssignedNotification",
}

export enum RealTimeEventsTypeEnum {
  AttendanceEdited = "Realtime\\AttendanceEditedNotification",
  PayrunStatusChanged = "Realtime\\PayrunStatusChangedNotification",
  PermissionsUpdated = "Realtime\\PermissionsUpdatedNotification",
}
