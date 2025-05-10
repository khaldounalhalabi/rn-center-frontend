"use client";
import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import clickOutsideHandler from "@/helpers/ClickOutsideHandler";
import { NotificationPayload } from "@/models/NotificationPayload";
import { NotificationService } from "@/services/NotificationService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";
import CircleCheckMark from "@/components/icons/CircleCheckMark";
import { Link } from "@/navigation";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
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
    clickOutsideHandler(ref, setOpenPopNot);
  }, []);

  return (
    <div
      ref={ref}
      className={`${openPopNot ? "relative" : "relative overflow-clip"} max-h-72`}
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
        className={"relative h-full w-8 cursor-pointer"}
        onClick={() => setOpenPopNot((prevState) => !prevState)}
      >
        <NotificationsIcon
          className={
            openPopNot
              ? `h-6 w-6 cursor-pointer fill-blue-500 text-[#909CA6]`
              : "h-6 w-6 cursor-pointer fill-[#909CA6] text-[#909CA6]"
          }
        />
        {(notificationsCount?.data ?? 0) > 0 ? (
          <span
            className={
              "absolute -top-1 right-[0px] rounded-full border-error text-[100%] text-error"
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
            ? "transition-x-0 absolute -end-3 top-10 z-20 mt-2 w-[80vw] divide-y divide-gray-100 rounded-2xl bg-white opacity-100 duration-500 ease-in-out md:end-0 md:w-[360px]"
            : "transition-x-[-200px] absolute opacity-0 duration-500 ease-in-out"
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
                    className="mx-2 flex items-center justify-between"
                  >
                    <Link
                      href={n.getUrl()}
                      className="w-full cursor-pointer rounded-md border-b-gray-100 p-3 hover:bg-gray-300"
                      onClick={() => {
                        NotificationService.make<NotificationService>(
                          role,
                        ).markAsRead(notification.id);
                      }}
                    >
                      {n.getMessage()}
                    </Link>
                    <button
                      className="rounded-md p-3 hover:bg-gray-300"
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
                        className={`h-6 w-6 text-success ${n.read_at ? "cursor-not-allowed fill-success" : "cursor-pointer"}`}
                        solid={!!n.read_at}
                      />
                    </button>
                  </div>
                );
              }),
            )
          )}
          {isFetchingNextPage ? (
            <p className="py-3 text-center">Loading notifications ...</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex w-full items-center justify-center px-8 py-6">
          {hasNextPage ? (
            <button
              className="btn flex items-center justify-between text-[0.875rem] font-bold text-pom"
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
