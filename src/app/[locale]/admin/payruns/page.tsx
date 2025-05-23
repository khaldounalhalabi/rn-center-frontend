"use client";
import React, { useState } from "react";
import PageCard from "@/components/common/ui/PageCard";
import { useLocale, useTranslations } from "next-intl";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import Payrun from "@/models/Payrun";
import PayrunService from "@/services/PayrunService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import PayrunStatusColumn from "@/components/common/payruns/PayrunStatusColumn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Button } from "@/components/ui/shadcn/button";
import DocumentPlus from "@/components/icons/DocumentPlus";
import PayrunForm from "@/components/common/payruns/PayrunForm";

const Page = () => {
  const t = useTranslations("payruns");
  const datatable: DataTableData<Payrun> = {
    schema: [
      {
        name: "id",
        sortable: true,
        label: "Id",
      },

      {
        name: "should_delivered_at",
        label: t("should_delivered_at"),
      },
      {
        name: "period",
        label: t("period"),
      },
      {
        name: "payment_cost",
        label: t("payment_cost"),
        sortable: true,
      },
      {
        name: "processed_users_count",
        label: t("processed_users_count"),
      },
      {
        name: "excluded_users_count",
        label: t("excluded_users_count"),
      },
      {
        name: "status",
        label: t("status"),
        sortable: true,
        render: (_stats, payrun, _setHidden, revalidate) => (
          <PayrunStatusColumn payrun={payrun} revalidate={revalidate} />
        ),
      },
      {
        label: t("actions"),
        render: (_data, fullObject, setHidden) => (
          <ActionsButtons
            buttons={fullObject?.can_delete ? ["show", "delete"] : ["show"]}
            baseUrl={"/admin/payruns"}
            data={fullObject}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PayrunService.make().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    extraButton: (revalidate) => <CreateSheet revalidate={revalidate} />,
  };
  return (
    <PageCard title={t("index_title")}>
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;

const CreateSheet = ({ revalidate }: { revalidate?: () => void }) => {
  const locale = useLocale();
  const t = useTranslations("payruns");
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type={"button"} size={"icon"}>
          <DocumentPlus />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale == "ar" ? "left" : "right"}
        className={"w-[60vh] md:w-[80vh]"}
      >
        <SheetHeader className={"my-5 items-start text-start"}>
          <SheetTitle>{t("create_title")}</SheetTitle>
        </SheetHeader>
        <PayrunForm
          revalidate={() => {
            if (revalidate) {
              revalidate();
            }
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
