import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Value } from "@/components/common/ui/labels-and-values/Value";
import { Button } from "@/components/ui/shadcn/button";
import { Transaction } from "@/models/Transaction";
import { Link } from "@/navigation";
import { TransactionService } from "@/services/TransactionService";
import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const data = await TransactionService.make().show(transactionId);
  const res: Transaction = data?.data;
  const t = await getTranslations("common.transaction.show");

  return (
    <PageCard
      title={t("transactionDetails")}
      actions={
        <Link href={`/admin/transaction/${transactionId}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
        </Link>
      }
    >
      <Grid md={2} gap={5}>
        <LabelValue label={t("actor_name")} value={res?.actor?.full_name} />
        <LabelValue
          label={t("type")}
          value={<TranslatableEnum value={res?.type} />}
        />
        <LabelValue label={t("amount")} value={res?.amount} />
        <LabelValue
          label={t("date")}
          value={dayjs(res.date).format("YYYY-MM-DD hh:mm a")}
        />
        <LabelValue label={t("notes")} value={res?.description} col />
        {res?.appointment_id && (
          <Label label={t("appointmentDate")}>
            <Link href={`/admin/appointment/${res?.appointment_id}`}>
              <Button variant={"link"}>
                <Value value={res?.appointment?.date_time} />
              </Button>
            </Link>
          </Label>
        )}

        {res?.payrun_id && (
          <Label label={t("payrun_date")}>
            <Link href={`/admin/payruns/${res?.payrun_id}`}>
              <Button variant={"link"}>
                <Value value={res?.payrun?.period} />
              </Button>
            </Link>
          </Label>
        )}
      </Grid>
    </PageCard>
  );
};

export default page;
