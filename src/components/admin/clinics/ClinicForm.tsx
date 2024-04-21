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
import { useTranslations } from "next-intl";
import Gallery from "@/components/common/ui/Gallery";
import ImagePreview from "@/components/common/ui/ImagePreview";

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
    return await ClinicService.make<ClinicService>().store(data);
  };

  if (type == "update" && id) {
    onSubmit = async (data: any) => {
      return await ClinicService.make<ClinicService>().update(id, data);
    };
  }
  const t = useTranslations("clinic.create-edit");

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
          label={t("first-Name")}
          name={"user.first_name"}
        />
        <TranslatableInput
          type={"text"}
          placeholder={`Mark`}
          locales={["en", "ar"]}
          label={t("middle-name")}
          name={"user.middle_name"}
        />

        <TranslatableInput
          type={"text"}
          placeholder={`Deep`}
          locales={["en", "ar"]}
          label={t("last-name")}
          name={"user.last_name"}
        />
      </Grid>

      <Grid>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={`Clinic Name`}
          label={t("clinic-name")}
          name={"name"}
        />
        <Input
          name={"user.email"}
          type={"text"}
          placeholder={"Enter The Doctor Email"}
          label={t("email")}
        />
        <Input
          name={"user.password"}
          type={"text"}
          placeholder={"Password"}
          label={t("password")}
        />
        <Input
          name={"user.password_confirmation"}
          type={"text"}
          placeholder={"Confirm Password"}
          label={t("confirm-password")}
        />

        <Input
          name={"user.birth_date"}
          type={"date"}
          placeholder={"Enter Doctor Birth Date"}
          label={t("birth-date")}
          defaultValue={"1970-12-31"}
        />
        <Input
          name={"appointment_cost"}
          type={"number"}
          step={"any"}
          placeholder={"Appointment Cost i.e : 5"}
          label={t("cost")}
        />

        <Input
          name={"max_appointments"}
          type={"number"}
          step={"any"}
          placeholder={"Doctor Max Appointments Per Day Are ?"}
          label={t("max-appointments")}
        />
      </Grid>

      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Clinic Phone Number"}
        label={t("phones")}
        defaultValue={defaultValues?.phone_numbers ?? []}
      />

      <Grid>
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Status:</label>
          <Input
            name={"status"}
            label={t("active")}
            type="radio"
            className="radio radio-info"
            value={"active"}
            defaultChecked={
              defaultValues ? defaultValues?.status == "active" : true
            }
          />
          <Input
            name={"status"}
            label={t("in-active")}
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
            label={t("male")}
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
            label={t("female")}
            type="radio"
            className="radio radio-info"
            value={"female"}
            defaultChecked={defaultValues?.user?.gender == "female"}
          />
        </div>
        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<Hospital[]>> =>
            await HospitalService.make<HospitalService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          getLabel={(option: Hospital) => translate(option.name)}
          value="id"
          name={"hospital_id"}
          inputLabel={t("hospital")}
          selected={[defaultValues?.hospital_id]}
        />

        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<Speciality[]>> =>
            await SpecialityService.make<SpecialityService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          isMultiple={true}
          getLabel={(option: Speciality) => translate(option.name)}
          value={"id"}
          name={"speciality_ids"}
          inputLabel={t("specialities")}
          selected={
            defaultValues?.speciality_ids ? defaultValues?.speciality_ids : []
          }
        />

        <SelectPaginated
          api={async (page, search): Promise<ApiResponse<City[]>> =>
            await CityService.make<CityService>().indexWithPagination(
              page,
              search,
              undefined,
              undefined,
              50,
            )
          }
          getLabel={(option: City) => translate(option.name)}
          value={"id"}
          name={"address.city_id"}
          inputLabel={t("city")}
          selected={[defaultValues?.address?.city_id]}
        />

        <TranslatableInput
          name={"address.name"}
          type={"text"}
          label={t("address")}
        />

        <Input
          name={"address.lat"}
          type={"number"}
          step={"any"}
          label={t("latitude")}
        />

        <Input
          name={"address.lng"}
          type={"number"}
          step={"any"}
          label={t("longitude")}
        />
      </Grid>
      <Grid md={"1"} >

        {defaultValues?.user?.image?
            <div className='h-32'>
              <ImagePreview src={defaultValues?.user?.image ? defaultValues?.user?.image :''} className='h-full w-full object-cover rounded-md cursor-pointer'/>
            </div>
            :
            <div className='flex items-center justify-between'>
              <label className='label'> Image : </label>
              <span className="text-lg badge badge-neutral">No Data</span>
            </div>
        }
      </Grid>
      <ImageUploader name={"user.image"} />

      <div className={`flex justify-center items-center`}>
        <PrimaryButton type={"submit"}>{t("btn")}</PrimaryButton>
      </div>
    </Form>
  );
};

export default ClinicForm;
