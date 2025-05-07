"use client";
import React, { useEffect, useState } from "react";
import { UserService } from "@/services/UserService";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import UserTimelineItem from "./UserTimelineItem";
import { useInView } from "react-intersection-observer";
import LoadingSpin from "@/components/icons/LoadingSpin";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";

const AttendanceTimeline: React.FC = () => {
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
      <div className="mb-2 flex items-center justify-between">
        <span className={"text-3xl font-bold "}>Attendance Timeline</span>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpin className={"w-10 h-10 text-brand-primary"} />
        </div>
      )}

      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            Failed to load attendance data.
          </span>
          <button
            onClick={() => refetch()}
            className="mt-2 bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded-md text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {data && allUsers.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">
              Attendance Date: {dayjs(selectedDate).format("MMMM D, YYYY")}
            </h2>
            <DatepickerFilter
              onChange={handleDateChange}
              defaultValue={selectedDate}
            />
            {/*<p className="text-gray-600">*/}
            {/*  Status: {attendanceInfo?.status || "N/A"}*/}
            {/*</p>*/}
          </div>

          <div className="divide-y divide-gray-200 max-h-[70vh] overflow-auto">
            {allUsers.map((user, index) => (
              <UserTimelineItem key={`${user?.id}-${index}`} user={user} />
            ))}

            {/* Loading indicator for the next page */}
            <div
              ref={loadMoreRef}
              className="flex justify-center items-center py-4"
            >
              {isFetchingNextPage ? (
                <LoadingSpin className={"w-6 h-6 text-brand-primary"} />
              ) : hasNextPage ? (
                <div className="h-8"></div> // Spacer to trigger intersection observer
              ) : (
                allUsers.length > 0 && (
                  <p className="text-gray-500 text-sm text-center">
                    No more records to load
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {data && allUsers.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">
            No attendance records found for this date.
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTimeline;
