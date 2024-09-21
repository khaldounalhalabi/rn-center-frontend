"use client";
import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { NotificationPayload } from "@/Models/NotificationPayload";
import { NotificationService } from "@/services/NotificationService";
import { getCookieClient } from "@/Actions/clientCookies";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Actors } from "@/types";
import LoadingSpin from "@/components/icons/LoadingSpin";
import CircleCheckMark from "@/components/icons/CircleCheckMark";
import { Link } from "@/navigation";
import { NotificationHandler } from "@/components/common/NotificationHandler";

const NotificationsPopover = () => {
  const [openPopNot, setOpenPopNot] = useState<boolean>(false);
  const userType = getCookieClient("user-type") as Actors;

  const fetchNotifications = async ({ pageParam = 0 }) =>
    await NotificationService.make<NotificationService>(
      userType
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
      return !lastPage.paginate?.isLast
        ? lastPage.paginate?.currentPage
          ? lastPage.paginate?.currentPage + 1
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
        userType
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
        isPermenant={true}
      />
      <NotificationsIcon
        onClick={() => OpenAndClose(openPopNot, setOpenPopNot)}
        className={
          openPopNot
            ? `h-6 w-6 cursor-pointer text-[#909CA6] fill-blue-500`
            : "h-6 w-6 cursor-pointer text-[#909CA6] fill-[#909CA6]"
        }
      />

      <div
        className={
          openPopNot
            ? "absolute end-0 w-[360px] z-10 mt-2 top-10 divide-y divide-gray-100 rounded-2xl bg-white opacity-100  transition-x-0 ease-in-out  duration-500 "
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
          <h2>Notifications</h2>
          <p className="opacity-[0.6]">
            {isFetchingCount ? (
              <LoadingSpin />
            ) : (
              `You have ${notificationsCount?.data ?? 0} unread messages`
            )}
          </p>
        </div>

        <div className="max-h-72 overflow-y-scroll">
          {isFetching && !isFetchingNextPage ? (
            <p className="text-center">Loading notifications ...</p>
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
                  notification.id
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
                          userType
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
                            userType
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
              })
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
              Show More
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
