"use client";
import React, { Fragment, useState } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import dayjs from "dayjs";
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
import ChangeStatusIcon from "@/components/icons/ChangeStatusIcon";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import ChangeAllStatusSelector from "@/components/admin/appointment-deductions/ChangeAllStatusSelector";
import { useQueryClient } from "@tanstack/react-query";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";

interface filterExportType {
  year: string;
  month: string;
}

interface SelectedItems {
  id?: number;
  status?: string;
  amount?: number;
}

const AppointmentDeductionTable = ({ clinicId }: { clinicId: number }) => {
  const t = useTranslations("common.deductions.table");
  const [selectAll, setSelectAll] = useState<SelectedItems[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems[]>([]);
  const [typeSelectAll, setTypeSelectAll] = useState(false);
  const queryClient = useQueryClient();
  const revalidateTable = () => {
    queryClient.invalidateQueries({
      queryKey: ["tableData_undefined_Appointment Deductions"],
    });
  };
  const handleCheckboxChange = (item: SelectedItems, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((itemId) => itemId.id !== item.id),
      );
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
        <button
          className="p-2  rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] hover:bg-[#1fb8b9]"
          onClick={openModal}
        >
          <ExcelIcon className={`w-6 h-6 cursor-pointer `} />
        </button>
        <button
          className={`p-2  rounded-full border-[1px] border-[#44c4c5]   ${selectedItems.length == 0 ? "bg-gray-300" : "bg-[#8fdbdc] hover:bg-[#1fb8b9] cursor-pointer"}`}
          disabled={selectedItems.length == 0}
        >
          <ChangeStatusIcon
            className={`w-6 h-6 cursor-pointer `}
            onClick={openModalStatus}
          />
        </button>
        <button
          className={
            "p-2  rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] hover:bg-[#1fb8b9]"
          }
        >
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
        label: `${t("changeStatus")}`,
        render: (_id, deduction) => {
          return (
            <div className={"flex justify-center"}>
              <input
                type="checkbox"
                className="checkbox "
                checked={
                  selectedItems.filter((item) => item.id == deduction?.id)
                    .length > 0
                }
                onChange={(e) =>
                  handleCheckboxChange(
                    {
                      id: deduction?.id,
                      status: deduction?.status,
                      amount: deduction?.amount,
                    },
                    e.target.checked,
                  )
                }
              />
            </div>
          );
        },
      },
      {
        name: "amount",
        label: `${t("amount")}`,
        sortable: true,
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
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentDeductionsService.make<AppointmentDeductionsService>(
        "admin",
      )
        .getClinicAppointmentDeductions(
          clinicId,
          page,
          search,
          sortCol,
          sortDir,
          perPage,
          params,
        )
        .then((res) => {
          const allId = res?.data?.map((item) => ({
            id: item.id,
            status: item.status,
            amount: item.amount,
          }));
          setSelectAll(allId);
          return res;
        }),
    filter: (params, setParams) => {
      return (
        <div className={"w-full  grid grid-cols-1"}>
          <label className="label">{t("status")} :</label>
          <SelectFilter
            data={AppointmentDeductionsStatusArray()}
            selected={params.type ?? ""}
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
        handle={(payload) => {
          if (payload.getNotificationType() == RealTimeEvents.BalanceChange) {
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
                  <h1 className={"card-title"}>{t("changeAllStatus")} :</h1>
                  <ChangeAllStatusSelector
                    items={selectedItems}
                    closeModalStatus={closeModalStatus}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DataTable {...tableData} />
    </>
  );
};

export default AppointmentDeductionTable;
