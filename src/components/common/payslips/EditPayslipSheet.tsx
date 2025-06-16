import PayslipForm from "@/components/common/payslips/PayslipForm";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import Payslip from "@/models/Payslip";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const EditPayslipSheet = ({
  payslip,
  revalidate,
  role,
}: {
  payslip?: Payslip;
  revalidate?: () => void;
  role: RoleEnum;
}) => {
  const locale = useLocale();
  const t = useTranslations("payslips");
  const [open, setOpen] = useState(false);
  const variablesValues = payslip?.details?.variables_values ?? {};

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale == "ar" ? "left" : "right"}
        className={"w-[60vh] overflow-y-scroll md:w-[80vh]"}
      >
        <SheetHeader>
          <SheetTitle>{t("edit_title")}</SheetTitle>
        </SheetHeader>
        <PayslipForm
          payslip={payslip}
          onSuccess={() => {
            if (revalidate) {
              revalidate();
            }
            setOpen(false);
          }}
          role={role}
        />

        <div className={"w-full"}>
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

export default EditPayslipSheet;
