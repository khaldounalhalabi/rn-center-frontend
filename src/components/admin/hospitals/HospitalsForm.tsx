"use client";
import Form from "@/components/common/ui/Form";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { AddHospital } from "@/Models/Hospital";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { DepartmentsService } from "@/services/DepartmentsService";
import { HospitalService } from "@/services/HospitalService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { translate } from "@/Helpers/Translations";
import { ApiResponse } from "@/Http/Response";
import { Department } from "@/Models/Departments";
import { CityService } from "@/services/CityService";
import { City } from "@/Models/City";
import TextAreaMap from "@/components/common/ui/textArea/TextAreaMap";
import Gallery from "@/components/common/ui/Gallery";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import {useTranslations} from "next-intl";

const HospitalsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddHospital;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations('admin.hospitals.create-edit')
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return HospitalService.make<HospitalService>()
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await HospitalService.make<HospitalService>().store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/hospitals`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("hospitalName")}
          name={"name"}
        />

        <ApiSelect
          api={(page, search): Promise<ApiResponse<Department[]>> =>
            DepartmentsService.make<DepartmentsService>().indexWithPagination(
              page,
              search,
            )
          }
          isMultiple={true}
          optionValue={"id"}
          getOptionLabel={(data) => translate(data.name)}
          defaultValues={
            defaultValues?.available_departments
              ? defaultValues.available_departments
              : []
          }
          label={t("availableDepartments")}
          name="available_departments"
          closeOnSelect={false}
        />
      </Grid>

      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Hospital Phone Number"}
        label={t("hospitalPhones")}
        defaultValue={defaultValues?.phone_numbers ?? []}
      />

      <Grid md={"2"}>
        <ApiSelect
          api={(page, search): Promise<ApiResponse<City[]>> =>
            CityService.make<CityService>().indexWithPagination(page, search)
          }
          defaultValues={
            defaultValues?.address?.city ? [defaultValues?.address?.city] : []
          }
          name="city_id"
          label={t("city")}
          optionValue="id"
          getOptionLabel={(data) => translate(data.name)}
        />
        <TranslatableInput
          name={"address.name"}
          type={"text"}
          label={t("address")}
        />

        {type == "update" ? (
          <div className={"col-span-2"}>
            {defaultValues?.photos?.length != 0 ? (
              <Gallery
                media={defaultValues?.photos ? defaultValues?.photos : [""]}
              />
            ) : (
              <div className="flex items-center">
                <label className="label"> {t('image')} : </label>
                <span className="text-lg badge badge-neutral">{t('noData')}</span>
              </div>
            )}
          </div>
        ) : false
        }
      </Grid>

      <ImageUploader name={"images"} isMultiple={true} />
      <TextAreaMap
        className={"col-span-2"}
        name="address.map_iframe"
        label={t("mapIframe")}
      />
    </Form>
  );
};

export default HospitalsForm;
