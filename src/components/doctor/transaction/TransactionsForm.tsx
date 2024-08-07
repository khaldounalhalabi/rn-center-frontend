"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Input from "@/components/common/ui/Inputs/Input";
import { Navigate } from "@/Actions/navigate";
import TransactionTypeArray, { TransactionType } from "@/enum/TransactionType";
import Textarea from "@/components/common/ui/textArea/Textarea";
import {ClinicTransactionService} from "@/services/ClinicTransactionService";
import {ClinicTransaction} from "@/Models/ClinicTransaction";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import DateTimePickerRang from "@/components/common/ui/Date/DateTimePickerRang";

const OfferForm = ({
                       defaultValues = undefined,
                       id,
                       type = "store",
                   }: {
    defaultValues?: ClinicTransaction;
    id?: number;
    type?: "store" | "update";
}) => {
    const handleSubmit = async (data: any) => {
        console.log(data);

        if (
            type === "update" &&
            (defaultValues?.id != undefined || id != undefined)
        ) {
            return ClinicTransactionService.make<ClinicTransactionService>("doctor")
                .update(defaultValues?.id ?? id, data)
                .then((res) => {
                    console.log(res);
                    return res;
                });
        } else {
            return await ClinicTransactionService.make<ClinicTransactionService>("doctor")
                .store(data)
                .then((res) => {
                    console.log(res);
                    return res;
                });
        }
    };
    const onSuccess = () => {
        Navigate(`/doctor/transaction`);
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            onSuccess={onSuccess}
            defaultValues={defaultValues}
        >
            <Grid md={"2"}>
                <SelectPopOverFrom
                    name={"type"}
                    handleSelect={(type: string) => {}}
                    status={defaultValues?.type ?? TransactionType.INCOME}
                    ArraySelect={TransactionTypeArray()}
                    required={true}
                    label={"Type :"}
                />
                <Input
                    placeholder={"amount ... "}
                    name={"amount"}
                    label={"Amount"}
                    required={true}
                    type="number"
                    unit={"IQD"}
                />
                <DateTimePickerRang required={true} name={"date"} label={"Date :"} />
            </Grid>
            <Textarea
                label={"Notes"}
                name={"notes"}
                defaultValue={defaultValues?.notes ?? ""}
            />
        </Form>
    );
};

export default OfferForm;