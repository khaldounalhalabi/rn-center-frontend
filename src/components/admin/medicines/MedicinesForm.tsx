"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { CategoryService } from "@/services/CategoryService";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { useTranslations } from "next-intl";
import {Prescriptions} from "@/Models/Prescriptions";
import {PrescriptionsService} from "@/services/PrescriptionsServise";
import {MedicinesService} from "@/services/MedicinesSevice";
import {Medicines} from "@/Models/Medicines";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import {ClinicService} from "@/services/ClinicService";
import {AppointmentService} from "@/services/AppointmentService";
import {Clinic} from "@/Models/Clinic";
import {translate} from "@/Helpers/Translations";
import Input from "@/components/common/ui/Inputs/Input";
import Textarea from "@/components/common/ui/textArea/Textarea";

const MedicinesForm = ({
                               defaultValues = undefined,
                               id,
                               type = "store",
                           }: {
    defaultValues?: Medicines;
    id?: number;
    type?: "store" | "update";
}) => {
    const handleSubmit = async (data: any) => {
        if (
            type === "update" &&
            (defaultValues?.id != undefined || id != undefined)
        ) {
            return MedicinesService.make<MedicinesService>("admin")
                .update(defaultValues?.id ?? id, data)
                .then((res) => {
                    return res;
                });
        } else {
            return await MedicinesService.make<MedicinesService>("admin").store(data);
        }
    };
    const onSuccess = () => {
        Navigate(`/admin/medicines`);
    };
    return (
        <Form
            handleSubmit={handleSubmit}
            onSuccess={onSuccess}
            defaultValues={defaultValues}
        >
            <Grid md={"2"}>
                <ApiSelect
                    required={true}
                    placeHolder={"Select Clinic name ..."}
                    name={"clinic_id"}
                    api={(page, search) =>
                        ClinicService.make<ClinicService>().indexWithPagination(
                            page,
                            search,
                        )
                    }
                    label={"Clinic Name"}
                    optionValue={"id"}
                    getOptionLabel={(data: Clinic) => translate(data.name)}
                />
                <Input
                    name={"name"}
                    label={"Medicine Name :"}
                    placeholder={'name ....'}
                    type="text"
                    defaultValue={
                        defaultValues ? defaultValues?.name : undefined
                    }
                />
            </Grid>
            <Textarea name={'description'} defaultValue={defaultValues ? defaultValues?.description : undefined}/>
        </Form>
    );
};

export default MedicinesForm;
