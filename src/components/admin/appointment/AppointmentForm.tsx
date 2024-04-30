"use client";
import Form from "@/components/common/ui/Form";
import React, {useState} from "react";
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
import { Navigate } from "@/Actions/navigate";
import {CustomerService} from "@/services/CustomerService";
import {Customer} from "@/Models/Customer";
import Swal from "sweetalert2";

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
      return AppointmentService.make<AppointmentService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          if(res.code == 425){
            Swal.fire("The time you selected is already booked!");
            return res
          }else return res
        });
    } else {
      return await AppointmentService.make<AppointmentService>("admin").store(data)
          .then(res=>{
            if(res.code == 425){
              Swal.fire("The time you selected is already booked!");
              return res
            }else return res
      })
    }
  };
  const onSuccess = () => {
    // Navigate(`/admin/appointment`);
  };
  const [status,setStatus] = useState('')
  const statusData = ["checkin", "blocked", "cancelled", "pending"];
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
              search,
            )
          }
          label={"Clinic Name"}
          optionValue={"id"}
          getOptionLabel={(data: Clinic) => translate(data.name)}
        />
        <ApiSelect
          name={"customer_id"}
          api={(page, search) =>
            CustomerService.make<CustomerService>().indexWithPagination(
              page,
              search,
            )
          }
          label={"Clinic Name"}
          optionValue={"id"}
          getOptionLabel={(data: Customer) => {
            return (
              <>
                <p>{translate(data.user.first_name)}</p>
                <p>{translate(data.user.middle_name)}</p>
                <p>{translate(data.user.last_name)}</p>
              </>
            );
          }}
        />

        <ApiSelect
          name={"service_id"}
          api={(page, search) =>
            ServiceService.make<ServiceService>().indexWithPagination(
              page,
              search,
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
          status={status}
          setStatus={setStatus}
        />
        <Datepicker name={"date"} label={"Date"} />

        <Timepicker label="From" name={"from"} />
        <Timepicker label="To" name={"to"} />
      </Grid>
      <Textarea name={"note"} defaultValue={defaultValues?.note ?? ""} />
      {status == "cancelled" ? (
        <Textarea label={"Reason"} name={"cancellation_reason"} />
      ) : (
        false
      )}
    </Form>
  );
};

export default AppointmentForm;
