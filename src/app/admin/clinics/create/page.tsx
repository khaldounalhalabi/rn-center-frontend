"use client";
import React, { useState } from "react";
import PageCard from "@/components/common/ui/PageCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Trash from "@/components/icons/Trash";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Grid from "@/components/common/ui/Grid";
import { ClinicService } from "@/services/ClinicService";
import { getValidationError } from "@/Http/QueryFetch";
import { HospitalService } from "@/services/HospitalService";
import { SpecialityService } from "@/services/SpecialityService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import ReactSelect from "@/components/common/ui/Selects/ReactSelect";
import SelectCity from "@/components/common/ui/Selects/SelectCity";

const Page = () => {
  const {
    register,
    formState: { errors },
  } = useForm<any>();

  const [phonesNum, setPhonesNum] = useState(1);

  const [response, setResponse] = useState<any>(undefined);

  const methods = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await ClinicService.make().store(data);
    if (res) setResponse(res);
  };

  return (
    <PageCard>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid md={3} gap={2}>
            <TranslatableInput
              locales={["en", "ar"]}
              type={"text"}
              placeholder={"John"}
              label={"Doctor First Name"}
              name={"user.first_name"}
              error={getValidationError("user.first_name", response)}
            />
            <TranslatableInput
              type={"text"}
              placeholder={`Mark`}
              locales={["en", "ar"]}
              label={"Doctor Middle Name"}
              error={getValidationError("user.middle_name", response)}
              name={"user.middle_name"}
            />

            <TranslatableInput
              type={"text"}
              placeholder={`Deep`}
              locales={["en", "ar"]}
              label={"Doctor Last Name"}
              name={"user.last_name"}
              error={getValidationError("user.last_name", response)}
            />
          </Grid>

          <Grid md={2}>
            <TranslatableInput
              locales={["en", "ar"]}
              type={"text"}
              placeholder={`Clinic Name`}
              label={"Clinic Name"}
              name={"name"}
              error={getValidationError("name", response)}
            />
            <Input
              name={"user.email"}
              type={"email"}
              placeholder={"Enter The Doctor Email"}
              label={"Doctor Email"}
              error={getValidationError("user.email", response)}
            />
            <Input
              name={"user.password"}
              type={"password"}
              placeholder={"Password"}
              label={"Password"}
              error={getValidationError("user.password", response)}
            />
            <Input
              name={"user.password_confirmation"}
              type={"password"}
              placeholder={"Confirm Password"}
              label={"Password Confirmation"}
            />

            <Input
              name={"user.birth_date"}
              type={"date"}
              placeholder={"Enter Doctor Birth Date"}
              label={"Doctor BirthDate"}
              error={getValidationError("user.birth_date", response)}
            />
            <Input
              name={"appointment_cost"}
              type={"number"}
              step={"any"}
              placeholder={"Appointment Cost i.e : 5"}
              label="Appointment Cost"
              error={getValidationError("appointment_cost", response)}
            />

            <Input
              name={"max_appointments"}
              type={"number"}
              step={"any"}
              placeholder={"Doctor Max Appointments Per Day Are ?"}
              label="Max Appoiintments Per Day"
              error={getValidationError("user.max_appointments", response)}
            />
          </Grid>
          <label>Phone Numbers :</label>

          <Grid md={2} gap={2}>
            {[...Array(phonesNum)].map((field, index) => {
              return (
                <div
                  className={`flex justify-between items-center w-full gap-2`}
                  key={index}
                >
                  <Input
                    key={`a-${index}`}
                    name={`phone_numbers[${index}]`}
                    type={"tel"}
                    placeholder={`Enter Your Phone Number (${index + 1})`}
                    error={getValidationError(
                      `phone_numbers.${index}`,
                      response,
                    )}
                  />
                  <button
                    type={"button"}
                    className={"btn btn-square btn-sm"}
                    onClick={() =>
                      setPhonesNum((prevState) =>
                        prevState == 1 ? prevState : prevState - 1,
                      )
                    }
                  >
                    <Trash className={"h-6 w-6 text-error"} />
                  </button>
                </div>
              );
            })}
          </Grid>

          <div className={`flex items-center m-3`}>
            <button
              className={`btn btn-sm btn-neutral`}
              onClick={() => setPhonesNum((prevState) => prevState + 1)}
            >
              Add New Phone
            </button>
          </div>

          <Grid md={2} gap={10} className={`w-full my-5`}>
            <div className={`flex gap-5 p-2`}>
              <label>Active</label>
              <input
                type="radio"
                className="radio radio-info"
                value={"active"}
                {...register("status", { value: true })}
              />
              <label>In-Active</label>
              <input
                type="radio"
                className="radio radio-info"
                value={"in-active"}
                {...register("status", { value: false })}
              />
            </div>

            <div className={`flex gap-5 p-2`}>
              <label>Male</label>
              <input
                type="radio"
                className="radio radio-info"
                value={"male"}
                {...register("user.gender", { value: true })}
              />
              <label>Female</label>
              <input
                type="radio"
                className="radio radio-info"
                value={"female"}
                {...register("user.gender", { value: false })}
                multiple={true}
              />
            </div>
            <div className={"my-3 flex flex-col gap-2"}>
              <label>Hospital</label>
              <ReactSelect
                api={async (page) =>
                  await HospitalService.make().indexWithPagination(page)
                }
                label={"name"}
                value={"id"}
                name={"hospitals"}
              />
            </div>

            <div className={"my-3 flex flex-col gap-2"}>
              <label>Specialities</label>
              <ReactSelect
                api={async (page) =>
                  await SpecialityService.make().indexWithPagination(page)
                }
                isMultiple={true}
                label={"name"}
                value={"id"}
                name={"specialities"}
              />
            </div>

            <div className={"flex flex-col gap-2"}>
              <label>City</label>
              <SelectCity name={"address.city"} />
            </div>
            <TranslatableInput
              name={"address.name"}
              type={"text"}
              label={"Clinic Address"}
              error={getValidationError("address.name", response)}
            />
          </Grid>

          <ImageUploader name={"user.image"} />

          <div className={`flex justify-center items-center`}>
            <PrimaryButton type={"submit"}>Submit</PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </PageCard>
  );
};

export default Page;
