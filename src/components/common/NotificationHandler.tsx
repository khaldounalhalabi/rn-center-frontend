"use client";
import { NotificationPayload } from "@/Models/NotificationPayload";
import { ReactNode } from "react";
import { HandleNotification } from "@/hooks/HandleNotification";

export const NotificationHandler = ({
  handle,
  children,
  key = undefined,
  isPermenant = false,
}: {
  handle: (payload: NotificationPayload) => void;
  key?: string;
  isPermenant?: boolean;
  children?: ReactNode;
}) => {
  HandleNotification(handle, isPermenant, key);
  return <>{children}</>;
};
