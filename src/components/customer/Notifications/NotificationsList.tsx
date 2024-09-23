"use client";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { NotificationService } from "@/services/NotificationService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import React from "react";
import ListCards from "@/components/customer/ListCards";
import BillIcon from "@/components/icons/BillIcon";
import { NotificationPayload } from "@/Models/NotificationPayload";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NotificationHandler } from "@/components/common/NotificationHandler";

const NotificationsList = () => {
  dayjs.extend(relativeTime);
  const {
    data,
    isPending,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications_list"],
    queryFn: async ({ pageParam }) =>
      await NotificationService.make("customer").indexWithPagination(
        pageParam,
        undefined,
        undefined,
        undefined,
        6,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return !lastPage.paginate?.is_last
        ? lastPage.paginate?.current_page
          ? lastPage.paginate?.current_page + 1
          : null
        : null;
    },
    placeholderData: keepPreviousData,
  });

  const {
    data: notificationsCount,
    isFetching: isFetchingCount,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ["notifications_count"],
    queryFn: async () =>
      await NotificationService.make<NotificationService>(
        "customer",
      ).getUnreadCount(),
  });

  return (
    <div
      className={`p-5 max-h-screen md:p-10 overflow-y-scroll`}
      onScroll={(e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      <div className={`flex items-center justify-between w-full`}>
        <h1
          className={`text-lg md:text-2xl text-title flex items-center justify-between gap-4`}
        >
          Notifications
          <span className={`text-red-600`}>
            {isFetchingCount ? (
              <LoadingSpin className={"h-6 w-6"} />
            ) : (
              notificationsCount?.data
            )}
          </span>
        </h1>
        <button
          className={`text-lg md:text-2xl text-title font-bold hover:underline`}
          onClick={() => {
            NotificationService.make<NotificationService>("customer")
              .markAllAsRead()
              .then(() => {
                refetch();
                refetchCount();
              });
          }}
        >
          mark all as read
        </button>
      </div>

      <NotificationHandler
        handle={(payload) => {
          if (payload.isNotification()) {
            refetch();
            refetchCount();
          }
        }}
      />

      <div className={"w-full my-10"}>
        {isPending ? (
          <div className={"w-full h-[300px] flex justify-center items-center"}>
            <LoadingSpin className={"w-12 h-12"} />
          </div>
        ) : (
          data?.pages.map((page) =>
            page?.data?.map((not) => {
              const notification = new NotificationPayload(
                undefined,
                JSON.parse(not.data),
                undefined,
                undefined,
                not.message,
                not.read_at,
                not.created_at,
                not.type,
                not.id,
              );

              return (
                <ListCards
                  key={not.id}
                  containerClass={`${notification.read_at ? "" : "bg-[#F6F9FF]"}`}
                  image={
                    <BillIcon className={`w-full md:w-1/2 h-full md:h-1/2`} />
                  }
                  url={notification.getUrl()}
                  info={
                    notification.read_at ? (
                      ""
                    ) : (
                      <button
                        className="badge badge-error"
                        onClick={() => {
                          NotificationService.make<NotificationService>(
                            "customer",
                          )
                            .markAsRead(not.id)
                            .then((res) => {
                              if (res.code == 200) {
                                refetch();
                                refetchCount();
                              }
                              return res;
                            });
                        }}
                      />
                    )
                  }
                >
                  <div
                    className={
                      "flex flex-col items-start justify-center text-xs md:text-md"
                    }
                  >
                    <p>{notification.getMessage()}</p>
                    <p className={"text-error"}>
                      {dayjs(notification.created_at).fromNow()}
                    </p>
                  </div>
                </ListCards>
              );
            }),
          )
        )}
        {isFetchingNextPage && (
          <div className={`flex items-center justify-center`}>
            <LoadingSpin className={`w-12 h-12`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
