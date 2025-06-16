import FormulaTemplateViewer from "@/components/common/formula/FormulaTemplateViewer";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import { ApiResponse } from "@/http/Response";
import Formula from "@/models/Formula";
import { Link } from "@/navigation";
import FormulaService from "@/services/FormulaService";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { formulaId },
}: {
  params: { formulaId: number };
}) => {
  const data: ApiResponse<Formula> = await FormulaService.make(
    RoleEnum.ADMIN,
  ).show(formulaId);
  const formula = data.data;

  const t = await getTranslations("formulas");

  return (
    <PageCard
      title={t("show_title")}
      actions={
        <Link href={`/admin/formulas/${formulaId}/edit`}>
          <Button>{t("edit_button")}</Button>
        </Link>
      }
    >
      <Grid md={1} gap={8}>
        <LabelValue label={t("name")} value={formula.name} />
        <Label label={t("formula")} col>
          <div
            dir={"ltr"}
            className={"w-full rounded-md border border-secondary p-5"}
          >
            <FormulaTemplateViewer formula={formula.template ?? ""} />
          </div>
        </Label>
        <Label label={t("formula_segments")} col>
          {formula?.formula_segments?.map((segment, key) => (
            <LabelValue
              key={key}
              label={segment.name}
              value={<FormulaTemplateViewer formula={segment.template} />}
            />
          ))}
        </Label>
      </Grid>
    </PageCard>
  );
};

export default Page;
