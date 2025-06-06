"use client";
import { Revalidate } from "@/actions/Revalidate";
import Grid from "@/components/common/ui/Grid";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import AttendanceLogTypeEnum from "@/enums/AttendanceLogTypeEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useTimer from "@/hooks/TimerHook";
import AttendanceStats from "@/models/AttendanceStats";
import AttendanceLogService from "@/services/AttendanceLogService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

const formatDuration = (hours:number) => {
  const wholeHours = Math.floor(hours); // Get integer part of hours
  const remainingMinutes = Math.round((hours - wholeHours) * 60); // Get fractional part as minutes

  if (wholeHours === 0 && remainingMinutes > 0) {
    // Handle durations less than 1 hour
    return `${remainingMinutes} ${remainingMinutes === 1 ? "minute" : "minutes"}`;
  }

  const hoursText =
    wholeHours === 1 ? "one hour" : wholeHours > 1 ? `${wholeHours} hours` : "";
  const minutesText =
    remainingMinutes === 30
      ? "and a half"
      : remainingMinutes > 0
      ? `and ${remainingMinutes} minutes`
      : "";

  return `${hoursText} ${minutesText}`.trim(); // Combine and trim the result
};


const CheckinCheckoutCards = ({
  stats,
  role,
}: {
  role: RoleEnum;
  stats: AttendanceStats;
}) => {
  const queryClient = useQueryClient();

  const { data: logData } = useQuery({
    queryKey: ["last_log"],
    queryFn: async () => await AttendanceLogService.make(role).lastLog(),
    select: (data) => data.data,
  });

  const checkInMutation = useMutation({
    mutationFn: async () => await AttendanceLogService.make(role).checkin(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["last_log"],
      });
      Revalidate();
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async () => await AttendanceLogService.make(role).checkout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["last_log"],
      });
      Revalidate();
    },
  });

  const handleCheckIn = () => {
    checkInMutation.mutate();
  };

  const handleCheckOut = () => {
    checkOutMutation.mutate();
  };

  const timer = useTimer({ startTime: logData?.attend_at });

  return (
    <Grid sm={2} md={3} className={"p-5"}>
      <Card>
        <CardHeader>
          {logData?.type == AttendanceLogTypeEnum.CHECKIN ? (
            <>
              <CardTitle>
                Checked in : {dayjs(logData?.attend_at).format("HH:mm")}
              </CardTitle>
              <CardDescription>{timer}</CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Today recorded hours</CardTitle>
              <CardDescription>
                {formatDuration(stats?.attendance_hours_in_day)}
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-end">
          {(logData?.type == AttendanceLogTypeEnum.CHECKOUT || !logData) && (
            <Button onClick={handleCheckIn}>
              {checkInMutation?.isPending ? <LoadingSpin /> : "Checkin"}
            </Button>
          )}

          {logData?.type == AttendanceLogTypeEnum.CHECKIN && (
            <Button onClick={handleCheckOut}>
              {checkOutMutation?.isPending ? <LoadingSpin /> : "Checkout"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Grid>
  );
};

export default CheckinCheckoutCards;
