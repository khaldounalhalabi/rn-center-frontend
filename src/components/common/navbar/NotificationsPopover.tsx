"use client";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { NotificationPayload } from "@/models/NotificationPayload";
import { NotificationService } from "@/services/NotificationService";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Bell, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NotificationHandler } from "../helpers/NotificationHandler";

const NotificationsPopover = () => {
  const { role } = useUser();
  const [mutating, setMutating] = useState("");

  const {
    data: notifications,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchNotifications,
  } = useInfiniteQuery({
    queryKey: ["notifications_list"],
    queryFn: async ({ pageParam }) =>
      await NotificationService.make(role).indexWithPagination(
        pageParam,
        undefined,
        undefined,
        undefined,
        20,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return !lastPage.paginate?.is_last
        ? lastPage.paginate?.current_page
          ? lastPage.paginate?.current_page + 1
          : null
        : null;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 10,
    retryDelay: 100,
    enabled: role != undefined && role != RoleEnum.PUBLIC,
  });

  const handleDataScrolling = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight && hasNextPage) {
      fetchNextPage();
    }
  };

  const { data: unreadCount, refetch: refetchCount } = useQuery({
    queryKey: ["unread_notifications_count"],
    queryFn: async () => await NotificationService.make(role).unreadCount(),
    select: (data) => data?.data?.unread_count ?? 0,
    enabled: role != undefined && role != RoleEnum.PUBLIC,
  });

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      setMutating(notificationId);
      return await NotificationService.make(role).markAsRead(notificationId);
    },
    onSuccess: async () => {
      refetchCount();
      refetchNotifications().then(() => {
        setMutating("");
      });
    },
  });

  return (
    <>
      <NotificationHandler
        handle={(e) => {
          if (e.isNotification()) {
            refetchCount();
            refetchNotifications();
          }
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount != undefined && unreadCount > 0 && (
              <Badge
                className="absolute -right-2 -top-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant={"destructive"}
              >
                {unreadCount > 9 ? "+9" : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0 bg-background" align="end">
          <div
            className="w-full max-h-96 p-1 overflow-y-scroll"
            onScroll={handleDataScrolling}
          >
            {notifications?.pages?.map((page) =>
              page?.data?.map((notification) => {
                const payload = new NotificationPayload(
                  notification?.data ?? {},
                );
                return (
                  <div className="w-full flex items-center justify-between text-sm border my-1 p-3 rounded-md">
                    <Link
                      className="text-start w-[80%]"
                      href={payload?.getUrl(role ?? RoleEnum.PUBLIC) ?? ""}
                    >
                      {payload.message}
                    </Link>
                    <Button
                      disabled={notification?.read_at != undefined}
                      size={"icon"}
                      variant={notification?.read_at ? "ghost" : "default"}
                      onClick={() => {
                        markAsRead.mutate(notification?.id);
                      }}
                    >
                      {mutating == notification?.id ? (
                        <LoadingSpin />
                      ) : (
                        <CheckCircle />
                      )}
                    </Button>
                  </div>
                );
              }),
            )}
            {(isFetchingNextPage || isPending) && (
              <div className="w-full flex items-center justify-center text-sm border my-1 p-3 rounded-md">
                <LoadingSpin />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationsPopover;
