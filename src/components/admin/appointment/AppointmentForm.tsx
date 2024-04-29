"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { Appointment } from "@/Models/Appointment";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { translate } from "@/Helpers/Translations";
import { ClinicService } from "@/services/ClinicService";
import { Clinic } from "@/Models/Clinic";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Datepicker";
import Timepicker from "@/components/common/ui/TimePicker";
import Select from "@/components/common/ui/Selects/Select";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { AppointmentService } from "@/services/AppointmentService";
import { navigate } from "@/Actions/navigate";

const AppointmentForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Appointment;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      console.log(data);
      return AppointmentService.make<AppointmentService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await AppointmentService.make<AppointmentService>("admin").store(
        data
      );
    }
  };
  const onSuccess = () => {
    navigate(`/admin/appointment`);
  };
  const statusData = ["Checkin", "Blocked", "Cancelled", "Pending"];
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <ApiSelect
          name={"clinic_id"}
          api={(page, search) =>
            ClinicService.make<ClinicService>().indexWithPagination(
              page,
              search
            )
          }
          label={"Clinic Name"}
          optionValue={"id"}
          getOptionLabel={(data: Clinic) => translate(data.name)}
        />
        {/*//TODO::add the customer_id select*/}
        <div></div>

        <ApiSelect
          name={"service_id"}
          api={(page, search) =>
            ServiceService.make<ServiceService>().indexWithPagination(
              page,
              search
            )
          }
          label={"Service Name"}
          optionValue={"id"}
          getOptionLabel={(data: Service) => translate(data.name)}
        />
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Status:</label>
          <Input
            name={"type"}
            label={"manual"}
            type="radio"
            className="radio radio-info"
            value={"Manual"}
            defaultChecked={
              defaultValues ? defaultValues?.status == "manual" : true
            }
          />
          <Input
            name={"type"}
            label={"online"}
            type="radio"
            className="radio radio-info"
            value={"Online"}
            defaultChecked={defaultValues?.status == "online"}
          />
        </div>
      </Grid>
      <Grid md={"2"}>
        <Input
          name={"extra_fees"}
          type={"number"}
          step={"any"}
          placeholder={"Extra Fees : 5"}
          label={"Extra"}
        />
        <Input
          name={"total_cost"}
          type={"number"}
          step={"any"}
          placeholder={"Total Cost : 5"}
          label={"Cost"}
        />

        <Select
          label={"Appointment Status"}
          data={statusData}
          selected={"Pending"}
          name={"status"}
        />
        <Datepicker name={"date"} label={"Date"} />

        <Timepicker label="From" name={"from"} />
        <Timepicker label="To" name={"to"} />
      </Grid>
      <Textarea name={"note"} defaultValue={defaultValues?.note ?? ""} />
    </Form>
  );
};

export default AppointmentForm;
