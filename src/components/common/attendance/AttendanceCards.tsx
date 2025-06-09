"use client";
import Grid from "@/components/common/ui/Grid";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import AttendanceLogTypeEnum from "@/enums/AttendanceLogTypeEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useTimer from "@/hooks/TimerHook";
import { cn } from "@/lib/utils";
import AttendanceLogService from "@/services/AttendanceLogService";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Award,
  Calendar,
  Clock,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

const AttendanceCards = ({ role }: { role: RoleEnum }) => {
  const t = useTranslations("attendance");

  const {
    data: stats,
    isPending: isPendingStats,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["attendance_stats"],
    queryFn: async () =>
      await AttendanceLogService.make(RoleEnum.DOCTOR).myStat(),
    select: (data) => data.data,
  });

  const {
    data: logData,
    isPending: isPendingLastLog,
    refetch: refetchLastLog,
  } = useQuery({
    queryKey: ["last_log"],
    queryFn: async () => await AttendanceLogService.make(role).lastLog(),
    select: (data) => data.data,
  });

  const checkInMutation = useMutation({
    mutationFn: async () => await AttendanceLogService.make(role).checkin(),
    onSuccess: async () => {
      await refetchLastLog();
      await refetchStats();
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async () => await AttendanceLogService.make(role).checkout(),
    onSuccess: async () => {
      await refetchLastLog();
      await refetchStats();
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
    <div className="space-y-6 p-5">
      <Grid sm={1} md={3} lg={3} className="gap-4">
        <Card className="transition-all duration-300 hover:shadow-lg">
          {isPendingStats || isPendingLastLog || !stats ? (
            <Skeleton className="w-full h-40" />
          ) : (
            <>
              <CardHeader className="space-y-2">
                {logData?.type == AttendanceLogTypeEnum.CHECKIN ? (
                  <>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        {t("checked_in")}
                      </CardTitle>
                      <Badge variant="secondary" className="text-sm">
                        {dayjs(logData?.attend_at).format("HH:mm")}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg font-medium flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      {timer}
                    </CardDescription>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {t("todays_hours")}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-lg font-medium">
                      {dayjs
                        .duration(stats?.attendance_hours_in_day, "hours")
                        .format("HH:mm:ss")}
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-1 w-full bg-secondary/20 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full bg-primary transition-all duration-500",
                      logData?.type === AttendanceLogTypeEnum.CHECKIN
                        ? "animate-pulse"
                        : "",
                    )}
                    style={{
                      width:
                        logData?.type === AttendanceLogTypeEnum.CHECKIN
                          ? "100%"
                          : `${Math.min((stats?.attendance_hours_in_day / 8) * 100, 100)}%`,
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4">
                {(logData?.type == AttendanceLogTypeEnum.CHECKOUT ||
                  !logData) && (
                  <Button
                    onClick={handleCheckIn}
                    className="w-full transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    {checkInMutation?.isPending ? (
                      <LoadingSpin className="mr-2" />
                    ) : (
                      <Clock className="mr-2 h-4 w-4" />
                    )}
                    {t("check_in")}
                  </Button>
                )}

                {logData?.type == AttendanceLogTypeEnum.CHECKIN && (
                  <Button
                    onClick={handleCheckOut}
                    variant="destructive"
                    className="w-full transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    {checkOutMutation?.isPending ? (
                      <LoadingSpin className="mr-2" />
                    ) : (
                      <Clock className="mr-2 h-4 w-4" />
                    )}
                    {t("check_out")}
                  </Button>
                )}
              </CardFooter>
            </>
          )}
        </Card>

        {/* Attendance Overview Card */}
        <Card className="transition-all duration-300 hover:shadow-lg">
          {isPendingStats || isPendingLastLog || !stats ? (
            <Skeleton className="w-full h-40" />
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t("attendance_overview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {t("attendance_days")}
                    </span>
                    <span className="font-medium">
                      {stats?.attendance_days} / {stats?.expected_days}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.min((stats?.attendance_days / stats?.expected_days) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {t("total_hours")}
                    </span>
                    <span className="font-medium">
                      {`${Math.floor(stats?.attendance_hours)} / ${stats?.expected_hours}`}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.min((stats?.attendance_hours / stats?.expected_hours) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Overtime Hours
                    </span>
                    <span className="font-medium text-emerald-600">
                      {stats?.overtime_hours?.toFixed(1) || 0} hrs
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${Math.min((stats?.overtime_hours / 40) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Overtime Days
                    </span>
                    <span className="font-medium text-emerald-600">
                      {stats?.overtime_days || 0} days
                    </span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${Math.min((stats?.overtime_days / 5) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Absence Card */}
        <Card className="transition-all duration-300 hover:shadow-lg">
          {isPendingStats || isPendingLastLog || !stats ? (
            <Skeleton className="w-full h-40" />
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t("absence_summary")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {t("absence_days")}
                    </p>
                    <p className="text-2xl font-bold">{stats?.absence_days}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {t("attendance_rate")}
                    </p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        (stats?.attendance_days /
                          (stats?.attendance_days + stats?.absence_days)) *
                          100,
                      )}
                      %
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>
                      {t("expected_days")}: {stats?.expected_days}
                    </span>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </Grid>
    </div>
  );
};

export default AttendanceCards;
