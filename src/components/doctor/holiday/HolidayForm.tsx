"use client";
import Form from "@/components/common/ui/Form";
import { ClinicsService } from "@/services/ClinicsService";
import React from "react";
import Input from "@/components/common/ui/Inputs/Input";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { ApiResponse } from "@/Http/Response";
import { Clinic } from "@/Models/Clinic";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useTranslations } from "next-intl";
import Datepicker from "@/components/common/ui/Datepicker";
const HolidayForm = ({
                         defaultValues = undefined,
                         type = "store",
                     }: {
    defaultValues?: ClinicHoliday;
    id?: number;
    type?: "store" | "update";
}) => {
    const handleSubmit = async (data: any) => {
        if (type === "update" && defaultValues?.id) {
            return ClinicHolidayService.make<ClinicHolidayService>("doctor").update(
                defaultValues.id,
                data,
            );
        } else {
            return await ClinicHolidayService.make<ClinicHolidayService>("doctor").store(
                data,
            );
        }
    };

    const onSuccess = () => {
        Navigate(`/doctor/clinic/holidays`);
    };
    return (
        <Form
            handleSubmit={handleSubmit}
            onSuccess={onSuccess}
            defaultValues={defaultValues}
        >
            <Grid md={2}>
                <Datepicker
                    required={true}
                    name={"start_date"}
                    label={("Start Holiday")}
                />
                <Datepicker required={true} name={"end_date"} label={("End Holiday")} />
            </Grid>
            <div className="my-3">
                <TranslatableTextArea
                    required={true}
                    defaultValue={defaultValues?.reason}
                    label={("Reason")}
                    name={"reason"}
                    locales={["en", "ar"]}
                />
            </div>
        </Form>
    );
};

export default HolidayForm;