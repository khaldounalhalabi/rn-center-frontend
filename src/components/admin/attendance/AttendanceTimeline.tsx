"use client";
import React, { useEffect, useState } from "react";
import { UserService } from "@/services/UserService";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useInView } from "react-intersection-observer";
import LoadingSpin from "@/components/icons/LoadingSpin";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import { useTranslations } from "next-intl";
import UserTimelineItem from "@/components/admin/attendance/UserTimelineItem";
import { Card, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

const AttendanceTimeline: React.FC = () => {
  const t = useTranslations("attendance");
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  // Create a ref for infinite scroll detection
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 200px 0px", // Load more when within 200 px of the bottom
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["attendance", selectedDate],
    queryFn: async ({ pageParam = 1 }) => {
      return await UserService.make().indexWithAttendance(
        selectedDate,
        undefined,
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
  const allUsers = data?.pages.flatMap((page) => page.data.users) || [];
  // Get attendance data from the first page
  const attendanceInfo = data?.pages[0]?.data.attendance;

  return (
    <div className="container mb-2">
      <div className="mb-2 flex items-center justify-between text-start">
        <span className={"text-3xl font-bold"}>{t("attendance_timeline")}</span>
      </div>

      {(isLoading || isPending || isRefetching) && (
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

      {data &&
        allUsers.length > 0 &&
        !(isLoading || isPending || isRefetching) && (
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
              {/*<p className="text-gray-600">*/}
              {/*  Status: {attendanceInfo?.status || "N/A"}*/}
              {/*</p>*/}
            </CardHeader>

            <div className="max-h-[70vh] overflow-auto space-y-2">
              {allUsers.map((user, index) => (
                <UserTimelineItem
                  key={`${user?.id}-${index}`}
                  user={user}
                  date={selectedDate}
                  refetch={refetch}
                />
              ))}

              {/* Loading indicator for the next page */}
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
          <p >{t("no_records")}</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTimeline;
