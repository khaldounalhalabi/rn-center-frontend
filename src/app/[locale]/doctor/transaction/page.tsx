"use client";
import React, { Fragment, useState } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Transactions } from "@/Models/Transactions";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import InputFilter from "@/components/common/ui/Inputs/InputFilter";
import dayjs from "dayjs";
import { ClinicTransactionService } from "@/services/ClinicTransactionService";
import { ClinicTransaction } from "@/Models/ClinicTransaction";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import BalanceIcon from "@/components/icons/BalanceIcon";
import PendingAmountIcon from "@/components/icons/PendingAmountIcon";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/navigation";
import ClinicTransactionTypeArray, {
  TransactionType,
} from "@/enum/ClinicTransactionType";
import ClinicTransactionStatusArray from "@/enum/ClinicTransactionStatus";
import ClinicTransactionDate, {
  DateFilter,
} from "@/enum/ClinicTransactionDate";
import HandleFormatArrayDateFilter from "@/hooks/HandleFormatArrayDateFilter";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import ExportButton from "@/components/doctor/transaction/ExportButton";
import { Dialog, Transition } from "@headlessui/react";
import ExcelIcon from "@/components/icons/ExcelIcon";
import AllMonth, { MonthsEnum } from "@/enum/Month";
import ChartIcon from "@/components/icons/ChartIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";

interface filterExportType {
  year: string;
  month: string;
}

const Page = () => {
  const {
    data: balance,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return await ClinicTransactionService.make<ClinicTransactionService>(
        "doctor"
      ).getSummary();
    },
  });
  const [filterExport, setFilterExport] = useState<filterExportType>({
    year: "",
    month: "",
  });
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const type = ClinicTransactionTypeArray().map((type) =>
    type.replace(/_/g, " ")
  );
  const [showCustomDate, setShowCustomDate] = useState(true);
  const [customDate, setCustomDate] = useState(DateFilter.CUSTOM_DATE);
  const tableData: DataTableData<ClinicTransaction> = {
    createUrl: `/doctor/transaction/create`,
    title: `Transactions`,
    extraButton: (
      <>
        <Link href={`/doctor/transaction/chart`} className={"mx-1"}>
          <button className="btn btn-info btn-sm p-1 btn-square">
            <ChartIcon className={"w-6 h-6"} />
          </button>
        </Link>
        <button className="btn btn-info btn-sm btn-square" onClick={openModal}>
          <ExcelIcon className={`w-6 h-6 cursor-pointer `} />
        </button>
      </>
    ),
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "appointment.customer.first_name",
        sortable: true,
        label: `${"Patient"}`,
        render: (_first_name, transaction) => {
          return (
            <>
              {transaction?.appointment?.customer_id ? (
                <div className={"btn btn-sm  cursor-pointer"}>
                  <Link
                    href={`/doctor/patients/${transaction?.appointment?.customer?.id}`}
                  >
                    <p>
                      {TranslateClient(
                        transaction?.appointment?.customer?.user?.first_name
                      )}{" "}
                      {TranslateClient(
                        transaction?.appointment?.customer?.user?.middle_name
                      )}{" "}
                      {TranslateClient(
                        transaction?.appointment?.customer?.user?.last_name
                      )}
                    </p>
                  </Link>
                </div>
              ) : (
                <span className={"badge badge-warning"}>No Data</span>
              )}
            </>
          );
        },
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
        render:(_amount, transaction)=>(
            <span className={`${transaction?.type == "system_debt"?"badge badge-error":transaction?.type == "debt_to_me"?"badge badge-success":""}`}>
              {transaction?.type == "income"?"+":transaction?.type == "outcome"?"-":""}{transaction?.amount}
            </span>
        )
      },
      {
        name: "after_balance",
        label: `After Balance`,
        sortable: true,
      },
      {
        name: "before_balance",
        label: `Before Balance`,
        sortable: true,
      },
      {
        name: "status",
        label: `Status`,
        sortable: true,
      },
      {
        name: "date",
        label: `Date`,
        sortable: true,
      },
      {
        name: "appointment.date",
        label: `Appointment Date`,
        sortable: true,
        render: (_id, transaction) => {
          return (
            <>
              {transaction?.appointment_id ? (
                <div className={"btn btn-sm  cursor-pointer"}>
                  <Link
                    href={`/doctor/appointment/${transaction?.appointment_id}`}
                  >
                    {transaction?.appointment?.date}
                  </Link>
                </div>
              ) : (
                <span className={"badge badge-warning"}>No Data</span>
              )}
            </>
          );
        },
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/doctor/clinic-transactions`}
            editUrl={`/doctor/transaction/${data?.id}/edit`}
            showUrl={`/doctor/transaction/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicTransactionService.make<ClinicTransactionService>().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params
      ),
    filter: (params, setParams) => {
      return (
        <div className={"w-full  grid grid-cols-1"}>
          <label className={"label"}>Amount from :</label>
          <InputFilter
            type="number"
            defaultValue={params?.amount?.[0] ?? 0}
            onChange={(event: any) => {
              const data = event.target.value
                ? [event.target.value, params?.amount?.[1] ?? 999999999]
                : event.target.value;
              setParams({ ...params, amount: data });
            }}
          />
          <label className={"label"}>Amount To :</label>
          <InputFilter
            type="number"
            defaultValue={params?.amount?.[1] ?? 999999999}
            onChange={(event: any) => {
              const data = event.target.value
                ? [params?.amount?.[0] ?? 0, event.target.value]
                : event.target.value;
              setParams({ ...params, amount: data });
            }}
          />
          <label className="label">Type :</label>
          <SelectFilter
            data={type}
            selected={params.type ?? ""}
            onChange={(event: any) => {
              if (event.target.value == "system debt") {
                setParams({ ...params, type: TransactionType.SYSTEM_DEBT });
              } else if (event.target.value == "debt to me") {
                setParams({ ...params, type: TransactionType.DEBT_TO_ME });
              } else {
                setParams({ ...params, type: event.target.value });
              }
            }}
          />
          <label className="label">Status :</label>
          <SelectFilter
            data={ClinicTransactionStatusArray()}
            selected={params.status ?? ""}
            onChange={(event: any) => {
              setParams({ ...params, status: event.target.value });
            }}
          />

          <label className="label">Range :</label>
          <SelectFilter
            data={ClinicTransactionDate()}
            selected={customDate}
            onChange={(event: any) => {
              if (event.target.value == DateFilter.CUSTOM_DATE) {
                setShowCustomDate(true);
                setCustomDate(DateFilter.CUSTOM_DATE);
              } else {
                setCustomDate(event.target.value);
                setShowCustomDate(false);
                const date = HandleFormatArrayDateFilter(event.target.value);
                setParams({
                  ...params,
                  date: date,
                });
              }
            }}
          />
          {showCustomDate ? (
            <>
              <label className="label">Start Date :</label>
              <DatepickerFilter
                onChange={(time: any) => {
                  setParams({
                    ...params,
                    date: [
                      time?.format("YYYY-MM-DD"),
                      params?.date?.[1] ?? dayjs().format("YYYY-MM-DD"),
                    ],
                  });
                }}
                defaultValue={params?.date?.[0] ?? ""}
              />
              <label className="label">End Date :</label>
              <DatepickerFilter
                onChange={(time: any) => {
                  setParams({
                    ...params,
                    date: [
                      params?.date?.[0] ?? dayjs().format("YYYY-MM-DD"),
                      time?.format("YYYY-MM-DD"),
                    ],
                  });
                }}
                defaultValue={params?.date?.[1] ?? ""}
              />
            </>
          ) : (
            ""
          )}
        </div>
      );
    },
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className={"w-full my-4 grid grid-cols-1"}>
                    <label className={"label"}>Year :</label>
                    <input
                      className="input input-bordered w-full focus:outline-pom focus:border-pom"
                      type={"number"}
                      min={1900}
                      max={2099}
                      step={1}
                      onChange={(e) =>
                        setFilterExport({
                          ...filterExport,
                          year: e.target.value,
                        })
                      }
                      defaultValue={filterExport.year}
                    />
                    <label className={"label"}>Month :</label>
                    <SelectFilter
                      data={AllMonth()}
                      selected={MonthsEnum.NON}
                      onChange={(e: any) => {
                        if (e.target.value == MonthsEnum.NON) {
                          setFilterExport({
                            ...filterExport,
                            month: "",
                          });
                        } else {
                          setFilterExport({
                            ...filterExport,
                            month: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>

                  <ExportButton data={filterExport} close={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Grid>
        <PageCard>
          <label className={"card-title"}>Clinic Balance</label>
          <div className={"my-4 flex items-center justify-between"}>
            <div className={"p-4 rounded-full bg-green-100"}>
              <BalanceIcon
                className={"w-9 h-9 bg-green-100 rounded-full fill-green-600"}
              />
            </div>
            {isLoading || isFetching ? (
              <LoadingSpin />
            ) : (
              <span suppressHydrationWarning className=" mx-4 text-2xl">
                {Number(balance?.data?.clinic_balance ?? 0).toLocaleString()}{" "}
                IQD
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
            {isLoading || isFetching ? (
              <LoadingSpin />
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