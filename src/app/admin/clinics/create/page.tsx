"use client";
import React, { useState } from "react";
import PageCard from "@/components/common/ui/PageCard";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/ui/Input";
import TranslatableInput from "@/components/common/ui/TranslatableInput";
import Trash from "@/components/icons/Trash";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Grid from "@/components/common/ui/Grid";
import { ClinicService } from "@/services/ClinicService";
import { getValidationError } from "@/Http/QueryFetch";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [userImage, setUserImage] = useState<any | undefined>();

  const [phonesNum, setPhonesNum] = useState(1);

  const [response, setResponse] = useState<any>(undefined);

  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
  );

  const onSubmit: SubmitHandler<any> = async (data) => {
    data.user.image = userImage;
    const res = await ClinicService.make().store(data);
    if (res) setResponse(res);
    console.log(res);
  };

  return (
    <PageCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid md={3} lg={3}>
          <TranslatableInput
            locales={{
              en: register("user.first_name.en"),
              ar: register("user.first_name.ar"),
            }}
            type={"text"}
            placeholder={"John"}
            label={"Doctor First Name"}
            error={getValidationError("user.first_name", response)}
          />
          <TranslatableInput
            type={"text"}
            placeholder={`Mark`}
            locales={{
              en: register("user.middle_name.en"),
              ar: register("user.middle_name.ar"),
            }}
            label={"Doctor Middle Name"}
            error={getValidationError("user.middle_name", response)}
          />

          <TranslatableInput
            type={"text"}
            placeholder={`Deep`}
            locales={{
              en: register("user.last_name.en"),
              ar: register("user.last_name.ar"),
            }}
            label={"Doctor Last Name"}
            error={getValidationError("user.last_name", response)}
          />
        </Grid>

        <Grid md={2}>
          <TranslatableInput
            locales={{
              en: register("name.en"),
              ar: register("name.ar"),
            }}
            type={"text"}
            placeholder={`Clinic Name`}
            label={"Clinic Name"}
            error={getValidationError("name", response)}
          />
          <Input
            register={register("user.email")}
            type={"email"}
            placeholder={"Enter The Doctor Email"}
            label={"Doctor Email"}
            error={getValidationError("user.email", response)}
          />
          <Input
            register={register("user.password")}
            type={"password"}
            placeholder={"Password"}
            label={"Password"}
            error={getValidationError("user.password", response)}
          />
          <Input
            register={register("user.password_confirmation")}
            type={"password"}
            placeholder={"Confirm Password"}
            label={"Password Confirmation"}
          />

          <Input
            register={register("user.birth_date")}
            type={"date"}
            placeholder={"Enter Doctor Birth Date"}
            label={"Doctor BirthDate"}
            error={getValidationError("user.birth_date", response)}
          />
          <Input
            register={register("appointment_cost", { value: 5 })}
            type={"number"}
            step={"any"}
            placeholder={"Appointment Cost i.e : 5"}
            label="Appointment Cost"
            error={getValidationError("appointment_cost", response)}
          />

          <Input
            register={register("max_appointments", { value: 5 })}
            type={"number"}
            step={"any"}
            placeholder={"Doctor Max Appointments Per Day Are ?"}
            label="Max Appoiintments Per Day"
            error={getValidationError("user.max_appointments", response)}
          />
        </Grid>
        <label>Phone Numbers :</label>

        <Grid md={2}>
          {[...Array(phonesNum)].map((field, index) => {
            return (
              <div
                className={`flex justify-between items-center w-full gap-2`}
                key={index}
              >
                <Input
                  key={`a-${index}`}
                  register={register(`phone_numbers[${index}]`)}
                  type={"tel"}
                  placeholder={`Enter Your Phone Number (${index + 1})`}
                  error={getValidationError(`phone_numbers.${index}`, response)}
                />
                <button
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
          <div className={`flex gap-5`}>
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

          <div className={`flex gap-5`}>
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
        </Grid>

        <div className={`flex justify-center items-center`}>
          <div className={`w-full`}>
            <FilePond
              onupdatefiles={(fileItems) => {
                fileItems.map((file) => setUserImage(file.file));
              }}
              acceptedFileTypes={["image/*"]}
              labelIdle={"Add The Doctor Image Here"}
            />
          </div>
        </div>

        <div className={`flex justify-center items-center`}>
          <PrimaryButton type={"submit"}>Submit</PrimaryButton>
        </div>
      </form>
    </PageCard>
  );
};

export default Page;
