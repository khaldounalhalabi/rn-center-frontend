"use client";
import React, { Fragment, useState } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@/navigation";
import ClinicTransactionDate, {
  DateFilter,
} from "@/enum/ClinicTransactionDate";
import HandleFormatArrayDateFilter from "@/hooks/HandleFormatArrayDateFilter";
import ExportButton from "@/components/admin/appointment-deductions/ExportButton";
import { Dialog, Transition } from "@headlessui/react";
import ExcelIcon from "@/components/icons/ExcelIcon";
import AllMonth from "@/enum/Month";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";
import AppointmentDeductionStatusColumn from "@/components/admin/appointment-deductions/AppointmentStatusColumn";
import LoadingSpin from "@/components/icons/LoadingSpin";
import {
  NotificationPayload,
  RealTimeEvents,
} from "@/Models/NotificationPayload";
import NotificationHandler from "@/components/common/NotificationHandler";
import dayjs from "dayjs";
import ChangeStatusIcon from "@/components/icons/ChangeStatusIcon";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import ChangeAllStatusSelector from "@/components/admin/appointment-deductions/ChangeAllStatusSelector";
import DateTimePickerRangFilter from "@/components/common/ui/Date/DateTimePickerRangFilter";
import {useTranslations} from "next-intl";

interface filterExportType {
  year: string;
  month: string;
}

const Page = () => {
  const t = useTranslations("common.deductions.table")

  const [selectAll, setSelectAll] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [typeSelectAll, setTypeSelectAll] = useState(false);
  const queryClient = useQueryClient();
  const revalidateTable = () => {
    queryClient.invalidateQueries({
      queryKey: [`tableData_undefined_Appointment Deductions`],
    });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };
  const handleSelectAll = () => {
    setTypeSelectAll(!typeSelectAll);
    if (typeSelectAll) {
      setSelectedItems(selectAll);
    } else {
      setSelectedItems([]);
    }
  };

  const {
    data: balance,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return await AppointmentDeductionsService.make<AppointmentDeductionsService>(
        "admin",
      ).getAdminSummary();
    },
    refetchOnWindowFocus: false,
  });

  const [filterExport, setFilterExport] = useState<filterExportType>({
    year: dayjs().format("YYYY"),
    month: dayjs().format("MMMM"),
  });
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [isOpenStatus, setIsOpenStatus] = useState(false);

  function closeModalStatus() {
    setIsOpenStatus(false);
  }

  function openModalStatus() {
    setIsOpenStatus(true);
  }

  const [showCustomDate, setShowCustomDate] = useState(true);
  const [customDate, setCustomDate] = useState(DateFilter.CUSTOM_DATE);
  const tableData: DataTableData<AppointmentDeductions> = {
    title: `${t("appointmentDeductions")}`,
    extraButton: (
      <>
        <button className="btn btn-info btn-sm btn-square" onClick={openModal}>
          <ExcelIcon className={`w-6 h-6 cursor-pointer `} />
        </button>
        <button
          className={"btn btn-info  btn-sm btn-square"}
          disabled={selectedItems.length == 0}
        >
          <ChangeStatusIcon
            className={`w-6 h-6 cursor-pointer `}
            onClick={openModalStatus}
          />
        </button>
        <button className={"btn btn-info  btn-sm btn-square"}>
          <CheckMarkIcon
            className={`w-6 h-6 cursor-pointer `}
            onClick={handleSelectAll}
          />
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
        label: `${t("changeAllStatus")}`,
        render: (_id, translatable) => {
          return (
            <div className={"flex justify-center"}>
              <input
                type="checkbox"
                className="checkbox "
                checked={selectedItems.includes(translatable?.id ?? 0)}
                onChange={(e) =>
                  handleCheckboxChange(translatable?.id ?? 0, e.target.checked)
                }
              />
            </div>
          );
        },
      },
      {
        name: "appointment.clinic.user.first_name",
        sortable: true,
        label: `${t("clinicName")}`,
        render: (_first_name, transaction) => {
          return (
            <>
              {transaction?.clinic?.id ? (
                <div className={"btn btn-sm  cursor-pointer"}>
                  <Link href={`/admin/clinics/${transaction?.clinic?.id}`}>
                    <p>{TranslateClient(transaction?.clinic?.name)}</p>
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
        name: "appointment.clinic.user.first_name",
        sortable: true,
        label: `${t("doctor")}`,
        render: (_first_name, transaction) => {
          return (
            <>
              {transaction?.clinic?.id ? (
                <p>
                  {TranslateClient(transaction?.clinic?.user?.first_name)}{" "}
                  {TranslateClient(transaction?.clinic?.user?.middle_name)}{" "}
                  {TranslateClient(transaction?.clinic?.user?.last_name)}
                </p>
              ) : (
                <span className={"badge badge-warning"}>No Data</span>
              )}
            </>
          );
        },
      },
      {
        name: "amount",
        label: `${t("amount")}`,
        sortable: true,
        render: (data) => {
          return <span>{data.toLocaleString()}</span>;
        },
      },
      {
        name: "status",
        label: `${t("status")}`,
        render: (_status, transaction, _setHidden, revalidate) => {
          return (
            <AppointmentDeductionStatusColumn
              appointmentDeduction={transaction}
              revalidate={revalidate}
            />
          );
        },
        sortable: true,
      },
      {
        name: "date",
        label: `${t("date")}`,
        sortable: true,
      },
      {
        name: "appointment.date",
        label: `${t("appointmentDate")}`,
        sortable: true,
        render: (_id, transaction) => {
          return (
            <>
              {transaction?.appointment_id ? (
                <div className={"btn btn-sm  cursor-pointer"}>
                  <Link
                    href={`/admin/appointment/${transaction?.appointment_id}`}
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
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["show"]}
            baseUrl={`/admin/appointment-deductions`}
            showUrl={`/admin/appointment-deductions/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentDeductionsService.make<AppointmentDeductionsService>(
        "admin",
      )
        .indexWithPagination(page, search, sortCol, sortDir, perPage, params)
        .then((res) => {
          const allId = res?.data?.map((item) => item.id);
          setSelectAll(allId);
          return res;
        }),
    filter: (params, setParams) => {
      return (
        <div className={"w-full  grid grid-cols-1"}>
          <label className="label">{t("status")} :</label>
          <SelectFilter
            data={AppointmentDeductionsStatusArray()}
            selected={params.status ?? ""}
            onChange={(event: any) => {
              setParams({ ...params, status: event.target.value });
            }}
          />

          <label className="label">{t("range")} :</label>
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
              <label className="label">{t("startDate")} :</label>
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
              <label className="label">{t("endDate")} :</label>
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
      <NotificationHandler
        handle={(payload: NotificationPayload) => {
          if (payload.getNotificationType() == RealTimeEvents.BalanceChange) {
            refetch();
            revalidateTable();
          }
        }}
      />

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
                    <label className={"label"}>{t("year")} :</label>
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
                    <label className={"label"}>{t("month")} :</label>
                    <SelectFilter
                      data={AllMonth()}
                      selected={filterExport.month}
                      onChange={(e: any) => {
                        setFilterExport({
                          ...filterExport,
                          month: e.target.value,
                        });
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

      <Transition appear show={isOpenStatus} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalStatus}>
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
                  <h1 className={"card-title"}>Change All Status :</h1>
                  <ChangeAllStatusSelector
                    ids={selectedItems}
                    closeModalStatus={closeModalStatus}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <PageCard>
        {isLoading || isRefetching ? (
          <div className="flex items-center justify-center">
            <LoadingSpin className="h-8 w-8" />
          </div>
        ) : (
          <Grid md={2}>
            <label className="label">
              {t("balance")} :
              <span className="bg-base-200 px-2 rounded-xl text-lg">
                {Number(balance?.data?.balance).toFixed(1).toLocaleString()}
              </span>
            </label>
            <label className="label">
              {t("doneAppointmentDeductions")} :
              <span className="bg-base-200 px-2 rounded-xl text-lg">
                {Number(balance?.data?.done_appointment_deductions)
                  .toFixed(1)
                  .toLocaleString()}
              </span>
            </label>

            <label className="label">
              {t("pendingAppointmentDeductions")} :
              <span className="bg-base-200 px-2 rounded-xl text-lg">
                {Number(balance?.data?.pending_appointment_deductions)
                  .toFixed(1)
                  .toLocaleString()}
              </span>
            </label>
          </Grid>
        )}
      </PageCard>
      <DataTable {...tableData} />
    </>
  );
};

export default Page;