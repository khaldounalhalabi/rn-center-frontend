import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import { Medicine } from "@/models/Medicine";
import { Link } from "@/navigation";
import { MedicineService } from "@/services/MedicinesSevice";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
  const t = await getTranslations("common.medicine.show");

  const data = await MedicineService.make(RoleEnum.SECRETARY).show(medicinesId);
  const res: Medicine = data?.data;
  return (
    <PageCard
      title={t("medicinesDetails")}
      actions={
        <Link href={`/secretary/medicines/${medicinesId}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
        </Link>
      }
    >
      <Grid md={2} gap={5}>
        <LabelValue label={t("medicineName")} value={res?.name} />
        <LabelValue
          label={t("status")}
          value={<TranslatableEnum value={res?.status} />}
        />
        <LabelValue label={t("quantity")} value={res?.quantity} />
        <LabelValue label={t("barcode_value")} value={res?.barcode} />
        <div className={"md:col-span-2"}>
          <LabelValue label={t("description")} col value={res?.description} />
        </div>
      </Grid>
    </PageCard>
  );
};

export default page;
