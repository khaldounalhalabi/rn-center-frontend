"use client";
import Grid from "@/components/common/ui/Grid";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Badge } from "@/components/ui/shadcn/badge";
import { Clinic } from "@/models/Clinic";
import { useTranslations } from "next-intl";

const Overview = ({ clinic }: { clinic?: Clinic | undefined | null }) => {
  const t = useTranslations("admin.clinic.show");
  return (
    <Grid>
      <LabelValue
        label={t("cost")}
        value={clinic?.appointment_cost}
        color={"error"}
      />
      <LabelValue
        label={t("experienceY")}
        value={clinic?.experience_years}
        color={"warning"}
      />
      <LabelValue
        label={t("maxAppointmentsPerDay")}
        value={clinic?.max_appointments}
        color={"secondary"}
      />

      <LabelValue
        label={t("gender")}
        value={<TranslatableEnum value={clinic?.user?.gender} />}
      />
      <Label label={t("specializations")} col className={"md:col-span-2"}>
        <div className={"flex gap-2"}>
          {clinic?.specialities?.map((spec, index) => (
            <Badge key={index}>{spec.name}</Badge>
          ))}
        </div>
      </Label>
    </Grid>
  );
};

export default Overview;
