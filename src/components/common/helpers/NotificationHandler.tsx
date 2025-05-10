"use client";
import { NotificationPayload } from "@/models/NotificationPayload";
import { ReactNode, useEffect } from "react";
import { HandleNotification } from "@/hooks/HandleNotification";

export const NotificationHandler = ({
  handle,
  children,
  key = undefined,
  isPermanent = false,
}: {
  handle: (payload: NotificationPayload) => void;
  key?: string;
  isPermanent?: boolean;
  children?: ReactNode;
}) => {
  const process = HandleNotification(handle, isPermanent, key);
  useEffect(() => {
    process.process();
  }, []);
  return <>{children}</>;
};
