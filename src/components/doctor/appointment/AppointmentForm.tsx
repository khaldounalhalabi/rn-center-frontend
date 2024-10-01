"use client";
import Form from "@/components/common/ui/Form";
import React, { Fragment, useEffect, useState } from "react";
import Grid from "@/components/common/ui/Grid";
import { Appointment } from "@/Models/Appointment";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { AppointmentService } from "@/services/AppointmentService";
import { Navigate } from "@/Actions/navigate";
import { CustomerService } from "@/services/CustomerService";
import { Customer } from "@/Models/Customer";
import { swal } from "@/Helpers/UIHelpers";
import { HandleDatePicker } from "@/hooks/CheckTimeAvailable";
import {
  AppointmentStatusEnum,
  AppointmentStatusesFilter,
} from "@/enum/AppointmentStatus";
import { useQuery } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { OffersService } from "@/services/OffersService";
import { Offers } from "@/Models/Offers";
import HandleCalcOffers from "@/hooks/HandleCalcOffers";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import PageCard from "@/components/common/ui/PageCard";
import PatientForm from "@/components/doctor/patients/PatientForm";
import { useTranslations } from "next-intl";
import { User } from "@/Models/User";

const AppointmentForm = ({
  defaultValues = undefined,
  id,
  patient,
  type = "store",
  clinic = undefined,
}: {
  defaultValues?: Appointment;
  id?: number;
  patient?: Customer;
  type?: "store" | "update";
  clinic?: User | undefined;
}) => {
  const t = useTranslations("common.appointment.create");
  const [date, setDate] = useState(defaultValues ?? {});
  const [customer_id, setCustomerId] = useState(0);
  const [offer, setOffer] = useState(defaultValues?.offers ?? []);
  const { data: availableTimes } = useQuery({
    queryKey: ["availableTimes"],
    queryFn: async () => {
      return await AppointmentService.make<AppointmentService>(
        "doctor",
      ).getAvailableTimesClinic();
    },
  });
  const range = {
    id: clinic?.clinic?.id ?? 0,
    appointment_cost: clinic?.clinic?.appointment_cost ?? 0,
    range: clinic?.clinic?.appointment_day_range ?? 0,
    maxAppointment: clinic?.clinic?.max_appointments ?? 0,
    data: {
      booked_times: availableTimes?.data?.booked_times ?? [],
      clinic_schedule: availableTimes?.data?.clinic_schedule ?? {},
      clinic_holidays: availableTimes?.data?.clinic_holidays ?? [],
    },
  };
  console.log(clinic);
  console.log(range)
  const { data: lastVisitData } = useQuery({
    queryKey: ["getLastVisit", customer_id, range.id],
    queryFn: async () => {
      if (customer_id) {
        return await CustomerService.make<CustomerService>(
          "doctor",
        ).getDoctorCustomerLastVisit(customer_id ?? 0);
      } else {
        return { data: { date: "" } };
      }
    },
  });
  const lastAppointmentDate = lastVisitData?.data?.date;
  const handleSubmit = async (data: any) => {
    const sendData = patient?.id
      ? {
          ...data,
          customer_id: patient?.id,
        }
      : data;
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return AppointmentService.make<AppointmentService>("doctor")
        .update(defaultValues?.id ?? id, sendData)
        .then((res) => {
          console.log(res);

          if (res.code == 425) {
            swal.fire("The time you selected is unavailable!");
            return res;
          } else return res;
        });
    } else {
      return await AppointmentService.make<AppointmentService>("doctor")
        .store(sendData)
        .then((res) => {
          console.log(res);
          if (res.code == 425) {
            swal.fire("The time you selected is unavailable!");
            return res;
          } else return res;
        });
    }
  };
  const onSuccess = () => {
    patient?.id
      ? Navigate(`/doctor/patients/${patient?.id}`)
      : Navigate(`/doctor/appointment`);
  };
  const [getExtra, setExtra] = useState(0);
  const [getDiscount, setDiscount] = useState(0);

  const [getServicePrice, setServicePrice] = useState<number | undefined>(
    defaultValues?.service?.price ? defaultValues?.service?.price : 0,
  );

  const [status, setStatus] = useState(defaultValues?.status);
  const statusData = AppointmentStatusesFilter(
    defaultValues?.type ?? "",
    defaultValues?.status ?? "",
  );

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitAppointmentDate = async (data: any) => {
    return await AppointmentService.make<AppointmentService>("doctor")
      .updateDate(defaultValues?.id ?? 0, data)
      .then((res) => {
        setDate({
          ...defaultValues,
          date: res.data.date,
        });
        return res;
      });
  };

  const appointmentCostOffer = HandleCalcOffers(
    offer,
    range.appointment_cost,
    "offer",
  );

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(handleTotalCost());
  }, [getServicePrice, getExtra, range, getDiscount, offer]);

  const handleTotalCost = (): number => {
    return (
      appointmentCostOffer +
      Number(getServicePrice) +
      Number(getExtra) -
      Number(getDiscount)
    );
  };

  let [isOpenPatient, setIsOpenPatient] = useState(false);
  let [reloadSelect, setReloadSelect] = useState("");

  function closeModalPatient() {
    setReloadSelect("re");
    setIsOpenPatient(false);
  }

  function openModalPatient() {
    setIsOpenPatient(true);
  }

  return (
    <PageCard>
      <div className={"flex justify-between"}>
        <div className={"flex flex-col"}>
          <h2 className="card-title">
            {type == "store" ? t("createAppointment") : t("editAppointment")}
          </h2>
          {type == "store" || !patient ? (
            ""
          ) : (
            <h3>
              Patient :{" "}
              <span className={"badge badge-outline"}>
                {TranslateClient(defaultValues?.customer?.user?.full_name)}{" "}
              </span>
            </h3>
          )}

          {patient && type != "update" && (
            <h3>
              Patient :{" "}
              <span className={"badge badge-outline"}>
                {TranslateClient(patient?.user?.full_name)}{" "}
              </span>
            </h3>
          )}
        </div>
        <button
          type={"button"}
          className="btn btn-info"
          onClick={openModalPatient}
        >
          {t("newPatient")}
        </button>
      </div>
      <Transition appear show={isOpenPatient} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[1000]"
          onClose={closeModalPatient}
        >
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
                <Dialog.Panel className="w-full max-w-[70vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <PatientForm appointment={true} close={closeModalPatient} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
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
                  <Form
                    handleSubmit={handleSubmitAppointmentDate}
                    onSuccess={() => closeModal()}
                    defaultValues={date}
                  >
                    <h1 className={"card-title"}>{t("setDate")} : </h1>
                    <Datepicker
                      name={"date"}
                      label={t("date")}
                      required={true}
                      shouldDisableDate={(day) => {
                        const data = range.data;
                        return HandleDatePicker(
                          data,
                          day,
                          range.range,
                          range?.maxAppointment,
                        );
                      }}
                    />
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={defaultValues}
      >
        {!patient?.id && type === "store" ? (
          <div className={"w-full"}>
            <h2 className={"text-xl font-bold border-b my-5"}>
              Patient Details:
            </h2>
            <div className={"w-full md:w-1/2"}>
              <ApiSelect
                required={true}
                name={"customer_id"}
                placeHolder={"Select Patient Name ..."}
                api={(page, search) =>
                  CustomerService.make<CustomerService>("doctor")
                    .setHeaders({ filtered: true })
                    .indexWithPagination(page, search)
                }
                onSelect={(selectedItem) => {
                  setCustomerId(selectedItem?.id ?? 0);
                }}
                label={t("customerName")}
                optionValue={"id"}
                getOptionLabel={(data: Customer) => {
                  return (
                    <p>
                      {TranslateClient(data?.user?.first_name)}{" "}
                      {TranslateClient(data?.user?.middle_name)}{" "}
                      {TranslateClient(data?.user?.last_name)}
                    </p>
                  );
                }}
                revalidate={reloadSelect}
              />

              {lastAppointmentDate && lastAppointmentDate?.length > 0 ? (
                <p className={"label"}>
                  {t("lastVisit")} : {lastAppointmentDate}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <h2 className={"text-xl font-bold border-b  w-full my-5"}>
          Offers & Additions:
        </h2>
        <Grid md={2}>
          <ApiSelect
            name={"offers"}
            placeHolder={"Select offer ..."}
            api={(page, search) =>
              OffersService.make<OffersService>("doctor")
                .setHeaders({ filtered: true })
                .indexWithPagination(page, search)
            }
            closeOnSelect={false}
            defaultValues={defaultValues?.offers ? defaultValues?.offers : []}
            label={t("offers")}
            onSelect={async (selectedItem) => {
              if (selectedItem) {
                setOffer((prevOffers) => [...prevOffers, selectedItem]);
              }
            }}
            onClear={() => {
              setOffer([]);
            }}
            onRemoveSelected={(selectedItem) => {
              setOffer((prev) =>
                prev.filter((item) => item.id != selectedItem.value),
              );
            }}
            isMultiple={true}
            optionValue={"id"}
            getOptionLabel={(data: Offers) => TranslateClient(data.title)}
          />

          <Input
            name={"extra_fees"}
            type={"number"}
            step={"any"}
            unit={"IQD"}
            placeholder={"Extra Fees : 5"}
            label={t("extraFees")}
            setWatch={setExtra}
          />
          <Input
            name={"discount"}
            type={"number"}
            step={"any"}
            placeholder={"Discount ..."}
            label={t("discount")}
            setWatch={setDiscount}
          />
        </Grid>

        <h2 className={" w-full text-xl font-bold border-b my-5"}>
          Booking details:
        </h2>
        <Grid md={2}>
          <ApiSelect
            name={"service_id"}
            placeHolder={"Select Service name ..."}
            api={(page, search) =>
              ServiceService.make<ServiceService>("doctor")
                .setHeaders({ filtered: true })
                .indexWithPagination(page, search)
            }
            defaultValues={
              defaultValues?.service ? [defaultValues?.service] : []
            }
            label={t("serviceName")}
            onSelect={async (selectedItem) => {
              setServicePrice(selectedItem?.price);
            }}
            onClear={() => {
              setServicePrice(0);
            }}
            onRemoveSelected={() => {
              setServicePrice(0);
            }}
            optionValue={"id"}
            getOptionLabel={(data: Service) => TranslateClient(data.name)}
          />

          {type == "update" ? (
            <SelectPopOverFrom
              required={true}
              name={"status"}
              ArraySelect={statusData}
              status={status}
              label={t("status")}
              handleSelect={(select: string) => setStatus(select)}
            />
          ) : (
            ""
          )}

          {type == "store" ? (
            <Datepicker
              name={"date"}
              label={t("date")}
              required={true}
              shouldDisableDate={(day) => {
                const data = range.data;
                return HandleDatePicker(
                  data,
                  day,
                  range.range,
                  range.maxAppointment,
                );
              }}
            />
          ) : (
            ""
          )}
        </Grid>

        {type == "update" ? (
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            {t("updateDate")}
          </button>
        ) : (
          ""
        )}
        <Textarea
          name={"note"}
          label={t("note")}
          defaultValue={defaultValues?.note ?? ""}
        />
        {status == AppointmentStatusEnum.CANCELLED ? (
          <Textarea
            label={"Cancellation Reason"}
            name={"cancellation_reason"}
          />
        ) : (
          ""
        )}
        <div className="overflow-x-auto border-2 rounded-2xl">
          <table className="table">
            <thead>
              <tr>
                <th>{t("name")}</th>
                <th>{t("price")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("cost")}</td>
                <td>
                  {Number(range?.appointment_cost ?? 0).toLocaleString()} IQD
                </td>
              </tr>
              <tr>
                <td>{t("service")}</td>
                <td>{Number(getServicePrice ?? 0).toLocaleString()} IQD</td>
              </tr>
              <tr>
                <td>{t("extraFees")}</td>
                <td>{Number(getExtra).toLocaleString() ?? 0} IQD</td>
              </tr>
              <tr>
                <td>{t("discount")}</td>
                <td>{Number(getDiscount).toLocaleString() ?? 0} IQD</td>
              </tr>
              {offer.length != 0
                ? offer?.map((e: Offers, index) => (
                    <tr key={index}>
                      <td>
                        {t("offers")} [{TranslateClient(e.title)}]
                      </td>
                      <td>
                        {e?.value ?? 0} {e?.type == "fixed" ? "IQD" : "%"}
                      </td>
                    </tr>
                  ))
                : ""}
              <tr>
                <td className="text-lg">{t("totalCost")}</td>
                <td className="text-lg">
                  {Number(totalCost.toFixed(1)).toLocaleString()} IQD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Form>
    </PageCard>
  );
};

export default AppointmentForm;