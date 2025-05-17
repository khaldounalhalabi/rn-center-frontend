"use client";
import React from "react";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/shadcn/button";

const LanguagePopover = () => {
  const t = useTranslations("components");

  const pathname = usePathname();
  const locale = useLocale();

  return (
    <Link href={pathname} locale={locale == "en" ? "ar" : "en"}>
      <Button variant={"outline"} size={"icon"}>
        {locale == "en" ? "AR" : "EN"}
      </Button>
    </Link>
  );
};

export default LanguagePopover;
