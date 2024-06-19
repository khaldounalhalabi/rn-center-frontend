"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
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
  const [clinicId, setClinicId] = useState<number | undefined>();
  const { data } = useQuery({
    queryKey: ["getRange"],
    queryFn: async () => {
      if (type == "update") {
        return await AppointmentService.make<AppointmentService>("admin")
          .getAvailableTimes(defaultValues?.clinic?.id ?? 0)
          .then((res) => {
            setRange({
              id: defaultValues?.clinic?.id,
              appointment_cost: defaultValues?.clinic?.appointment_cost ?? 0,
              range: defaultValues?.clinic?.appointment_day_range ?? 0,
              limit: defaultValues?.clinic?.approximate_appointment_time,
              data: res.data,
            });
            return res;
          });
      } else return false;
    },
  });
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return AppointmentService.make<AppointmentService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          if (res.code == 425) {
            swal.fire("The time you selected is unavailable!");
            return res;
          } else return res;
        });
    } else {
      return await AppointmentService.make<AppointmentService>("admin")
        .store(data)
        .then((res) => {
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
  const [getServicePrice, setServicePrice] = useState<number | undefined>(
    defaultValues?.service?.price ? defaultValues?.service?.price : 0,
  );

  const [status, setStatus] = useState("");
  const statusData = AppointmentStatuses();
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        {type != "update" ? (
          <>
            <ApiSelect
              required={true}
              placeHolder={"Select Clinic name ..."}
              name={"clinic_id"}
              api={(page, search) =>
                ClinicsService.make<ClinicsService>().indexWithPagination(
                  page,
                  search,
                )
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
          defaultValues={defaultValues?.service ? [defaultValues?.service] : []}
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
            <label className={`bg-pom p-2 rounded-md text-white`}>Type:</label>
            <Input
              name={"type"}
              label={"manual"}
              type="radio"
              className="radio radio-info"
              value={"manual"}
              defaultChecked={
                defaultValues ? defaultValues?.status == "manual" : true
              }
            />
            <Input
              name={"type"}
              label={"online"}
              type="radio"
              className="radio radio-info"
              value={"online"}
              defaultChecked={defaultValues?.status == "online"}
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
        <Datepicker
          name={"date"}
          label={"Date"}
          required={true}
          shouldDisableDate={(day) => {
            const data = range.data;
            return HandleDatePicker(data, day, range.range);
          }}
        />
      </Grid>
      <Textarea
        name={"note"}
        label={"Notes"}
        defaultValue={defaultValues?.note ?? ""}
      />
      {status == AppointmentStatusEnum.CANCELLED ? (
        <Textarea label={"Cancellation Reason"} name={"cancellation_reason"} />
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
              <td className={`${getServicePrice ? "line-through" : ""}`}>
                {range?.appointment_cost ?? 0} IQD
              </td>
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
              <td className="text-lg">Total Cost</td>
              <td className="text-lg">
                {getServicePrice
                  ? getServicePrice + (Number(getExtra) ?? 0)
                  : (range?.appointment_cost ?? 0) +
                    (Number(getExtra) ?? 0)}{" "}
                IQD
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Form>
  );
};

export default AppointmentForm;
