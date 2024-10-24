"use client";
import { useTranslations } from "next-intl";
import React from "react";
import Form from "@/components/common/ui/Form";
import Input from "@/components/common/ui/Inputs/Input";
import { JoinRequestService } from "@/services/JoinRequestService";
import { Navigate } from "@/Actions/navigate";
import { CityService } from "@/services/CityService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { City } from "@/Models/City";
import { swal } from "@/Helpers/UIHelpers";

const JoinRequestForm = () => {
  const t = useTranslations("auth");
  const joinRequestTranslation = useTranslations("join_requests");
  const handleSubmit = async (data: any) =>
    await JoinRequestService.make<JoinRequestService>("public").store(data);
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2  left-1/2 bg-white p-8 rounded-2xl w-full md:w-6/12 max-w-[455px] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center mb-4 w-full">
          <h1 className="font-bold text-2xl sm:text-3xl">
            {t("send_us_join_request")}
          </h1>
        </div>
        <Form
          handleSubmit={handleSubmit}
          onSuccess={() => {
            Navigate("/auth/doctor/login");
            swal.fire({
              title: joinRequestTranslation("join_request_sent"),
              confirmButtonColor: "#007BFF",
            });
          }}
        >
          <Input
            name={"doctor_name"}
            required={true}
            type={"text"}
            label={joinRequestTranslation("doctor_name")}
          />
          <Input
            type={"text"}
            required={true}
            name={"clinic_name"}
            label={joinRequestTranslation("clinic_name")}
          />
          <Input
            type={"tel"}
            required={true}
            name={"phone_number"}
            label={joinRequestTranslation("phone")}
          />
          <ApiSelect
            required={true}
            name={"city_id"}
            label={joinRequestTranslation("city")}
            api={(page?: number | undefined, search?: string | undefined) =>
              CityService.make<CityService>("public").getAllCities(page, search)
            }
            getOptionLabel={(item: City) => TranslateClient(item.name)}
            optionValue={"id"}
          />
        </Form>
      </div>
    </div>
  );
};
export default JoinRequestForm;
