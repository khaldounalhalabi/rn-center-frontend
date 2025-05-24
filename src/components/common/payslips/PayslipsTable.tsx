"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import PageCard from "@/components/common/ui/PageCard";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import Payslip from "@/models/Payslip";
import { Button } from "@/components/ui/shadcn/button";
import { Link } from "@/navigation";
import { CheckCircle, CircleCheck, CircleX } from "lucide-react";
import { RoleEnum } from "@/enums/RoleEnum";
import PayslipService from "@/services/PayslipService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import Grid from "@/components/common/ui/Grid";
import EditPayslipSheet from "@/components/common/payslips/EditPayslipSheet";
import DownloadIcon from "@/components/icons/DownloadIcon";
import useDownload from "@/hooks/DownloadFile";
import LoadingSpin from "@/components/icons/LoadingSpin";
import Payrun from "@/models/Payrun";
import ShowPayslipSheet from "@/components/common/payslips/ShowPayslipSheet";
import PayslipStatusEnum from "@/enums/PayslipStatusEnum";
import BlockIcon from "@/components/icons/BlockIcon";
import Select from "@/components/common/ui/selects/Select";
import Tooltip from "@/components/common/ui/Tooltip";
import { TranslateStatusOrTypeClient } from "@/helpers/TranslationsClient";
import { toast } from "sonner";

const PayslipsTable = ({ payrun }: { payrun: Payrun }) => {
  const t = useTranslations("payslips");
  const datatable: DataTableData<Payslip> = {
    schema: [
      {
        name: "user.full_name",
        label: t("employee"),
        render: (data, payslip) => (
          <Link
            href={`/admin/${payslip?.user?.role == RoleEnum.SECRETARY ? `secretaries/${payslip?.user_id}` : `clinics/${payslip?.user?.clinic?.id}`}`}
          >
            <Button variant={"link"}>{data}</Button>
          </Link>
        ),
      },
      {
        name: "formula.name",
        label: t("formula"),
        render: (_data, fullObject) => (
          <Link href={`/admin/formulas/${fullObject?.formula_id}`}>
            <Button variant={"link"}>{fullObject?.formula?.name}</Button>
          </Link>
        ),
        sortable: true,
      },
      {
        name: "paid_days",
        label: t("paid_days"),
        sortable: true,
      },
      {
        name: "gross_pay",
        label: t("gross_pay"),
        sortable: true,
      },
      {
        name: "net_pay",
        label: t("net_pay"),
        sortable: true,
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
                      className={
                        "w-fit text-wrap border-b p-3 text-destructive"
                      }
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
              <CircleCheck className={"text-emerald-700"} />
            </Button>
          ),
      },
      {
        name: "total_benefits",
        label: t("total_benefits"),
      },
      {
        name: "total_deductions",
        label: t("total_deductions"),
      },
      {
        label: t("actions"),
        render: (_data, payslip, _setHidden, revalidate) => (
          <div className={"flex items-center gap-2"}>
            <ShowPayslipSheet payslip={payslip} />
            {payslip?.can_update && (
              <EditPayslipSheet payslip={payslip} revalidate={revalidate} />
            )}
            {payslip?.can_update && <ExcludeIncludeButton payslip={payslip} revalidate={revalidate} />}
            {payslip?.can_download && (
              <DownloadPayslipButton payslip={payslip} payrun={payrun} />
            )}
          </div>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PayslipService.make().getByPayrun(
        payrun?.id,
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),

    filter: (params, setParams) => (
      <div className={"flex flex-col"}>
        <Select
          data={[PayslipStatusEnum.EXCLUDED, PayslipStatusEnum.DRAFT]}
          onChange={(v) => {
            setParams({ ...params, status: v });
          }}
          selected={params?.status}
          translated
          label={t("status")}
        />
      </div>
    ),
  };
  return (
    <PageCard title={t("payslips")}>
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default PayslipsTable;

const DownloadPayslipButton = ({
  payslip,
  payrun,
}: {
  payslip?: Payslip;
  payrun?: Payrun;
}) => {
  const { download, isLoading } = useDownload();

  return (
    <Button
      size={"icon"}
      type={"button"}
      onClick={() => {
        download(
          `/api/download?method=GET&url=admin/payslips/${payslip?.id}/pdf`,
          {
            method: "POST",
            fileExtension: "pdf",
            customFilename: `${payslip?.user?.full_name} ${payrun?.period} payslip`,
          },
        );
      }}
    >
      {isLoading ? <LoadingSpin /> : <DownloadIcon />}
    </Button>
  );
};

const ExcludeIncludeButton = ({ payslip , revalidate }: { payslip?: Payslip , revalidate?:() => void }) => {
  const t =  useTranslations("payslips")
  const [loading, setLoading] = useState(false);
  const [excluded, setExcluded] = useState(
    payslip?.status == PayslipStatusEnum.EXCLUDED,
  );

  const onClick = () => {
    if (payslip?.status == PayslipStatusEnum.EXCLUDED) {
      setLoading(true);
      PayslipService.make()
        .toggleStatus(payslip?.id ?? 0, PayslipStatusEnum.DRAFT)
        .then((res) => {
          setLoading(false);
          setExcluded(false);
          toast(res.message as string)
          if (revalidate){
            revalidate();
          }
        });
    } else {
      setLoading(true);
      PayslipService.make()
        .toggleStatus(payslip?.id ?? 0, PayslipStatusEnum.EXCLUDED)
        .then((res) => {
          setLoading(false);
          setExcluded(true);
          toast(res.message as string)
          if (revalidate){
            revalidate();
          }
        });
    }
  };
  if (excluded) {
    return (
      <Tooltip title={t("include")}>
        <Button onClick={onClick} variant={"success"} size={"icon"}>
          {loading ? <LoadingSpin /> : <CheckCircle />}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={t("exclude")}>
      <Button onClick={onClick} variant={"destructive"} size={"icon"}>
        {loading ? <LoadingSpin /> : <BlockIcon />}
      </Button>
    </Tooltip>
  );
};
