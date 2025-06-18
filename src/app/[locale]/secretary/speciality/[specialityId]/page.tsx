import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import Gallery from "@/components/common/ui/images/Gallery";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import { Speciality } from "@/models/Speciality";
import { Link } from "@/navigation";
import { SpecialityService } from "@/services/SpecialityService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const t = await getTranslations("admin.speciality.show");
  const data = await SpecialityService.make(RoleEnum.SECRETARY).show(
    specialityId,
  );
  const res: Speciality = data?.data;
  return (
    <PageCard
      title={t("specialityDetails")}
      actions={
        <Link href={`/secretary/speciality/${res.id}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
        </Link>
      }
    >
      <Grid md={2}>
        <LabelValue label={t("specialityName")} value={res.name} />
      </Grid>
      <LabelValue
        col
        label={t("description")}
        value={res.description}
        color={"info"}
      />
      <Label label={t("image")} col>
        <Gallery media={res?.image} />
      </Label>
    </PageCard>
  );
};

export default page;
