"use client";
import React, {useState} from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { TransactionService } from "@/services/TransactionService";
import { Transactions } from "@/Models/Transactions";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import TransactionTypeArray from "@/enum/TransactionType";
import DateTimePickerRangFilter from "@/components/common/ui/DateTimePickerRangFilter";
import InputFilter from "@/components/common/ui/Inputs/InputFilter";
import dayjs from "dayjs";

const Page = () => {
    const [amountStart,setAmountStart] = useState(0)
    const [amountEnd,setAmountEnd] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState(dayjs().format("YYYY-MM-DD hh:mm"))
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
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/transactions`}
            editUrl={`/admin/transaction/${data?.id}/edit`}
            showUrl={`/admin/transaction/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
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
            defaultValue={0}
            onChange={(event:any) => {
                setAmountStart(event.target.value)
                const data = amountEnd && event.target.value ? [event.target.value,amountEnd] :event.target.value
                setParams({ ...params, amount: data });
            }}
          />
          <label className={"label"}>Amount To :</label>
          <InputFilter type="number" onChange={(event:any) => {
              setAmountEnd(event.target.value)
              const data = amountStart && event.target.value ? [amountStart,event.target.value] :event.target.value
              setParams({ ...params, amount: data });

          }} />
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
                setStartDate(time?.format("YYYY-MM-DD hh:mm"))
              setParams({ ...params, date: [time?.format("YYYY-MM-DD hh:mm"),endDate] });
            }}
          />
          <label className="label">End Date :</label>
          <DateTimePickerRangFilter
            onChange={(time: any) => {
                setEndDate(time?.format("YYYY-MM-DD hh:mm"))
                setParams({ ...params, date: [startDate,time?.format("YYYY-MM-DD hh:mm")] });
            }}
            defaultValue={dayjs().format("YYYY-MM-DD hh:mm")}
          />
        </div>
      );
    },
  };
  return <DataTable {...tableData} />;
};

export default Page;