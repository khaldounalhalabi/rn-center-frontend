"use client";
import Form from "@/components/common/ui/Form";
import React, { Fragment, useEffect, useState } from "react";
import Grid from "@/components/common/ui/Grid";
import { Appointment } from "@/Models/Appointment";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
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
import { AvailableTime } from "@/Models/AvailableTime";
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import { useQuery } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { SystemOffersService } from "@/services/SystemOffersService";
import { SystemOffers } from "@/Models/SystemOffer";
import { OffersService } from "@/services/OffersService";
import { Offers } from "@/Models/Offers";
import HandleCalcOffers from "@/hooks/HandleCalcOffers";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";

interface Range {
  id: number | undefined;
  appointment_cost?: number;
  range: number;
  limit: number | undefined;
  maxAppointment: number;
  data: AvailableTime;
}

const AppointmentForm = ({
  defaultValues = undefined,
  id,
  type = "store",
  availableTimes = undefined,
}: {
  defaultValues?: Appointment;
  id?: number;
  type?: "store" | "update";
  availableTimes?: AvailableTime;
}) => {
  const [date, setDate] = useState(defaultValues ?? {});
  const [range, setRange] = useState<Range>({
    id: defaultValues?.clinic_id ?? 0,
    appointment_cost: defaultValues?.clinic?.appointment_cost ?? 0,
    range: defaultValues?.clinic?.appointment_day_range ?? 0,
    limit: defaultValues?.clinic?.approximate_appointment_time ?? 0,
    maxAppointment: defaultValues?.clinic?.max_appointments ?? 0,
    data: {
      booked_times: availableTimes?.booked_times ?? [],
      clinic_schedule: availableTimes?.clinic_schedule ?? {},
      clinic_holidays: availableTimes?.clinic_holidays ?? [],
    },
  });
  const [customer_id, setCustomerId] = useState(0);

  const [systemOffer, setSystemOffer] = useState(
    defaultValues?.system_offers ?? [],
  );
  const [offer, setOffer] = useState(defaultValues?.offers ?? []);
  const [clinicId, setClinicId] = useState<number | undefined>(
    defaultValues?.clinic_id,
  );
  const { data } = useQuery({
    queryKey: ["getLastVisit", customer_id, range.id],
    queryFn: async () => {
      if (range.id != 0 && customer_id) {
        return await CustomerService.make<CustomerService>().getCustomerLastVisit(
          customer_id ?? 0,
          range.id ?? 0,
        );
      } else {
        return { data: { date: "" } };
      }
    },
  });
  console.log(range);
  const lastAppointmentDate = data?.data?.date;
  const handleSubmit = async (data: any) => {
    console.log(data);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return AppointmentService.make<AppointmentService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);

          if (res.code == 425) {
            swal.fire("The time you selected is unavailable!");
            return res;
          } else return res;
        });
    } else {
      return await AppointmentService.make<AppointmentService>("admin")
        .store(data)
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
    Navigate(`/admin/appointment`);
  };
  const [getExtra, setExtra] = useState(0);
  const [getDiscount, setDiscount] = useState(0);

  const [getServicePrice, setServicePrice] = useState<number | undefined>(
    defaultValues?.service?.price,
  );

  const [status, setStatus] = useState(defaultValues?.status);
  const statusData = AppointmentStatuses();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitAppointmentDate = async (data: any) => {
    return await AppointmentService.make<AppointmentService>()
      .updateDate(defaultValues?.id ?? 0, data)
      .then((res) => {
        setDate({
          ...defaultValues,
          date: res?.data?.date,
        });
        return res;
      });
  };

  const [typeAppointment, setTypeAppointment] = useState<number | string>(0);

  const appointmentCostSystem = HandleCalcOffers(
    defaultValues?.system_offers
      ? defaultValues?.system_offers
      : systemOffer
        ? systemOffer
        : [],
    range?.appointment_cost ?? 0,
    "system",
  );
  const appointmentCostOffer = HandleCalcOffers(
    defaultValues?.offers ? defaultValues?.offers : offer ? offer : [],
    appointmentCostSystem ?? 0,
    "offer",
  );
  const appointmentCostOfferOnly = HandleCalcOffers(
    defaultValues?.offers ? defaultValues?.offers : offer ? offer : [],
    range?.appointment_cost ?? 0,
    "offer",
  );

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(handleTotalCost());
  }, [getServicePrice, getExtra, range, getDiscount, offer]);

  const handleTotalCost = (): number => {
    if (
      (systemOffer && offer) ||
      (defaultValues?.system_offers && defaultValues?.offers)
    ) {
      return (
        appointmentCostOffer +
        Number(getServicePrice ?? 0) +
        Number(getExtra ?? 0) -
        Number(getDiscount ?? 0)
      );
    } else if (systemOffer || defaultValues?.system_offers) {
      return (
        appointmentCostSystem +
        Number(getServicePrice ?? 0) +
        Number(getExtra ?? 0) -
        Number(getDiscount ?? 0)
      );
    } else if (offer || defaultValues?.offers) {
      return (
        appointmentCostOfferOnly +
        Number(getServicePrice ?? 0) +
        Number(getExtra ?? 0) -
        Number(getDiscount ?? 0)
      );
    } else {
      return (
        Number(range?.appointment_cost ?? 0) +
        Number(getServicePrice ?? 0) +
        Number(getExtra ?? 0) -
        Number(getDiscount ?? 0)
      );
    }
  };

  return (
    <>
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
                    <h1 className={"card-title"}>Set Date : </h1>
                    <Datepicker
                      name={"date"}
                      label={"Date"}
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
        <Grid md={"2"}>
          {type === "store" ? (
            <>
              <div className={"col-span-2"}>
                <h2 className={"font-bold text-xl border-b w-full my-5"}>
                  Clinic Details :{" "}
                </h2>
                <div className={"w-full md:w-1/2"}>
                  <ApiSelect
                    required={true}
                    placeHolder={"Select Clinic name ..."}
                    name={"clinic_id"}
                    api={(page, search) =>
                      ClinicsService.make<ClinicsService>()
                        .setHeaders({ filtered: true })
                        .indexWithPagination(page, search)
                    }
                    onSelect={async (selectedItem) => {
                      setClinicId(selectedItem?.id ?? 0);
                      setRange((prevState) => ({
                        ...prevState,
                        appointment_cost: selectedItem?.appointment_cost,
                      }));
                      return await AppointmentService.make<AppointmentService>(
                        "admin",
                      )
                        .getAvailableTimes(selectedItem?.id ?? 0)
                        .then((res) => {
                          return setRange({
                            id: selectedItem?.id,
                            appointment_cost: selectedItem?.appointment_cost,
                            range: selectedItem?.appointment_day_range ?? 0,
                            limit: selectedItem?.approximate_appointment_time,
                            maxAppointment: selectedItem?.max_appointments ?? 0,
                            data: res.data,
                          });
                        });
                    }}
                    onRemoveSelected={() => {
                      setOffer([]);
                      setSystemOffer([]);
                      setServicePrice(0);
                      setCustomerId(0);
                      return setRange({
                        id: 0,
                        appointment_cost: 0,
                        range: 0,
                        limit: 0,
                        maxAppointment: 0,
                        data: {
                          booked_times: [],
                          clinic_schedule: {},
                          clinic_holidays: [],
                        },
                      });
                    }}
                    onClear={() => {
                      setOffer([]);
                      setSystemOffer([]);
                      setServicePrice(0);
                      setCustomerId(0);
                      return setRange({
                        id: 0,
                        appointment_cost: 0,
                        range: 0,
                        limit: 0,
                        maxAppointment: 0,
                        data: {
                          booked_times: [],
                          clinic_schedule: {},
                          clinic_holidays: [],
                        },
                      });
                    }}
                    label={"Clinic Name"}
                    optionValue={"id"}
                    getOptionLabel={(data: Clinic) =>
                      TranslateClient(data.name)
                    }
                  />
                </div>
              </div>
              <div className={"col-span-2"}>
                <h2 className={"font-bold text-xl border-b w-full my-5"}>
                  Patient Details:{" "}
                </h2>
                <div className={"w-full md:w-1/2"}>
                  <ApiSelect
                    required={true}
                    name={"customer_id"}
                    placeHolder={"Select Patient name ..."}
                    api={(page, search) =>
                      CustomerService.make<CustomerService>().getClinicCustomer(
                        clinicId,
                        page,
                        search,
                      )
                    }
                    revalidate={`${clinicId}`}
                    onSelect={(selectedItem) => {
                      setCustomerId(selectedItem?.id ?? 0);
                    }}
                    onRemoveSelected={() => {
                      setCustomerId(0);
                    }}
                    onClear={() => {
                      setCustomerId(0);
                    }}
                    label={"Patient Name"}
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
                  />
                  {lastAppointmentDate &&
                  lastAppointmentDate?.length > 0 &&
                  customer_id != 0 ? (
                    <p className={"label"}>
                      Last Visit : {lastAppointmentDate}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className={"col-span-2"}>
            <h2 className={"text-xl font-bold w-full border-b my-5"}>
              Offers & Additions:
            </h2>
            <div
              className={"flex items-center justify-between w-full flex-wrap"}
            >
              {type == "store" && typeAppointment == "online" ? (
                <div className={"w-full md:w-[49%]"}>
                  <ApiSelect
                    name={"system_offers"}
                    placeHolder={"Select system offer ..."}
                    api={(page, search) =>
                      SystemOffersService.make<SystemOffersService>().getSystemOffersByClinic(
                        clinicId,
                        page,
                        search,
                      )
                    }
                    closeOnSelect={false}
                    label={"System Offers"}
                    revalidate={`${clinicId}`}
                    onSelect={(selectedItem) => {
                      if (selectedItem) {
                        setSystemOffer((prevOffers) => [
                          ...prevOffers,
                          selectedItem,
                        ]);
                      }
                    }}
                    onClear={() => {
                      setSystemOffer([]);
                    }}
                    onRemoveSelected={(selectedItem) => {
                      setSystemOffer((prev) =>
                        prev.filter((item) => item.id != selectedItem.value),
                      );
                    }}
                    isMultiple={true}
                    optionValue={"id"}
                    getOptionLabel={(data: SystemOffers) => data.title}
                  />
                </div>
              ) : (
                ""
              )}
              <div className={"w-full md:w-[49%]"}>
                <ApiSelect
                  name={"offers"}
                  placeHolder={"Select offer ..."}
                  api={(page, search) =>
                    OffersService.make<OffersService>().getOffersByClinic(
                      clinicId,
                      page,
                      search,
                    )
                  }
                  closeOnSelect={false}
                  defaultValues={
                    defaultValues?.offers ? defaultValues?.offers : []
                  }
                  label={"Offers"}
                  revalidate={`${clinicId}`}
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
              </div>
              <div className={"w-full md:w-[49%]"}>
                <Input
                  name={"extra_fees"}
                  type={"number"}
                  step={"any"}
                  unit={"IQD"}
                  placeholder={"Extra Fees : 5"}
                  label={"Extra Fees"}
                  setWatch={setExtra}
                />
              </div>
              <div className={"w-full md:w-[49%]"}>
                <Input
                  name={"discount"}
                  type={"number"}
                  step={"any"}
                  placeholder={"Discount ..."}
                  label={"Discount"}
                  setWatch={setDiscount}
                />
              </div>
            </div>
          </div>

          <h1 className={"col-span-2 w-full text-xl font-bold border-b my-5"}>
            Booking details
          </h1>
          <ApiSelect
            name={"service_id"}
            placeHolder={"Select Service name ..."}
            api={(page, search) =>
              ServiceService.make<ServiceService>().getClinicService(
                clinicId,
                page,
                search,
              )
            }
            defaultValues={
              defaultValues?.service ? [defaultValues?.service] : []
            }
            label={"Service Name"}
            revalidate={`${clinicId}`}
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
          {type != "update" ? (
            <div className={`flex gap-5 p-2 items-end`}>
              <label className={`bg-pom p-2 rounded-md text-white`}>
                Type:
              </label>
              <Input
                onClick={() => setSystemOffer([])}
                name={"type"}
                label={"manual"}
                type="radio"
                className="radio radio-info"
                value={"manual"}
                defaultChecked={
                  defaultValues ? defaultValues?.status == "manual" : true
                }
                setWatch={setTypeAppointment}
              />
              <Input
                name={"type"}
                label={"online"}
                type="radio"
                className="radio radio-info"
                value={"online"}
                defaultChecked={defaultValues?.status == "online"}
                setWatch={setTypeAppointment}
              />
            </div>
          ) : (
            ""
          )}
          <SelectPopOverFrom
            required={true}
            name={"status"}
            ArraySelect={statusData}
            status={status}
            label={"Status"}
            handleSelect={(select: string) => setStatus(select)}
          />

          {type == "store" ? (
            <Datepicker
              name={"date"}
              label={"Date"}
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
            Update Date
          </button>
        ) : (
          ""
        )}
        <Textarea
          name={"note"}
          label={"Notes"}
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
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clinic Appointment Cost</td>
                <td>
                  {Number(range?.appointment_cost ?? 0).toLocaleString()} IQD
                </td>
              </tr>
              <tr>
                <td>Service</td>
                <td>{Number(getServicePrice ?? 0).toLocaleString()} IQD</td>
              </tr>
              <tr>
                <td>Extra Fees</td>
                <td>{Number(getExtra).toLocaleString()} IQD</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{Number(getDiscount ?? 0).toLocaleString()} IQD</td>
              </tr>
              {offer.length != 0
                ? offer?.map((e: Offers, index) => (
                    <tr key={index}>
                      <td>Offer [{TranslateClient(e.title)}]</td>
                      <td>
                        {e?.value ?? 0} {e?.type == "fixed" ? "IQD" : "%"}
                      </td>
                    </tr>
                  ))
                : ""}
              {systemOffer.length != 0
                ? systemOffer?.map((e: SystemOffers, index) => (
                    <tr key={index}>
                      <td>System Offer [{TranslateClient(e.title)}]</td>
                      <td>
                        {e?.amount ?? 0} {e?.type == "fixed" ? "IQD" : "%"}
                      </td>
                    </tr>
                  ))
                : ""}
              <tr>
                <td className="text-lg">Total Cost</td>
                <td className="text-lg">
                  {Number(totalCost.toFixed(1)).toLocaleString()} IQD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Form>
    </>
  );
};

export default AppointmentForm;

const appointmentDate = {
  "2024-08-05 00:00:00": 4,
  "2024-08-06 00:00:00": 3,
  "2024-08-07 00:00:00": 1,
  "2024-08-08 00:00:00": 10,
  "2024-08-09 00:00:00": 5,
  "2024-08-10 00:00:00": 4,
  "2024-08-11 00:00:00": 10,
};
