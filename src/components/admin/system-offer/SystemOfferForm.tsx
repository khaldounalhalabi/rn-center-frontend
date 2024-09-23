"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import OffersArray from "@/enum/OfferType";
import { Navigate } from "@/Actions/navigate";
import { SystemOffersService } from "@/services/SystemOffersService";
import { SystemOffers } from "@/Models/SystemOffer";
import { ApiResponse } from "@/Http/Response";
import Textarea from "@/components/common/ui/textArea/Textarea";
import Gallery from "@/components/common/ui/Gallery";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { useTranslations } from "next-intl";

const SystemOfferForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: SystemOffers;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.system.create");
  const handleSubmit = async (data: any) => {
    const sendData = {
      ...data,
      allow_reuse: Number(data.allow_reuse),
    };
    console.log(sendData);

    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return SystemOffersService.make<SystemOffersService>("admin")
        .update(defaultValues?.id ?? id, sendData)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await SystemOffersService.make<SystemOffersService>("admin")
        .store(sendData)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/system-offer`);
  };
  const { image, ...res } = defaultValues ?? { image: [] };
  return (
    <Form handleSubmit={handleSubmit} onSuccess={onSuccess} defaultValues={res}>
      <Grid md={"2"}>
        <ApiSelect
          required={true}
          api={(page, search): Promise<ApiResponse<Clinic[]>> =>
            ClinicsService.make<ClinicsService>("admin")
              .setHeaders({ filtered: true })
              .indexWithPagination(page, search)
          }
          closeOnSelect={false}
          placeHolder={"Select Clinic Name ..."}
          label={`${t("clinicName")} :`}
          getOptionLabel={(item) => TranslateClient(item.name)}
          optionValue={"id"}
          defaultValues={defaultValues?.clinics ?? []}
          isMultiple={true}
          name={"clinics"}
        />
        <SelectPopOverFrom
          name={"type"}
          status={defaultValues?.type ?? "percentage"}
          ArraySelect={OffersArray()}
          required={true}
          label={t("type")}
          handleSelect={() => undefined}
        />
        <Input
          placeholder={"amount ... "}
          name={"amount"}
          label={t("amount")}
          required={true}
          type="number"
          unit={"IQD"}
        />
        <Input
          placeholder={"allowed uses ... "}
          name={"allowed_uses"}
          label={t("alowedUses")}
          required={true}
          type="number"
        />

        <Datepicker required={true} name={"from"} label={t("startDate")} />
        <Datepicker required={true} name={"to"} label={t("endDate")} />
        <div className={"flex w-full pl-2 my-3 justify-around"}>
          <label className={"w-2/3"}>
            {t("allowReuse")} : <span className="ml-1 text-red-600">*</span>
          </label>
          <div className={"w-1/3"}>
            <Input
              name={"allow_reuse"}
              type="checkbox"
              className="checkbox checkbox-info"
            />
          </div>
        </div>
      </Grid>
      <Textarea
        label={t("title")}
        name={"title"}
        required={true}
        defaultValue={defaultValues?.title ?? ""}
      />
      <Textarea
        label={t("description")}
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
      />
      {type == "update" ? (
        <div className={"col-span-2"}>
          {defaultValues?.image?.length != 0 ? (
            <Gallery media={defaultValues?.image ? defaultValues?.image : []} />
          ) : (
            <div className="flex items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">No Data</span>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      <ImageUploader name={"image"} label={t("image")} />
    </Form>
  );
};

export default SystemOfferForm;
