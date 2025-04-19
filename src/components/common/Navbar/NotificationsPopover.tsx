"use client";
import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { NotificationPayload } from "@/Models/NotificationPayload";
import { NotificationService } from "@/services/NotificationService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";
import CircleCheckMark from "@/components/icons/CircleCheckMark";
import { Link } from "@/navigation";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/UserHook";

const NotificationsPopover = () => {
  const t = useTranslations("components");
  const [openPopNot, setOpenPopNot] = useState<boolean>(false);
  const { role } = useUser();

  const fetchNotifications = async ({ pageParam = 0 }) =>
    await NotificationService.make<NotificationService>(
      role,
    ).indexWithPagination(pageParam, undefined, undefined, undefined, 5);
  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["Notifications"],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => {
      return !lastPage.paginate?.is_last
        ? lastPage.paginate?.current_page
          ? lastPage.paginate?.current_page + 1
          : null
        : null;
    },
    initialPageParam: 0,
  });

  const {
    data: notificationsCount,
    isFetching: isFetchingCount,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ["notifications_count"],
    queryFn: async () =>
      await NotificationService.make<NotificationService>(
        role,
      ).getUnreadCount(),
  });

  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopNot);
  }, []);

  return (
    <div
      ref={ref}
      className={`${openPopNot ? " relative" : "overflow-clip relative"} max-h-72`}
    >
      <NotificationHandler
        handle={(payload) => {
          if (payload.isNotification()) {
            refetch();
            refetchCount();
          }
        }}
        isPermanent={true}
      />
      <div
        className={"relative w-8 h-full cursor-pointer"}
        onClick={() => OpenAndClose(openPopNot, setOpenPopNot)}
      >
        <NotificationsIcon
          className={
            openPopNot
              ? `h-6 w-6 cursor-pointer text-[#909CA6] fill-blue-500`
              : "h-6 w-6 cursor-pointer text-[#909CA6] fill-[#909CA6]"
          }
        />
        {(notificationsCount?.data ?? 0) > 0 ? (
          <span
            className={
              "absolute -top-1 text-[100%] right-[0px] border-error rounded-full text-error"
            }
          >
            {notificationsCount?.data}
          </span>
        ) : (
          ""
        )}
      </div>

      <div
        className={
          openPopNot
            ? "absolute md:end-0 -end-3 md:w-[360px] w-[80vw] z-20 mt-2 top-10 divide-y divide-gray-100 rounded-2xl bg-white opacity-100  transition-x-0 ease-in-out  duration-500 "
            : "absolute transition-x-[-200px] opacity-0 ease-in-out duration-500 "
        }
        role="menu"
        style={{
          boxShadow:
            " 0px 5px 5px -3px rgba(145, 158, 171, 0.2)" +
            ", 0px 8px 10px 1px rgba(145, 158, 171, 0.14)" +
            ", 0px 3px 14px 2px rgba(145, 158, 171, 0.12)",
        }}
      >
        <div className="px-5 py-4">
          <h2>{t("notifications")}</h2>
          <p className="opacity-[0.6]">
            {isFetchingCount ? (
              <LoadingSpin />
            ) : (
              `${t("you_have")} ${notificationsCount?.data ?? 0} ${t("unread_notifications")}`
            )}
          </p>
        </div>

        <div className="max-h-72 overflow-y-scroll">
          {isFetching && !isFetchingNextPage ? (
            <p className="text-center">{t("loading")} ...</p>
          ) : (
            notifications?.pages.map((item) =>
              item?.data?.map((notification, index) => {
                const n = new NotificationPayload(
                  undefined,
                  JSON.parse(notification.data),
                  undefined,
                  undefined,
                  notification.message,
                  notification.read_at,
                  notification.created_at,
                  notification.type,
                  notification.id,
                );
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center mx-2"
                  >
                    <Link
                      href={n.getUrl()}
                      className="p-3 w-full cursor-pointer hover:bg-gray-300 border-b-gray-100 rounded-md"
                      onClick={() => {
                        NotificationService.make<NotificationService>(
                          role,
                        ).markAsRead(notification.id);
                      }}
                    >
                      {n.getMessage()}
                    </Link>
                    <button
                      className=" hover:bg-gray-300 p-3 rounded-md"
                      onClick={() => {
                        if (!n.read_at) {
                          NotificationService.make<NotificationService>(
                            role,
                          ).markAsRead(notification.id);
                          refetch();
                          refetchCount();
                        }
                      }}
                    >
                      <CircleCheckMark
                        className={`h-6 w-6 text-success ${n.read_at ? "fill-success cursor-not-allowed" : "cursor-pointer"}`}
                        solid={!!n.read_at}
                      />
                    </button>
                  </div>
                );
              }),
            )
          )}
          {isFetchingNextPage ? (
            <p className="text-center py-3">Loading notifications ...</p>
          ) : (
            ""
          )}
        </div>
        <div className="px-8 py-6 flex items-center justify-center w-full">
          {hasNextPage ? (
            <button
              className="btn text-pom font-bold text-[0.875rem] flex items-center justify-between"
              onClick={() => {
                fetchNextPage();
              }}
            >
              {t("load_more")}
              {isFetchingNextPage ? <LoadingSpin /> : ""}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPopover;
