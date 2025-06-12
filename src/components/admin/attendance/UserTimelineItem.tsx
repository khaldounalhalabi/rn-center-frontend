import AttendanceForm from "@/components/admin/attendance/AttendanceForm";
import StatusLegend from "@/components/admin/attendance/StatusLegend";
import TimelineEvents from "@/components/common/attendance/TimelineEvents";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Pencil from "@/components/icons/Pencil";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

interface UserTimelineItemProps {
  user?: User;
  date?: string;
  refetch?: () => void | Promise<void>;
}

const UserTimelineItem: React.FC<UserTimelineItemProps> = ({
  user,
  date,
  refetch,
}) => {
  const t = useTranslations("attendance");
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  return (
    <Card className="p-6 m-5">
      <CardHeader className="mb-4 flex flex-row w-full items-center justify-between">
        <CardTitle className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 ltr:mr-4 rtl:ml-4">
            <span className="font-bold text-gray-600">
              {user?.first_name.charAt(0)}
              {user?.last_name.charAt(0)}
            </span>
          </div>
          <div className={"flex flex-col items-start"}>
            <Link
              href={
                user?.role === RoleEnum.SECRETARY
                  ? `/admin/secretaries/${user.id}`
                  : `/admin/clinics/${user?.clinic?.id}`
              }
            >
              <Button variant={"link"}>{user?.full_name}</Button>
            </Link>
            <Badge className={"ms-3"}>
              <TranslatableEnum value={user?.role} />
            </Badge>
          </div>
        </CardTitle>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button size={"icon"}>
              <Pencil />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={locale == "ar" ? "left" : "right"}
            className={"w-[60vh] md:w-[80vh]"}
          >
            <SheetHeader>
              <SheetTitle>
                {user?.full_name} : {date}
              </SheetTitle>
            </SheetHeader>
            <div>
              <AttendanceForm
                date={date ?? ""}
                userId={user?.id ?? 0}
                attendances={user?.attendance_by_date ?? []}
                onSuccess={async () => {
                  if (refetch) {
                    await refetch();
                  }
                  setOpen(false);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>

      <CardContent>
        {user?.attendance_by_date && user?.attendance_by_date.length > 0 ? (
          <div>
            <div className="relative">
              <div className="absolute top-5 h-1 w-full bg-secondary"></div>
              {Array.from({ length: 25 }, (_, i) => i).map((hour) => {
                const leftPosition = (hour / 24) * 100;
                return (
                  <div
                    key={hour}
                    className="absolute text-xs text-primary"
                    style={{
                      left: `${leftPosition}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {`${hour.toString().padStart(2, "0")}:00`}
                  </div>
                );
              })}

              {/* Timeline events */}
              <TimelineEvents logs={user?.attendance_by_date ?? []} />
            </div>

            <div className="mt-10">
              <StatusLegend />
            </div>
          </div>
        ) : (
          <p className="italic text-primary">{t("no_records")}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTimelineItem;
