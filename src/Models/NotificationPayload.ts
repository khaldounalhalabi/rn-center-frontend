import { getNestedPropertyValue } from "@/Helpers/ObjectHelpers";

export class NotificationPayload {
  public collapseKey?: string;
  public data?: NotificationPayloadData;
  private from?: string;
  private messageId?: string;

  constructor(
    collapseKey?: string,
    data?: NotificationPayloadData,
    from?: string,
    messageId?: string
  ) {
    this.collapseKey = collapseKey;
    this.data = data;
    this.from = from;
    this.messageId = messageId;
  }

  /**
   * getNotificationType
   */
  public getNotificationType(): string | undefined {
    return this.data?.type;
  }

  /**
   * getFromData
   */
  public getFromData(key: string): string | undefined {
    const data = JSON.parse(this.data?.data ?? "{}");
    return getNestedPropertyValue(data, key);
  }

  /**
   * getUrl
   */
  public getUrl() {
    const data = JSON.parse(this.data?.data ?? "{}");
    return data?.url ?? undefined;
  }
}

export interface NotificationPayloadData {
  body?: string;
  body_ar?: string;
  data?: string; // json data
  message?: string;
  message_ar?: string;
  title?: string;
  type: string;
}

export enum NotificationsType {
  AdminAppointmentStatusChanged = "Admin\\AppointmentStatusChangedNotification",
}

export enum RealTimeEvents {
  AppointmentStatusChange = "RealTime\\AppointmentStatusChangeNotification",
  BalanceChange = "Realtime\\BalanceChangeNotification",
}
