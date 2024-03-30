"use client";
import React, { useState } from "react";
import PageCard from "@/components/common/ui/PageCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/ui/Inputs/Input";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Trash from "@/components/icons/Trash";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { ClinicService } from "@/services/ClinicService";
import { HospitalService } from "@/services/HospitalService";
import { SpecialityService } from "@/services/SpecialityService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import ReactSelect from "@/components/common/ui/Selects/ReactSelect";
import { CityService } from "@/services/CityService";

const Page = () => {
  const [phonesNum, setPhonesNum] = useState(1);

  const methods = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    ClinicService.make()
      .store(data)
      .then((res) => res.fillValidationErrors(methods));
  };

  return (
    <PageCard>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-2"}>
            <TranslatableInput
              locales={["en", "ar"]}
              type={"text"}
              placeholder={"John"}
              label={"Doctor First Name"}
              name={"user.first_name"}
            />
            <TranslatableInput
              type={"text"}
              placeholder={`Mark`}
              locales={["en", "ar"]}
              label={"Doctor Middle Name"}
              name={"user.middle_name"}
            />

            <TranslatableInput
              type={"text"}
              placeholder={`Deep`}
              locales={["en", "ar"]}
              label={"Doctor Last Name"}
              name={"user.last_name"}
            />
          </div>

          <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
            <TranslatableInput
              locales={["en", "ar"]}
              type={"text"}
              placeholder={`Clinic Name`}
              label={"Clinic Name"}
              name={"name"}
            />
            <Input
              name={"user.email"}
              type={"email"}
              placeholder={"Enter The Doctor Email"}
              label={"Doctor Email"}
            />
            <Input
              name={"user.password"}
              type={"password"}
              placeholder={"Password"}
              label={"Password"}
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
              defaultValue={"1970-12-31"}
            />
            <Input
              name={"appointment_cost"}
              type={"number"}
              step={"any"}
              placeholder={"Appointment Cost i.e : 5"}
              label="Appointment Cost"
            />

            <Input
              name={"max_appointments"}
              type={"number"}
              step={"any"}
              placeholder={"Doctor Max Appointments Per Day Are ?"}
              label="Max Appoiintments Per Day"
            />
          </div>
          <label>Phone Numbers :</label>

          <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
            {[...Array(phonesNum)].map((_field, index) => {
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
          </div>

          <div className={`flex items-center m-3`}>
            <button
              className={`btn btn-sm btn-neutral`}
              onClick={() => setPhonesNum((prevState) => prevState + 1)}
            >
              Add New Phone
            </button>
          </div>

          <div className={`w-full my-5 grid grid-cols-1 md:grid-cols-2 gap-2`}>
            <div className={`flex gap-5 p-2 items-center`}>
              <label className={`bg-pom p-2 rounded-md text-white`}>
                Status:
              </label>
              <Input
                name={"status"}
                label={"Active"}
                type="radio"
                className="radio radio-info"
                value={"active"}
                defaultChecked={true}
              />
              <Input
                name={"status"}
                label={"In-Active"}
                type="radio"
                className="radio radio-info"
                value={"in-active"}
              />
            </div>

            <div className={`flex gap-5 p-2 items-center`}>
              <label className={`bg-pom p-2 rounded-md text-white`}>
                Gender:
              </label>
              <Input
                name={"user.gender"}
                label={"Male"}
                type="radio"
                className="radio radio-info"
                value={"male"}
                defaultChecked={true}
              />

              <Input
                name={"user.gender"}
                label={"Female"}
                type="radio"
                className="radio radio-info"
                value={"female"}
                multiple={true}
              />
            </div>
            <div className={"my-3 flex flex-col gap-2"}>
              <label>Hospital</label>
              <ReactSelect
                api={async (page, search) =>
                  await HospitalService.make().indexWithPagination(page, search)
                }
                label={"name"}
                value={"id"}
                name={"hospitals"}
              />
            </div>

            <div className={"my-3 flex flex-col gap-2"}>
              <label>Specialities</label>
              <ReactSelect
                api={async (page, search) =>
                  await SpecialityService.make().indexWithPagination(
                    page,
                    search,
                  )
                }
                isMultiple={true}
                label={"name"}
                value={"id"}
                name={"speciality_ids"}
              />
            </div>

            <div className={"flex flex-col gap-2"}>
              <label>City</label>
              <ReactSelect
                api={async (page, search) =>
                  await CityService.make().indexWithPagination(page, search)
                }
                label={"name"}
                value={"id"}
                name={"address.city_id"}
              />
            </div>
            <TranslatableInput
              name={"address.name"}
              type={"text"}
              label={"Clinic Address"}
            />

            <Input
              name={"address.lat"}
              type={"number"}
              step={"any"}
              label={"Latitude"}
            />

            <Input
              name={"address.lng"}
              type={"number"}
              step={"any"}
              label={"Longitude"}
            />
          </div>

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
