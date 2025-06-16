import PayslipsTable from "@/components/common/payslips/PayslipsTable";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Alert, AlertDescription } from "@/components/ui/shadcn/alert";
import { RoleEnum } from "@/enums/RoleEnum";
import PayrunService from "@/services/PayrunService";
import { TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { payrunId },
}: {
  params: { payrunId: number };
}) => {
  const payrun = (await PayrunService.make(RoleEnum.SECRETARY).show(payrunId))
    .data;
  const t = await getTranslations("payruns");

  return (
    <PageCard title={t("show_title")}>
      <Grid md={2} className={"mb-5"}>
        <LabelValue
          label={t("should_delivered_at")}
          value={payrun?.should_delivered_at}
        />
        <LabelValue label={t("payment_date")} value={payrun?.payment_date} />
        <LabelValue label={t("payment_cost")} value={payrun?.payment_cost} />
        <LabelValue label={t("period")} value={payrun?.period} />
        <LabelValue
          label={t("excluded_users_count")}
          value={payrun?.excluded_users_count}
        />
        <LabelValue
          label={t("processed_users_count")}
          value={payrun?.processed_users_count}
        />
        <LabelValue label={t("processed_at")} value={payrun?.processed_at} />
        <LabelValue
          label={t("status")}
          value={<TranslatableEnum value={payrun?.status} />}
        />
      </Grid>

      {payrun?.has_errors && (
        <Alert className={"border-destructive text-destructive"}>
          <TriangleAlert
            className={"h-4 w-4"}
            style={{ color: "hsl(var(--destructive))" }}
          />
          <AlertDescription>{t("pay_run_error_warning")}</AlertDescription>
        </Alert>
      )}

      <div className={"my-5 w-full"}>
        <PayslipsTable role={RoleEnum.SECRETARY} payrun={payrun} />
      </div>
    </PageCard>
  );
};

export default Page;
