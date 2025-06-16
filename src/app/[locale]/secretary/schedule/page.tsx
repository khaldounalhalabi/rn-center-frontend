import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import PageCard from "@/components/common/ui/PageCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RoleEnum } from "@/enums/RoleEnum";
import WeekDayEnum from "@/enums/WeekDayEnum";
import { Schedule } from "@/models/Schedule";
import { ScheduleService } from "@/services/ScheduleService";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("admin.schedules");
  const daysT = await getTranslations("week_days");
  const schedules = (await ScheduleService.make(RoleEnum.SECRETARY).mine()).data;

  return (
    <PageCard title={t("table.schedule")}>
      {Object.entries(schedules).map(([dayName, slots], index) => (
        <Card className="my-2" key={index}>
          <CardHeader>
            <CardTitle>{daysT(dayName as WeekDayEnum)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid>
              {slots?.map((slot: Schedule, index: number) => (
                <div className="flex items-center justify-between" key={index}>
                  <LabelValue
                    label={t("table.startTime")}
                    value={slot.start_time}
                  />
                  <LabelValue
                    label={t("table.endTime")}
                    value={slot.end_time}
                  />
                </div>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </PageCard>
  );
};

export default Page;
