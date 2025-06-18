import { getUser } from "@/actions/HelperActions";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Value } from "@/components/common/ui/labels-and-values/Value";
import { Button } from "@/components/ui/shadcn/button";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { Transaction } from "@/models/Transaction";
import { Link } from "@/navigation";
import { TransactionService } from "@/services/TransactionService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const data = await TransactionService.make(RoleEnum.SECRETARY).show(
    transactionId,
  );
  const res: Transaction = data?.data;
  const t = await getTranslations("common.transaction.show");
  const user = await getUser();

  return (
    <PageCard
      title={t("transactionDetails")}
      actions={
        <Link href={`/secretary/transaction/${transactionId}/edit`}>
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
        <LabelValue label={t("date")} value={res?.date} />
        <LabelValue label={t("notes")} value={res?.description} col />
        {res?.appointment_id &&
          (user?.permissions?.includes(
            PermissionEnum.APPOINTMENT_MANAGEMENT,
          ) ? (
            <Label label={t("appointmentDate")}>
              <Link href={`/secretary/appointment/${res?.appointment_id}`}>
                <Button variant={"link"}>
                  <Value value={res?.appointment?.date_time} />
                </Button>
              </Link>
            </Label>
          ) : (
            <LabelValue
              label={t("appointmentDate")}
              value={res?.appointment?.date_time}
            />
          ))}

        {res?.payrun_id &&
          (user?.permissions?.includes(PermissionEnum.PAYROLL_MANAGEMENT) ? (
            <Label label={t("payrun_date")}>
              <Link href={`/secretary/payruns/${res?.payrun_id}`}>
                <Button variant={"link"}>
                  <Value value={res?.payrun?.period} />
                </Button>
              </Link>
            </Label>
          ) : (
            <LabelValue label={t("payrun_date")} value={res?.payrun?.period} />
          ))}
      </Grid>
    </PageCard>
  );
};

export default page;
