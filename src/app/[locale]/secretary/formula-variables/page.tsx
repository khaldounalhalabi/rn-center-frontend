import { getRole } from "@/actions/HelperActions";
import PageCard from "@/components/common/ui/PageCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import FormulaVariableService from "@/services/FormulaVariableService";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const role = await getRole();
  const variables = (await FormulaVariableService.make(role).all())?.data;
  const t = await getTranslations("variables");
  return (
    <PageCard
      title={t("formula_variables")}
      description={t("index_description")}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("description")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((v, index) => (
            <TableRow key={index}>
              <TableCell>{v.id}</TableCell>
              <TableCell>{v.name}</TableCell>
              <TableCell>{v.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageCard>
  );
};

export default Page;
