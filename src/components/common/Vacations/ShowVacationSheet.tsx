"use client";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import Vacation from "@/models/Vacation";
import { EyeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Grid from "../ui/Grid";
import { LabelValue } from "../ui/labels-and-values/LabelValue";
import TranslatableEnum from "../ui/labels-and-values/TranslatableEnum";

const ShowVacationSheet = ({ vacation }: { vacation?: Vacation }) => {
  const t = useTranslations("vacations");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} type="button">
          <EyeIcon />
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("show_title")}</SheetTitle>
        </SheetHeader>
        <Grid>
          <LabelValue label={t("user")} value={vacation?.user?.full_name} />
          <LabelValue label={t("from")} value={vacation?.from} />
          <LabelValue label={t("to")} value={vacation?.to} />
          <LabelValue
            label={t("status")}
            value={<TranslatableEnum value={vacation?.status} />}
          />
          <div className="md:col-span-2">
            <LabelValue
              label={t("reason")}
              col={true}
              value={vacation?.reason}
            />
          </div>
          {vacation?.cancellation_reason && (
            <div className="md:col-span-2">
              <LabelValue
                label={t("cancellation_reason")}
                col
                value={vacation?.cancellation_reason}
              />
            </div>
          )}
        </Grid>
      </SheetContent>
    </Sheet>
  );
};

export default ShowVacationSheet;
