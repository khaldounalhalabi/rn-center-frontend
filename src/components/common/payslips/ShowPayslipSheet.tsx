"use client";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Eye from "@/components/icons/Eye";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import PayslipAdjustmentTypeEnum from "@/enums/PayslipAdjustmentTypeEnum";
import useOpenByQuery from "@/hooks/OpenByQueryParamHook";
import Payslip from "@/models/Payslip";
import { useLocale, useTranslations } from "next-intl";

const ShowPayslipSheet = ({ payslip }: { payslip?: Payslip }) => {
  const locale = useLocale();
  const variablesValues = payslip?.details?.variables_values ?? {};
  const [open, setOpen] = useOpenByQuery("payslip_id", payslip?.id ?? 0);
  const t = useTranslations("payslips");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Eye />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale == "ar" ? "left" : "right"}
        className={"w-[60vh] overflow-y-scroll md:w-[80vh]"}
      >
        <SheetHeader>
          <SheetTitle>{t("show_title")}</SheetTitle>
        </SheetHeader>
        <Grid>
          <LabelValue label={t("employee")} value={payslip?.user?.full_name} />
          <LabelValue label={t("formula")} value={payslip?.formula?.name} />
          <LabelValue label={t("paid_days")} value={payslip?.paid_days} />
          <LabelValue label={t("gross_pay")} value={payslip?.gross_pay} />
          <LabelValue label={t("net_pay")} value={payslip?.net_pay} />
          <LabelValue
            label={t("status")}
            value={<TranslatableEnum value={payslip?.status} />}
          />
          <LabelValue
            label={t("total_benefits")}
            value={payslip?.total_benefits}
          />
          <LabelValue
            label={t("total_deductions")}
            value={payslip?.total_deductions}
          />
        </Grid>

        <div className={"my-5 w-full"}>
          <h1 className={"text-xl font-bold"}>{t("benefits")}</h1>
          {(payslip?.payslip_adjustments?.length ?? 0) > 0 ? (
            payslip?.payslip_adjustments
              ?.filter((i) => i.type == PayslipAdjustmentTypeEnum.BENEFIT)
              ?.map((ad, index) => (
                <div key={index} className={"rounded-md border p-1"}>
                  <LabelValue label={ad.reason} value={ad.amount} />
                </div>
              ))
          ) : (
            <TranslatableEnum value={"no_data"} />
          )}
        </div>

        <div className={"my-5 w-full"}>
          <h1 className={"text-xl font-bold"}>{t("deductions")}</h1>
          {(payslip?.payslip_adjustments?.length ?? 0) > 0 ? (
            payslip?.payslip_adjustments
              ?.filter((i) => i.type == PayslipAdjustmentTypeEnum.DEDUCTION)
              ?.map((ad, index) => (
                <div key={index} className={"rounded-md border p-1"}>
                  <LabelValue label={ad.reason} value={ad.amount} />
                </div>
              ))
          ) : (
            <TranslatableEnum value={"no_data"} />
          )}
        </div>

        <div className={"my-5 w-full"}>
          <h1 className={"text-xl font-bold"}>
            {t("variables_values_in_period")}
          </h1>
          <Grid gap={0}>
            {Object.keys(variablesValues).map((key, index) => {
              const item: { label: string; value: string } =
                variablesValues[key as keyof typeof variablesValues];
              return (
                <div className={"rounded-md border p-1"} key={index}>
                  <LabelValue
                    key={index}
                    label={item?.label}
                    value={item.value}
                  />
                </div>
              );
            })}
          </Grid>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShowPayslipSheet;
