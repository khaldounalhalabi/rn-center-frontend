"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import TransactionTypeEnum from "@/enums/TransactionTypeEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import { Transaction } from "@/models/Transaction";
import { Link } from "@/navigation";
import { TransactionService } from "@/services/TransactionService";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/shadcn/input";

const Page = () => {
  const t = useTranslations("common.transaction.table");
  const { user } = useUser();

  const {
    data: balance,
    isFetching,
    refetch: refetchBalance,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return await TransactionService.make(RoleEnum.SECRETARY).balance();
    },
  });

  const tableData: DataTableData<Transaction> = {
    createUrl: `/secretary/transaction/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "actor.full_name",
        sortable: true,
        label: `${t("sender")}`,
      },
      {
        name: "type",
        label: `${t("type")}`,
        sortable: true,
        render: (type, transaction) => (
          <span
            className={`badge ${transaction?.type == TransactionTypeEnum.INCOME ? "badge-success" : "badge-error"}`}
          >
            <TranslatableEnum value={type} />
          </span>
        ),
      },
      {
        name: "amount",
        label: `${t("amount")}`,
        sortable: true,
        render: (amount, transaction) => (
          <span>
            {transaction?.type == TransactionTypeEnum.INCOME ? "+ " : "- "}
            {amount}
          </span>
        ),
      },
      {
        name: "date",
        label: `${t("date")}`,
        sortable: true,
      },
      {
        name: "appointment_id",
        label: `${t("appointmentDate")}`,
        sortable: true,
        render: (_appointmentId, transaction) => {
          return transaction?.appointment_id ? (
            user?.permissions?.includes(
              PermissionEnum.APPOINTMENT_MANAGEMENT,
            ) ? (
              <Link
                href={`/secretary/appointment/${transaction?.appointment_id}`}
              >
                <Button variant={"link"}>
                  {transaction?.appointment?.date_time}
                </Button>
              </Link>
            ) : (
              transaction?.appointment?.date_time
            )
          ) : (
            <TranslatableEnum value={"no_data"} />
          );
        },
      },
      {
        name: "payrun.from",
        label: `${t("payrun_date")}`,
        sortable: true,
        render: (_payrunFrom, transaction) => {
          return transaction?.payrun_id ? (
            user?.permissions?.includes(PermissionEnum.PAYROLL_MANAGEMENT) ? (
              <Link href={`/secretary/payruns/${transaction?.payrun_id}`}>
                <Button variant={"link"}>{transaction?.payrun?.period}</Button>
              </Link>
            ) : (
              transaction?.payrun?.period
            )
          ) : (
            <TranslatableEnum value={"no_data"} />
          );
        },
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => {
          const deleteHandler = () => {
            refetchBalance();
          };
          return (
            <ActionsButtons
              id={data?.id}
              buttons={["edit", "show", "delete"]}
              baseUrl={`/secretary/transactions`}
              editUrl={`/secretary/transaction/${data?.id}/edit`}
              showUrl={`/secretary/transaction/${data?.id}`}
              deleteHandler={deleteHandler}
              setHidden={setHidden}
            />
          );
        },
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await TransactionService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    filter: (params, setParams) => {
      return (
        <div className={"grid w-full grid-cols-1"}>
          <Label label={t("amount")}>
            <Input
              type={"number"}
              className={"px-1 py-1 max-w-24 max-h-5 border rounded text-[0.75rem] h-auto focus:ring-0"}
              onChange={(e) => {
                setParams({
                  ...params,
                  amount: ["0", `${e.target?.value}`],
                });
              }}
              defaultValue={params?.amount?.[1] ?? 0}
              value={params?.amount?.[1] ?? 0}
            />
          </Label>
          <Input
            type="range"
            min={0}
            max="10000000"
            value={params?.amount?.[1] ?? "0"}
            onChange={(e) => {
              setParams({
                ...params,
                amount: ["0", `${e.target?.value}`],
              });
            }}
          />
          <Select
            data={getEnumValues(TransactionTypeEnum)}
            selected={params.type}
            onChange={(event: string) => {
              setParams({ ...params, type: event });
            }}
            translated
            label={t("type")}
          />
          <Datepicker
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [time?.format("YYYY-MM-DD"), params?.date?.[1]],
              });
            }}
            defaultValue={params?.date?.[0]}
            label={t("startDate")}
          />
          <Datepicker
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [params?.date?.[0], time?.format("YYYY-MM-DD")],
              });
            }}
            defaultValue={params?.date?.[1]}
            label={t("endDate")}
          />
        </div>
      );
    },
  };
  return (
    <>
      <Card className={"mx-5"}>
        <CardHeader className={"flex flex-row items-center gap-5"}>
          <CardTitle>{t("balance")}</CardTitle>
          <CardDescription>
            {isFetching ? (
              <LoadingSpin />
            ) : (
              <Badge>{balance?.data?.balance}</Badge>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
      <PageCard title={t("transactions")}>
        <DataTable {...tableData} />
      </PageCard>
    </>
  );
};

export default Page;
