"use client";
import { Button } from "@/components/ui/shadcn/button";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

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
