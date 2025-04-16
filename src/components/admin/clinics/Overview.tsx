"use client";
import React from "react";
import { Clinic } from "@/Models/Clinic";
import { useTranslations } from "next-intl";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import { Value } from "@/components/common/ui/LabelsValues/Value";

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
    </Grid>
  );
};

export default Overview;
