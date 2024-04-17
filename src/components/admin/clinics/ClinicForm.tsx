"use client";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Input from "@/components/common/ui/Inputs/Input";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { HospitalService } from "@/services/HospitalService";
import { SpecialityService } from "@/services/SpecialityService";
import { CityService } from "@/services/CityService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { ClinicService } from "@/services/ClinicService";
import Form from "@/components/common/ui/Form";
import { AddOrUpdateClinicForm, Clinic } from "@/Models/Clinic";
import { navigate } from "@/Actions/navigate";
import { ApiResponse } from "@/Http/Response";
import { Hospital } from "@/Models/Hospital";
import { Speciality } from "@/Models/Speciality";
import { City } from "@/Models/City";
import { translate } from "@/Helpers/Translations";

const ClinicForm = ({
  type = "store",
  defaultValues = undefined,
  id = undefined,
}: {
  type: "store" | "update";
  defaultValues?: AddOrUpdateClinicForm | undefined | null;
  id?: number | undefined;
}) => {
  let onSubmit = async (data: AddOrUpdateClinicForm) => {
    return await ClinicService.make().store(data);
  };

  if (type == "update" && id) {
    onSubmit = async (data: any) => {
      console.log(data);

      return await ClinicService.make().update(id, data);
    };
  }
  return (
    <Form
      handleSubmit={onSubmit}
      defaultValues={defaultValues}
      onSuccess={(res: ApiResponse<Clinic>) =>
        navigate(`/admin/clinics/${res?.data?.id}`)
      }
    >
      <Grid md={3}>
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
      </Grid>

      <Grid>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={`Clinic Name`}
          label={"Clinic Name"}
          name={"name"}
        />
        <Input
          name={"user.email"}
          type={"text"}
          placeholder={"Enter The Doctor Email"}
          label={"Doctor Email"}
        />
        <Input
          name={"user.password"}
          type={"text"}
          placeholder={"Password"}
          label={"Password"}
        />
        <Input
          name={"user.password_confirmation"}
          type={"text"}
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
      </Grid>

      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Clinic Phone Number"}
        label={"Clinic Phones"}
        defaultValue={defaultValues?.phone_numbers ?? []}
      />

      <Grid>
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Status:</label>
          <Input
            name={"status"}
            label={"Active"}
            type="radio"
            className="radio radio-info"
            value={"active"}
            defaultChecked={
              defaultValues ? defaultValues?.status == "active" : true
            }
          />
          <Input
            name={"status"}
            label={"In-Active"}
            type="radio"
            className="radio radio-info"
            value={"in-active"}
            defaultChecked={defaultValues?.status == "in-active"}
          />
        </div>

        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Gender:</label>
          <Input
            name={"user.gender"}
            label={"Male"}
            type="radio"
            className="radio radio-info"
            value={"male"}
            defaultChecked={
              defaultValues?.user?.gender
                ? defaultValues?.user?.gender == "male"
                : true
            }
          />

          <Input
            name={"user.gender"}
            label={"Female"}
            type="radio"
            className="radio radio-info"
            value={"female"}
            defaultChecked={defaultValues?.user?.gender == "female"}
          />
        </div>
        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<Hospital[]>> =>
            await HospitalService.make().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50
            )
          }
          getLabel={(option: Hospital) => translate(option.name)}
          value="id"
          name={"hospital_id"}
          inputLabel={"Hospital"}
          selected={[defaultValues?.hospital_id]}
        />

        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<Speciality[]>> =>
            await SpecialityService.make().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50
            )
          }
          isMultiple={true}
          getLabel={(option: Speciality) => translate(option.name)}
          value={"id"}
          name={"speciality_ids"}
          inputLabel={"Specialities"}
          selected={
            defaultValues?.speciality_ids ? defaultValues?.speciality_ids : []
          }
        />

        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<City[]>> =>
            await CityService.make().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50
            )
          }
          getLabel={(option: City) => translate(option.name)}
          value={"id"}
          name={"address.city_id"}
          inputLabel={"City"}
          selected={[defaultValues?.address?.city_id]}
        />

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
      </Grid>

      <ImageUploader name={"user.image"} />

      <div className={`flex justify-center items-center`}>
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default ClinicForm;
