"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { TransactionService } from "@/services/TransactionService";
import { Transactions } from "@/Models/Transactions";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import TransactionTypeArray from "@/enum/TransactionType";
import InputFilter from "@/components/common/ui/Inputs/InputFilter";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import BalanceIcon from "@/components/icons/BalanceIcon";
import PendingAmountIcon from "@/components/icons/PendingAmountIcon";
import {
  NotificationPayload,
  RealTimeEvents,
} from "@/Models/NotificationPayload";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";

const Page = () => {
  const t = useTranslations("common.transaction.table");

  const {
    data: balance,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return await TransactionService.make<TransactionService>(
        "admin",
      ).getSummary();
    },
  });

  const queryClient = useQueryClient();
  const revalidateTable = () => {
    queryClient.invalidateQueries({
      queryKey: [`tableData_/admin/transaction/create_Transactions`],
    });
  };

  const tableData: DataTableData<Transactions> = {
    createUrl: `/admin/transaction/create`,
    title: `${t("transactions")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "actor.first_name",
        sortable: true,
        label: `${t("sender")}`,
        render: (_first_name, data) => {
          return (
            <p>
              {TranslateClient(data?.actor?.first_name)}{" "}
              {TranslateClient(data?.actor?.middle_name)}{" "}
              {TranslateClient(data?.actor?.last_name)}
            </p>
          );
        },
      },
      {
        name: "actor.email",
        label: `${t("email")}`,
        sortable: true,
      },
      {
        name: "type",
        label: `${t("type")}`,
        sortable: true,
      },
      {
        name: "amount",
        label: `${t("amount")}`,
        sortable: true,
        render: (_amount, transaction) => (
          <span
            className={`${transaction?.type == "system_debt" ? "badge badge-error" : transaction?.type == "debt_to_me" ? "badge badge-success" : ""}`}
          >
            {transaction?.type == "income"
              ? "+"
              : transaction?.type == "outcome"
                ? "-"
                : ""}
            {transaction?.amount.toLocaleString()}
          </span>
        ),
      },
      {
        name: "date",
        label: `${t("date")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/transactions`}
            editUrl={`/admin/transaction/${data?.id}/edit`}
            showUrl={`/admin/transaction/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await TransactionService.make<TransactionService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    filter: (params, setParams) => {
      return (
        <div className={"w-full  grid grid-cols-1"}>
          <label className={"label"}>{t("amountFrom")} :</label>
          <InputFilter
            type="number"
            defaultValue={params?.amount?.[0] ?? 0}
            onChange={(event: any) => {
              const data = event.target.value
                ? [event.target.value, params?.amount?.[1] ?? 99999]
                : event.target.value;
              setParams({ ...params, amount: data });
            }}
          />
          <label className={"label"}>{t("amountTo")} :</label>
          <InputFilter
            type="number"
            defaultValue={params?.amount?.[1] ?? 99999}
            onChange={(event: any) => {
              const data = event.target.value
                ? [params?.amount?.[0] ?? 0, event.target.value]
                : event.target.value;
              setParams({ ...params, amount: data });
            }}
          />
          <label className="label">{t("type")} :</label>
          <SelectFilter
            data={TransactionTypeArray()}
            selected={params.type ?? "income"}
            onChange={(event: any) => {
              setParams({ ...params, type: event.target.value });
            }}
          />

          <label className="label">{t("startDate")} :</label>
          <DatepickerFilter
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [
                  time?.format("YYYY-MM-DD") + " 00:00:01",
                  params?.date?.[1] ??
                    dayjs().format("YYYY-MM-DD") + " 23:59:59",
                ],
              });
            }}
            defaultValue={params?.date?.[0] ?? ""}
          />
          <label className="label">{t("endDate")} :</label>
          <DatepickerFilter
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [
                  params?.date?.[0] ??
                    dayjs().format("YYYY-MM-DD") + " 00:00:01",
                  time?.format("YYYY-MM-DD") + " 23:59:59",
                ],
              });
            }}
            defaultValue={params?.date?.[1] ?? ""}
          />
        </div>
      );
    },
  };
  return (
    <>
      <NotificationHandler
        handle={(payload: NotificationPayload) => {
          if (payload.getNotificationType() == RealTimeEvents.BalanceChange) {
            refetch();
            revalidateTable();
          }
        }}
      />
      <Grid>
        <PageCard>
          <label className={"card-title"}>{t("clinicBalance")}</label>
          <div className={"my-4 flex items-center justify-between"}>
            <div className={"p-4 rounded-full bg-green-100"}>
              <BalanceIcon
                className={"w-9 h-9 bg-green-100 rounded-full fill-green-600"}
              />
            </div>
            {isLoading ? (
              <LoadingSpin className="w-6 h-6" />
            ) : (
              <span suppressHydrationWarning className=" mx-4 text-2xl">
                {Number(balance?.data?.balance ?? 0).toLocaleString()} IQD
              </span>
            )}
          </div>
        </PageCard>
        <PageCard>
          <label className={"card-title"}>{t("pendingAmount")}</label>
          <div className={"my-4 flex items-center justify-between"}>
            <div className={"p-4 rounded-full bg-indigo-100"}>
              <PendingAmountIcon className={"w-9 h-9 fill-indigo-600"} />
            </div>
            {isLoading ? (
              <LoadingSpin className="w-6 h-6" />
            ) : (
              <span suppressHydrationWarning className=" mx-4 text-2xl">
                {Number(balance?.data?.pending_amount ?? 0).toLocaleString()}{" "}
                IQD
              </span>
            )}
          </div>
        </PageCard>
      </Grid>
      <DataTable {...tableData} />
    </>
  );
};

export default Page;
