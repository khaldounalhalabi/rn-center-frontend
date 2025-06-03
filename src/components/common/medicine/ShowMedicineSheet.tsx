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
import { Medicine } from "@/models/Medicine";
import { getTranslations } from "next-intl/server";

const ShowMedicineSheet = async ({ medicine }: { medicine?: Medicine }) => {
  const t = await getTranslations("common.medicine.show");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} type={"button"}>
          <Eye />
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("medicinesDetails")}</SheetTitle>
        </SheetHeader>
        <Grid md={2} gap={5}>
          <LabelValue label={t("medicineName")} value={medicine?.name} />
          <LabelValue
            label={t("status")}
            value={<TranslatableEnum value={medicine?.status} />}
          />
          <LabelValue label={t("quantity")} value={medicine?.quantity} />
          <LabelValue label={t("barcode_value")} value={medicine?.barcode} />
          <div className={"md:col-span-2"}>
            <LabelValue
              label={t("description")}
              col
              value={medicine?.description}
            />
          </div>
        </Grid>
      </SheetContent>
    </Sheet>
  );
};

export default ShowMedicineSheet;
