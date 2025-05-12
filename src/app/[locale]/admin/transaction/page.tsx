"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { TransactionService } from "@/services/TransactionService";
import { Transaction } from "@/models/Transaction";
import Select from "@/components/common/ui/selects/Select";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import { RoleEnum } from "@/enums/RoleEnum";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { getEnumValues } from "@/helpers/Enums";
import TransactionTypeEnum from "@/enums/TransactionTypeEnum";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Link } from "@/navigation";

const Page = () => {
  const t = useTranslations("common.transaction.table");

  const {
    data: balance,
    isFetching,
    refetch: refetchBalance,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return await TransactionService.make(RoleEnum.ADMIN).balance();
    },
  });

  const tableData: DataTableData<Transaction> = {
    createUrl: `/admin/transaction/create`,
    title: `${t("transactions")}`,
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
        //   TODO: add user page button to get to the actor page
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
        render: (appointmentId, transaction) => {
          return transaction?.appointment_id ? (
            <Link
              href={`/admin/appointment/${transaction?.appointment_id}`}
              className={"btn"}
            >
              {transaction?.appointment?.date_time}
            </Link>
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
              baseUrl={`/admin/transactions`}
              editUrl={`/admin/transaction/${data?.id}/edit`}
              showUrl={`/admin/transaction/${data?.id}`}
              deleteHandler={deleteHandler}
              setHidden={setHidden}
            />
          );
        },
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await TransactionService.make<TransactionService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    filter: (params, setParams) => {
      return (
        <div className={"grid w-full grid-cols-1"}>
          <Label label={t("amount")}>
            <input
              className={"input input-xs input-bordered justify-self-end"}
              type={"number"}
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
          <input
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
            className="range range-xs"
          />
          <label className="label">{t("type")} :</label>
          <Select
            data={getEnumValues(TransactionTypeEnum)}
            selected={params.type}
            onChange={(event: string) => {
              setParams({ ...params, type: event });
            }}
            translated
          />

          <label className="label">{t("startDate")} :</label>
          <Datepicker
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [time?.format("YYYY-MM-DD"), params?.date?.[1]],
              });
            }}
            defaultValue={params?.date?.[0]}
          />
          <label className="label">{t("endDate")} :</label>
          <Datepicker
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [params?.date?.[0], time?.format("YYYY-MM-DD")],
              });
            }}
            defaultValue={params?.date?.[1]}
          />
        </div>
      );
    },
  };
  return (
    <>
      <div
        className={
          "m-3 flex items-center justify-between rounded-md bg-base-100 p-3 shadow-md"
        }
      >
        <Label label={t("balance")} />
        {isFetching ? (
          <LoadingSpin />
        ) : (
          <span className={"badge bg-brand-primary font-bold"}>
            {balance?.data?.balance}
          </span>
        )}
      </div>
      <DataTable {...tableData} />
    </>
  );
};

export default Page;
