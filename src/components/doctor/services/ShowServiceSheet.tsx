import Grid from "@/components/common/ui/Grid";
import Gallery from "@/components/common/ui/images/Gallery";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Service } from "@/models/Service";
import { EyeIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const ShowServiceSheet = ({ service , buttonText = undefined }: { service?: Service , buttonText?:string}) => {
  const t = useTranslations("admin.service.show");
  const locale = useLocale();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={buttonText ? "default" : "sm"} variant={buttonText ? "link" : "default"}>
          {buttonText ??
            <EyeIcon />
          }
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale == "ar" ? "left" : "right"}
        className={"w-[60vh] md:w-[80vh]"}
      >
        {" "}
        <SheetHeader>
          <SheetTitle>{t("serviceDetails")}</SheetTitle>
        </SheetHeader>
        <Grid md={2} gap={5}>
          <LabelValue label={t("serviceName")} value={service?.name} />
          <LabelValue
            label={t("category")}
            value={service?.service_category?.name}
          />

          <LabelValue
            label={t("approximateDuration")}
            value={service?.approximate_duration}
          />

          <LabelValue
            label={t("price")}
            value={`
              ${service?.price?.toLocaleString()}
            `}
            color={"secondary"}
          />
        </Grid>
        <Grid md={1}>
          <LabelValue
            label={t("description")}
            value={service?.description}
            col={true}
            color={"brand-primary"}
          />

          <Label label={t("image")} col>
            <Gallery media={service?.icon} sm />
          </Label>
        </Grid>
      </SheetContent>
    </Sheet>
  );
};

export default ShowServiceSheet;
