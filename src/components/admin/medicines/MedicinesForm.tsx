"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import {MedicineService} from "@/services/MedicinesSevice";
import {Medicine} from "@/Models/Medicines";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import {ClinicService} from "@/services/ClinicService";
import {Clinic} from "@/Models/Clinic";
import {translate} from "@/Helpers/Translations";
import Input from "@/components/common/ui/Inputs/Input";
import Textarea from "@/components/common/ui/textArea/Textarea";

const MedicinesForm = ({
                               defaultValues = undefined,
                               id,
                               type = "store",
                           }: {
    defaultValues?: Medicine;
    id?: number;
    type?: "store" | "update";
}) => {
    const handleSubmit = async (data: any) => {
        if (
            type === "update" &&
            (defaultValues?.id != undefined || id != undefined)
        ) {
            return await MedicineService.make<MedicineService>("admin")
                .update(defaultValues?.id ?? id, data)
        } else {
            return await MedicineService.make<MedicineService>("admin").store(data);
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
                    defaultValues={
                        defaultValues?.clinic ? [defaultValues?.clinic] : []
                    }
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
