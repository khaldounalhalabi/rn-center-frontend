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
import Datepicker from "@/components/common/ui/Datepicker";
import Select from "@/components/common/ui/Selects/Select";
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

interface Range {
  id: number | undefined;
  appointment_cost?: number;
  range: number;
  limit: number | undefined;
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
  const [range, setRange] = useState<Range>({
    id: defaultValues?.clinic_id ?? 0,
    appointment_cost: defaultValues?.clinic?.appointment_cost ?? 0,
    range: defaultValues?.clinic?.appointment_day_range ?? 0,
    limit: defaultValues?.clinic?.approximate_appointment_time ?? 0,
    data: {
      booked_times: availableTimes?.booked_times ?? [],
      clinic_schedule: availableTimes?.clinic_schedule ?? {},
      clinic_holidays: availableTimes?.clinic_holidays ?? [],
    },
  });
  const [customer_id,setCustomer_id] = useState(0)
  const [offer, setOffer] = useState<Offers>(
    defaultValues?.offers?.[0] ?? {
      type: "",
      value: 0,
      id: 0,
      title: "",
      note: "",
      start_at: "",
      end_at: "",
      is_active: true,
        clinic_id:0
    },
  );
  const [systemOffer, setSystemOffer] = useState(
    defaultValues?.system_offers ?? [],
  );
  const [clinicId, setClinicId] = useState<number | undefined>();
  const { data } = useQuery({
    queryKey: ["getLastVisit" , customer_id,range.id],
    queryFn: async () => {
      if (range.id != 0 && customer_id ) {
        return await CustomerService.make<CustomerService>().getCustomerLastVisit(
          customer_id ?? 0,
          range.id ?? 0,
        );
      }else {
        return {data:{date:""}}
      }

    },
  });


  const lastAppointmentDate = data?.data?.date
  const handleSubmit = async (data: any) => {
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
    defaultValues?.service?.price ? defaultValues?.service?.price : 0,
  );

  const [status, setStatus] = useState("");
  const statusData = AppointmentStatuses();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitAppointmentDate = async (data: any) => {
    return await AppointmentService.make<AppointmentService>().updateDate(
      defaultValues?.id ?? 0,
      data,
    );
  };

  const [typeAppointment, setTypeAppointment] = useState<number | string>(0);

  const calculateFinalAmountInSystemOffer = (
    discounts: any,
    initialAmount: number,
  ): number => {
    let finalAmount = initialAmount;

    discounts.forEach((discount: SystemOffers) => {
      if (discount.type === "fixed") {
        finalAmount -= discount.amount;
      } else if (discount.type === "percentage") {
        finalAmount -= (discount.amount / 100) * initialAmount;
      }
    });

    return finalAmount;
  };

  const appointmentCost = calculateFinalAmountInSystemOffer(
    defaultValues?.system_offers
      ? defaultValues?.system_offers
      : systemOffer
        ? systemOffer
        : [],
    range?.appointment_cost ?? 0,
  );

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(handleTotalCost());
  }, [getServicePrice, getExtra, range, getDiscount, offer]);

  const handleTotalCost = (): number => {
    if (offer.type == "percentage") {
      const cost =
        (getServicePrice ?? 0) +
        (Number(getExtra) ?? 0) +
        (appointmentCost ?? 0) -
        (Number(getDiscount) ?? 0);
      const offerConst = (range?.appointment_cost ?? 0) * (offer.value / 100);
      return Number(cost - offerConst);
    } else if (offer.type == "fixed") {
      const cost =
        (getServicePrice ?? 0) +
        (Number(getExtra) ?? 0) +
        (appointmentCost ?? 0) -
        (Number(getDiscount) ?? 0);
      return Number(cost - offer.value);
    } else {
      const cost =
        (getServicePrice ?? 0) +
        (Number(getExtra) ?? 0) +
        (appointmentCost ?? 0) -
        (Number(getDiscount) ?? 0);
      return Number(cost);
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
                    defaultValues={defaultValues}
                  >
                    <h1 className={"card-title"}>Set Date : </h1>
                    <Datepicker
                      name={"date"}
                      label={"Date"}
                      required={true}
                      shouldDisableDate={(day) => {
                        const data = range.data;
                        return HandleDatePicker(data, day, range.range);
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
                        data: res.data,
                      });
                    });
                }}
                onRemoveSelected={() => {
                  return setRange({
                    id: 0,
                    appointment_cost: 0,
                    range: 0,
                    limit: 0,
                    data: {
                      booked_times: [],
                      clinic_schedule: {},
                      clinic_holidays: [],
                    },
                  });
                }}
                onClear={() => {
                  return setRange({
                    id: 0,
                    appointment_cost: 0,
                    range: 0,
                    limit: 0,
                    data: {
                      booked_times: [],
                      clinic_schedule: {},
                      clinic_holidays: [],
                    },
                  });
                }}
                label={"Clinic Name"}
                optionValue={"id"}
                getOptionLabel={(data: Clinic) => TranslateClient(data.name)}
              />
              <div>
                <ApiSelect
                  required={true}
                  name={"customer_id"}
                  placeHolder={"Select Customer name ..."}
                  api={(page, search) =>
                    CustomerService.make<CustomerService>().indexWithPagination(
                      page,
                      search,
                    )
                  }
                  onSelect={(selectedItem) => {
                    setCustomer_id(selectedItem?.id??0)
                  }}
                  label={"Customer Name"}
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
                {lastAppointmentDate && lastAppointmentDate?.length > 0 ? (
                  <p className={"label"}>Last Visit : {lastAppointmentDate}</p>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}

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
          {type == "store" && typeAppointment == "online" ? (
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
              onSelect={ (selectedItem) => {
                if (selectedItem){
                  setSystemOffer((prevOffers) => [...prevOffers, selectedItem]);
                }
              }}
              onClear={() => {
                setSystemOffer([]);
              }}
              onRemoveSelected={(selectedItem) => {
                setSystemOffer(prev => prev.filter(item => item.id != selectedItem.value));
              }}
              isMultiple={true}
              optionValue={"id"}
              getOptionLabel={(data: SystemOffers) => data.title}
            />
          ) : (
            ""
          )}
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
            defaultValues={defaultValues?.offers ? defaultValues?.offers : []}
            label={"Offers"}
            revalidate={`${clinicId}`}
            onSelect={async (selectedItem) => {
              setOffer({
                ...offer,
                type: selectedItem?.type ?? "",
                value: selectedItem?.value ?? 0,
              });
            }}
            onClear={() => {
              setOffer({
                ...offer,
                type: "",
                value: 0,
              });
            }}
            onRemoveSelected={() => {
              setOffer({
                ...offer,
                type: "",
                value: 0,
              });
            }}
            isMultiple={true}
            optionValue={"id"}
            getOptionLabel={(data: Offers) => TranslateClient(data.title)}
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
            false
          )}

          <Input
            name={"extra_fees"}
            type={"number"}
            step={"any"}
            unit={"IQD"}
            placeholder={"Extra Fees : 5"}
            label={"Extra Fees"}
            setWatch={setExtra}
          />
          <Select
            required={true}
            label={"Appointment Status"}
            data={statusData}
            selected={"Pending"}
            name={"status"}
            status={status}
            setStatus={setStatus}
          />

          {type == "store" ? (
            <Datepicker
              name={"date"}
              label={"Date"}
              required={true}
              shouldDisableDate={(day) => {
                const data = range.data;
                return HandleDatePicker(data, day, range.range);
              }}
            />
          ) : (
            ""
          )}
          <Input
            name={"discount"}
            type={"number"}
            step={"any"}
            placeholder={"Discount ..."}
            label={"Discount"}
            setWatch={setDiscount}
          />
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
          false
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
                <td>{range?.appointment_cost ?? 0} IQD</td>
              </tr>
              <tr>
                <td>Service</td>
                <td>{getServicePrice ?? 0} IQD</td>
              </tr>
              <tr>
                <td>Extra Fees</td>
                <td>{Number(getExtra) ?? 0} IQD</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{Number(getDiscount) ?? 0} IQD</td>
              </tr>
              <tr>
                <td>Doctor Offer</td>
                <td>
                  {offer.value ?? 0} {offer.type == "fixed" ? "IQD" : "%"}
                </td>
              </tr>
              {systemOffer.length != 0
                ? systemOffer?.map((e: SystemOffers, index) => (
                    <tr key={index}>
                      <td>System Offer [{index}]</td>
                      <td>
                        {e?.amount ?? 0} {e?.type == "fixed" ? "IQD" : "%"}
                      </td>
                    </tr>
                  ))
                : ""}
              <tr>
                <td className="text-lg">Total Cost</td>
                <td className="text-lg">{totalCost.toFixed(1)} IQD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Form>
    </>
  );
};

export default AppointmentForm;