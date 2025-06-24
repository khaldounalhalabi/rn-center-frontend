import DocumentPlus from "@/components/icons/DocumentPlus";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import Asset from "@/models/Asset";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AssetForm from "./AssetForm";

const AssetFormSheet = ({
  asset,
  type,
  revalidate,
}: {
  asset?: Asset;
  type: "store" | "update";
  revalidate?: () => Promise<void> | void;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("assets");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={type == "store" ? "default" : "secondary"}
          type="button"
          size={"icon"}
        >
          {type == "store" ? <DocumentPlus /> : <Pencil />}
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>
            {type == "store"
              ? t("create_title")
              : t("edit_title", { asset_name: asset?.name })}
          </SheetTitle>
        </SheetHeader>
        <AssetForm
          type={type}
          asset={asset}
          onSuccess={async () => {
            if (revalidate) {
              await revalidate();
            }
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AssetFormSheet;
