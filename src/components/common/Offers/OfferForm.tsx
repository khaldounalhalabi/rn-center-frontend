"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Grid from "@/components/common/ui/Grid";
import { Offers } from "@/Models/Offers";
import { OffersService } from "@/services/OffersService";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import dayjs from "dayjs";
import OffersArray from "@/enum/OfferType";
import { Navigate } from "@/Actions/navigate";
import Gallery from "@/components/common/ui/Gallery";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { useTranslations } from "next-intl";

const OfferForm = ({
  defaultValues = undefined,
  typePage = "admin",
  id,
  type = "store",
}: {
  defaultValues?: Offers;
  typePage?: "admin" | "doctor" | "customer";
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("doctor.offer.create");
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return OffersService.make<OffersService>(typePage).update(
        defaultValues?.id ?? id,
        data
      );
    } else {
      return await OffersService.make<OffersService>(typePage).store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/${typePage}/offer`);
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [typeOffers, setTypeOffers] = useState(
    defaultValues?.type ?? "percentage"
  );
  const { image, ...res } = defaultValues ?? { image: [] };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={res}
      setLocale={setLocale}
    >
      <Grid md={"2"}>
        {typePage == "admin" ? (
          <ApiSelect
            required={true}
            placeHolder={"Select Clinic name ..."}
            name={"clinic_id"}
            api={(page, search) =>
              ClinicsService.make<ClinicsService>()
                .setHeaders({ filtered: true })
                .indexWithPagination(page, search)
            }
            defaultValues={defaultValues?.clinic ? [defaultValues?.clinic] : []}
            label={t("clinicName")}
            optionValue={"id"}
            getOptionLabel={(data: Clinic) => TranslateClient(data.name)}
          />
        ) : (
          ""
        )}
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("title")}
          name={"title"}
          locale={locale}
        />
        <SelectPopOverFrom
          name={"type"}
          handleSelect={(type: string) => {
            setTypeOffers(type);
          }}
          status={defaultValues?.type ?? "percentage"}
          ArraySelect={OffersArray()}
          required={true}
          label={t("type")}
          translatedStatusTypeItem={true}
        />
        <Input
          placeholder={"Price : "}
          name={"value"}
          label={t("value")}
          required={true}
          type="number"
          unit={typeOffers == "percentage" ? "%" : t("iqd")}
        />
        {typePage == "doctor" ? (
          <div className={`flex gap-5 p-2 items-center`}>
            <label className={`bg-pom p-2 rounded-md text-white`}>
              {t("status")}
            </label>
            <Input
              name={"is_active"}
              label={t("not-active")}
              type="radio"
              className="radio radio-info"
              value={"in-active"}
              defaultChecked={!defaultValues?.is_active}
            />
            <Input
              name={"is_active"}
              label={t("active")}
              type="radio"
              className="radio radio-info"
              value={"active"}
              defaultChecked={defaultValues ? defaultValues?.is_active : true}
            />
          </div>
        ) : (
          ""
        )}
        <Datepicker
          shouldDisableDate={(day) => {
            return dayjs().isAfter(day.add(1, "day"));
          }}
          required={true}
          name={"start_at"}
          label={t("startDate")}
        />
        <Datepicker required={true} name={"end_at"} label={t("endDate")} />
      </Grid>
      <TranslatableTextArea
        name={"note"}
        locale={locale}
        defaultValue={defaultValues?.note ?? ""}
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

export default OfferForm;
