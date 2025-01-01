"use client";
import { useTranslations } from "next-intl";

const TranslatableEnum = ({ value }: { value: string|undefined }) => {
  const t = useTranslations("types_statuses");
  if (!value) {
    return "";
  }
  return <>{t(value as any)}</>;
};

export default TranslatableEnum;
