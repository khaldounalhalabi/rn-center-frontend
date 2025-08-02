"use client";
import UserTimelineItem from "@/components/admin/attendance/UserTimelineItem";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Card, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { RoleEnum } from "@/enums/RoleEnum";
import { RealTimeEventsTypeEnum } from "@/models/NotificationPayload";
import { UserService } from "@/services/UserService";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AttendanceTimeline = ({ role }: { role: RoleEnum }) => {
  const t = useTranslations("attendance");
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(search);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 200px 0px", // Load more when within 200 px of the bottom
  });

  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["attendance", selectedDate, debouncedValue],
    queryFn: async ({ pageParam = 1 }) => {
      return await UserService.make(role).indexWithAttendance(
        selectedDate,
        debouncedValue,
        undefined,
        undefined,
        15,
        { page: pageParam },
      );
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.paginate && lastPage.paginate.has_more) {
        return lastPage.paginate.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["attendance"],
    });
  };

  // Load more data when the user scrolls to the bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Reset and refetch when the date changes
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(
      date?.format("YYYY-MM-DD") ?? dayjs()?.format("YYYY-MM-DD"),
    );
  };

  // Combine all users from all pages
  const allUsers = data?.pages.flatMap((page) => page?.data?.users ?? []) || [];
  // Get attendance data from the first page
  // const attendanceInfo = data?.pages[0]?.data.attendance;

  return (
    <div className="container mb-2">
      <NotificationHandler
        handle={(payload) => {
          if (payload.type == RealTimeEventsTypeEnum.AttendanceEdited) {
            invalidate();
          }
        }}
        isPermanent
      />
      <div className="mb-2 flex items-center justify-between text-start">
        <Input
          type={"search"}
          placeholder={`${t("search")} ...`}
          className={"max-w-40"}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpin className={"h-10 w-10 text-primary"} />
        </div>
      )}

      {isError && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            Failed to load attendance data.
          </span>
          <button
            onClick={() => refetch()}
            className="mt-2 rounded-md bg-red-200 px-3 py-1 text-sm text-red-800 hover:bg-red-300"
          >
            Try Again
          </button>
        </div>
      )}

      {data && allUsers.length > 0 && (
        <Card className="overflow-hidden">
          <CardHeader className="grid grid-cols-2 grid-flow-col items-center justify-between md:grid-flow-row">
            <CardTitle className="text-start">
              {t("attendance_date")}:{" "}
              {dayjs(selectedDate).format("MMMM D, YYYY")}
            </CardTitle>
            <Datepicker
              onChange={handleDateChange}
              defaultValue={selectedDate}
            />
          </CardHeader>

          <div className="max-h-[70vh] overflow-auto space-y-2">
            {allUsers.map((user, index) => (
              <UserTimelineItem
                key={`${user?.id}-${index}`}
                user={user}
                date={selectedDate}
                refetch={invalidate}
                role={role}
              />
            ))}

            <div
              ref={loadMoreRef}
              className="flex items-center justify-center py-4"
            >
              {isFetchingNextPage ? (
                <LoadingSpin className={"h-6 w-6 text-primary"} />
              ) : hasNextPage ? (
                <div className="h-8"></div> // Spacer to trigger intersection observer
              ) : (
                allUsers.length > 0 && (
                  <p className="text-center text-sm text-primary">
                    {t("no_more")}
                  </p>
                )
              )}
            </div>
          </div>
        </Card>
      )}

      {data && allUsers.length === 0 && (
        <div className="border-l-4 text-secondary">
          <p>{t("no_records")}</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTimeline;
