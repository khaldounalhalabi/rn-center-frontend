"use client";
import MyAssetsTable from "@/components/common/assets/MyAssetsTable";
import PageCard from "@/components/common/ui/PageCard";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("assets");
  return (
    <PageCard title={t("index_title")}>
      <MyAssetsTable />
    </PageCard>
  );
};

export default Page;
