import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import {ClinicTransactionService} from "@/services/ClinicTransactionService";
import {ClinicTransaction} from "@/Models/ClinicTransaction";

const page = async ({
                      params: { transactionId },
                    }: {
  params: { transactionId: number };
}) => {
  const data =
      await ClinicTransactionService.make<ClinicTransactionService>("doctor").show(transactionId);
  const res: ClinicTransaction = data?.data;

  return (
      <PageCard>
        <div className="flex justify-between items-center w-full h-24">
          <h2 className="card-title">Transaction Details</h2>
          <Link href={`/doctor/transaction/${transactionId}/edit`}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
          </Link>
        </div>
        <Grid md={2} gap={5}>
          <label className="label justify-start text-xl">
            Patient Name :{" "}
            <span className="ml-2 badge badge-outline">
            {res?.appointment?.customer?.user?.first_name?
                <>{await TranslateServer(res?.appointment?.customer?.user?.first_name)}{" "}
                  {await TranslateServer(res?.appointment?.customer?.user?.middle_name)}{" "}
                  {await TranslateServer(res?.appointment?.customer?.user?.last_name)}</>:<>No Data</>}
          </span>
          </label>
          <label className="label justify-start text-xl">
            Doctor Name :{" "}
            <span className="ml-2 badge badge-outline">
            {res?.clinic?.user?.first_name?
            <>{await TranslateServer(res?.clinic?.user?.first_name)}{" "}
              {await TranslateServer(res?.clinic?.user?.middle_name)}{" "}
              {await TranslateServer(res?.clinic?.user?.last_name)}</>:<>No Data</>}
          </span>
          </label>
          <label className="label justify-start text-xl">
            type : <span className="ml-2 badge badge-primary  ">{res.type}</span>
          </label>
          <label className="label justify-start text-xl">
            Status : <span className="ml-2 badge badge-success  ">{res.status}</span>
          </label>
          <label className="label justify-start text-xl">
            Amount :{" "}
            <span className="ml-2 badge badge-warning" suppressHydrationWarning>
            {res?.type == "income"
                ? "+"
                : res?.type == "outcome"
                    ? "-"
                    : res?.type == "system_debt" ?
                        "-":"+"}{res?.amount.toLocaleString()} IQD

          </span>
          </label>

          <label className="label justify-start text-xl">
            Date :{" "}
            <span className="ml-2 badge badge-accent  ">
            {res?.date ?? "No Data"}
          </span>
          </label>
          <label className="label justify-start text-xl">
            Appointment Date :{" "}
            <span className="ml-2 badge badge-neutral  ">
            {res?.appointment?.date ?? "No Data"}
          </span>
          </label>
          <label className="label justify-start text-xl">
            Appointment Total Const :{" "}
            <span className="ml-2 badge badge-info  ">
            {res?.appointment?.total_cost ?? "No Data"}
          </span>
          </label>
        </Grid>
        <label className={"label text-xl"}>Description :</label>
        <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.notes ?? ""}
        />
      </PageCard>
  );
};

export default page;