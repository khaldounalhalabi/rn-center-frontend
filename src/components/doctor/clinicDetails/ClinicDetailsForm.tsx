"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Datepicker";
import { Navigate } from "@/Actions/navigate";
import { CityService } from "@/services/CityService";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import Textarea from "@/components/common/ui/textArea/Textarea";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { AuthService } from "@/services/AuthService";
import { Clinic } from "@/Models/Clinic";
import { ApiResponse } from "@/Http/Response";
import { Hospital } from "@/Models/Hospital";
import { HospitalService } from "@/services/HospitalService";
import { SpecialityService } from "@/services/SpecialityService";
import TextAreaMap from "@/components/common/ui/textArea/TextAreaMap";
import Gallery from "@/components/common/ui/Gallery";

const ClinicDetailsForm = ({ defaultValues }: { defaultValues: Clinic }) => {

  const handleSubmit = async (data: any) => {
    console.log(data);
    return await AuthService.make<AuthService>("doctor")
      .UpdateClinicDetails(data)
      .then((res) => {
        console.log(res);
        return res;
      });
  };

  const onSuccess = () => {
    Navigate(`/doctor/clinic-details`);
  };

  const [locale, setLocale] = useState<"en" | "ar">("en");
  console.log(defaultValues);

  const defaultRes = {
    address: defaultValues?.user?.address,
    phone_numbers: defaultValues?.user?.phones?.map((ph) => ph.phone),
    ...defaultValues,
  };
  const {work_gallery,...res} = defaultRes
  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={res}
        setLocale={setLocale}
      >
        <Grid md={"2"}>
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={`Clinic Name :`}
            name={"name"}
            locale={locale}
          />

          <Input
            name={"max_appointments"}
            type={"number"}
            step={"any"}
            placeholder={"Doctor Max Appointments Per Day Are ?"}
            label={"Max Appointments Per Day"}
            required={true}
          />
          <Input
            name={"approximate_appointment_time"}
            unit={"min"}
            type={"number"}
            step={"any"}
            placeholder={"Doctor Approximate Appointment Time Are ?"}
            label={"Approximate Appointment Time"}
            required={true}
          />
          <Input
            placeholder={"Appointment Day Range ...  "}
            name={"appointment_day_range"}
            label={"Appointment Day Range"}
            type="text"
          />
          <Input
            placeholder={"Experience ...  "}
            name={"experience"}
            label={"Experience"}
            type="text"
          />
          <Datepicker
            name={"working_start_year"}
            label={"Working Start Year"}
          />
        </Grid>
        <MultiInput
          type={"tel"}
          name={"phone_numbers"}
          placeholder={"Enter Clinic Phone Number"}
          label={"Phones"}
          required={true}
        />
        <Grid md={"2"}>
          <div className={`flex gap-5  p-2 items-center`}>
            <label className={`bg-pom p-2 rounded-md text-white`}>
              Status:
            </label>
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
              label={"In Active"}
              type="radio"
              className="radio radio-info"
              value={"in-active"}
              defaultChecked={defaultValues?.status == "in-active"}
            />
          </div>
          <ApiSelect
            label={"Hospital"}
            name="hospital_id"
            placeHolder={"Select Hospital Name ..."}
            api={(page, search): Promise<ApiResponse<Hospital>> =>
              HospitalService.make<HospitalService>("doctor").getAllHospital(
                page,
                search,
              )
            }
            getOptionLabel={(item) => TranslateClient(item.name)}
            optionValue={"id"}
            defaultValues={
              defaultValues?.hospital ? [defaultValues?.hospital] : []
            }
          />

          <ApiSelect
            required={true}
            name={"speciality_ids"}
            label={"Specialities"}
            placeHolder={"Select Speciality Name ..."}
            api={(page?: number | undefined, search?: string | undefined) =>
              SpecialityService.make<SpecialityService>(
                "doctor",
              ).getAllSpecialities(page, search)
            }
            getOptionLabel={(item) => TranslateClient(item.name)}
            optionValue={"id"}
            defaultValues={defaultValues?.specialities ?? []}
            isMultiple={true}
            closeOnSelect={false}
          />
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={`Address :`}
            name={"address.name"}
            locale={locale}
          />
          <ApiSelect
            required={true}
            name={"address.city_id"}
            label={"City"}
            placeHolder={"Select City Name ..."}
            api={(page?: number | undefined, search?: string | undefined) =>
              CityService.make<CityService>("doctor").getAllCities(page, search)
            }
            getOptionLabel={(item) => TranslateClient(item.name)}
            optionValue={"id"}
            defaultValues={
              defaultValues?.user?.address?.city
                ? [defaultValues?.user.address?.city]
                : []
            }
          />
        </Grid>
        <TextAreaMap
          className={"col-span-2"}
          name="address.map_iframe"
          label={"Map"}
          required={true}
        />
        <Textarea name="about_us" label={"About Us"} required={true} />
        <div className={"col-span-2"}>
          {defaultValues?.work_gallery?.length != 0 ? (
            <Gallery
              media={
                defaultValues?.work_gallery ? defaultValues?.work_gallery : [""]
              }
            />
          ) : (
            <div className="flex items-center">
              <label className="label"> Image : </label>
              <span className="text-lg badge badge-neutral">No Data</span>
            </div>
          )}
        </div>
        <ImageUploader name={"work_gallery"} isMultiple={true} label={'Our Work'}/>
      </Form>
    </>
  );
};

export default ClinicDetailsForm;