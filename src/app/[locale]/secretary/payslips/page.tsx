"use client";

import DataTable, {
  DataTableData,
  DataTableSchema,
  getTableQueryName,
} from "@/components/common/Datatable/DataTable";
import FormulaTemplateViewer from "@/components/common/formula/FormulaTemplateViewer";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
import PayslipStatusSelect from "@/components/common/payslips/PayslipStatusSelect";
import ShowPayslipSheet from "@/components/common/payslips/ShowPayslipSheet";
import Grid from "@/components/common/ui/Grid";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import PageCard from "@/components/common/ui/PageCard";
import CircleCheckMark from "@/components/icons/CircleCheckMark";
import DownloadIcon from "@/components/icons/DownloadIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import PayslipStatusEnum from "@/enums/PayslipStatusEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useDownload from "@/hooks/DownloadFile";
import { NotificationsTypeEnum } from "@/models/NotificationPayload";
import Payslip from "@/models/Payslip";
import PayslipService from "@/services/PayslipService";
import { useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("payslips");
  const schema: DataTableSchema<Payslip>[] = [
    { label: "ID", name: "id", sortable: true },
    {
      name: "paid_days",
      label: t("paid_days"),
    },
    {
      name: "gross_pay",
      label: t("gross_pay"),
    },
    {
      name: "net_pay",
      label: t("net_pay"),
    },
    {
      name: "status",
      label: t("status"),
      render: (status, payslip, _setHidden, revalidate) =>
        payslip?.can_toggle_status &&
        payslip?.status != PayslipStatusEnum.EXCLUDED &&
        payslip?.status != PayslipStatusEnum.DONE ? (
          <PayslipStatusSelect
            payslip={payslip}
            role={RoleEnum.SECRETARY}
            revalidate={revalidate}
          />
        ) : (
          <TranslatableEnum value={status} />
        ),
    },
    {
      name: "error",
      label: t("error"),
      sortable: true,
      render: (data, payslip) =>
        data && data?.length > 0 ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"destructive"} size={"icon"} type={"button"}>
                <CircleX />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-96"}>
              <Grid md={1}>
                {payslip?.error?.map((error, index) => (
                  <span
                    className={"w-fit text-wrap border-b p-3 text-destructive"}
                    key={index}
                  >
                    {error.message}
                  </span>
                ))}
              </Grid>
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant={"ghost"} type={"button"} size={"icon"}>
            <CircleCheckMark className={"text-emerald-700"} />
          </Button>
        ),
    },
    {
      name: "formula.template",
      label: t("formula"),
      render: (template) => <FormulaTemplateViewer formula={template} />,
    },
    {
      label: t("actions"),
      render: (data, payslip) => {
        return (
          <div className={"flex items-center gap-2"}>
            <ShowPayslipSheet payslip={payslip} />

            {payslip?.can_download && (
              <DownloadPayslipButton payslip={payslip} />
            )}
          </div>
        );
      },
    },
  ];

  const datatable: DataTableData<Payslip> = {
    schema: schema,
    api: async (page, search, sortCol, sortDir, perPage) =>
      await PayslipService.make(RoleEnum.SECRETARY).mine(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
      ),
  };
  const queryName = getTableQueryName(datatable);
  const queryClient = useQueryClient();
  return (
    <PageCard title={t("payslips")}>
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.type == NotificationsTypeEnum.NewPayrunAdded ||
            payload.type == NotificationsTypeEnum.PayslipUpdated
          ) {
            queryClient.invalidateQueries({
              queryKey: [queryName],
            });
          }
        }}
        isPermanent
      />
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;

const DownloadPayslipButton = ({ payslip }: { payslip: Payslip }) => {
  const { download, isLoading } = useDownload();
  return (
    <Button
      type={"button"}
      size={"icon"}
      onClick={() => {
        download(
          `/api/download?method=GET&url=secretary/payslips/${payslip?.id}/pdf`,
          {
            method: "POST",
            fileExtension: "pdf",
            customFilename: `${payslip?.user?.full_name}`,
          },
        );
      }}
    >
      {isLoading ? <LoadingSpin /> : <DownloadIcon />}
    </Button>
  );
};
