"use client";
import React, { useState } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { TransactionService } from "@/services/TransactionService";
import { Transactions } from "@/Models/Transactions";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import TransactionTypeArray from "@/enum/TransactionType";
import DateTimePickerRangFilter from "@/components/common/ui/Date/DateTimePickerRangFilter";
import InputFilter from "@/components/common/ui/Inputs/InputFilter";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import BalanceIcon from "@/components/icons/BalanceIcon";
import PendingAmountIcon from "@/components/icons/PendingAmountIcon";
import NotificationHandler from "@/components/common/NotificationHandler";
import {
  NotificationPayload,
  RealTimeEvents,
} from "@/Models/NotificationPayload";
import LoadingSpin from "@/components/icons/LoadingSpin";

const Page = () => {
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
  const tableData: DataTableData<Transactions> = {
    createUrl: `/admin/transaction/create`,
    title: `Transactions`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "actor.first_name",
        sortable: true,
        label: `${"Actor"}`,
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
        label: `Email`,
        sortable: true,
      },
      {
        name: "type",
        label: `Type`,
        sortable: true,
      },
      {
        name: "amount",
        label: `Amount`,
        sortable: true,
      },
      {
        name: "date",
        label: `Date`,
        sortable: true,
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/transactions`}
            editUrl={`/admin/transaction/${data?.id}/edit`}
            showUrl={`/admin/transaction/${data?.id}`}
            setHidden={setHidden}
          >
            <NotificationHandler
              handle={(payload) => {
                if (
                  payload.getNotificationType() ==
                    RealTimeEvents.BalanceChange &&
                  revalidate
                ) {
                  revalidate();
                }
              }}
            />
          </ActionsButtons>
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
          <label className={"label"}>Amount from :</label>
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
          <label className={"label"}>Amount To :</label>
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
          <label className="label">Type :</label>
          <SelectFilter
            data={TransactionTypeArray()}
            selected={params.type ?? "income"}
            onChange={(event: any) => {
              setParams({ ...params, type: event.target.value });
            }}
          />

          <label className="label">Start Date :</label>
          <DateTimePickerRangFilter
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [
                  time?.format("YYYY-MM-DD hh:mm"),
                  params?.date?.[1] ?? dayjs().format("YYYY-MM-DD hh:mm"),
                ],
              });
            }}
            defaultValue={params?.date?.[0] ?? ""}
          />
          <label className="label">End Date :</label>
          <DateTimePickerRangFilter
            onChange={(time: any) => {
              setParams({
                ...params,
                date: [
                  params?.date?.[0] ?? dayjs().format("YYYY-MM-DD hh:mm"),
                  time?.format("YYYY-MM-DD hh:mm"),
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
          }
        }}
      />
      <Grid>
        <PageCard>
          <label className={"card-title"}>Balance</label>
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
          <label className={"card-title"}>Pending Amount</label>
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
