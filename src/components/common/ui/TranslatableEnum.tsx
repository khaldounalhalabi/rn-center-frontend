"use client";
import { useTranslations } from "next-intl";

const TranslatableEnum = ({ value }: { value: string|undefined }) => {
  if (!value) {
    return "";
  }
  const t = useTranslations("types_statuses");

  return <>{t(value as any)}</>;
};

export default TranslatableEnum;
