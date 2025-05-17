"use client";
import { Link, usePathname } from "@/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("links");
  const isNumericString = (str?: string) => /^[0-9]+$/.test(str ?? "");

  // Split the pathname into parts and filter out empty values
  const pathParts = pathname.split("/").filter((part) => part);

  // Create breadcrumb links
  const breadcrumbs = pathParts.map((part, index) => {
    // Reconstruct the path up to the current part
    const href = "/" + pathParts.slice(0, index + 1).join("/");

    // Format the part for display (capitalize the first letter)
    const formattedPart = part.charAt(0) + part.slice(1);

    return (
      <BreadcrumbItem className={"rtl:flex rtl:items-center"} key={index}>
        {index == pathParts.length - 1 ? (
          <BreadcrumbPage>
            {isNumericString(formattedPart) ? formattedPart : t(formattedPart as any)}
          </BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={href}>
            <Link href={href}>
              {isNumericString(formattedPart)
                ? formattedPart
                : t(formattedPart as any)}
            </Link>
          </BreadcrumbLink>
        )}
        {index < pathParts.length - 1 && (
          <BreadcrumbSeparator>
            {locale == "ar" ? <ChevronLeft /> : <ChevronRight />}
          </BreadcrumbSeparator>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
