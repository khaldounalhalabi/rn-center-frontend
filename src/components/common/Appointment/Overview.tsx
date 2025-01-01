import React from "react";
import { Appointment } from "@/Models/Appointment";
import Grid from "@/components/common/ui/Grid";
import { SystemOffers } from "@/Models/SystemOffer";
import { Offers } from "@/Models/Offers";
import HandleCalcOffers from "@/hooks/HandleCalcOffers";
import { useTranslations } from "next-intl";
import {
  TranslateClient,
  TranslateStatusOrTypeClient,
} from "@/Helpers/TranslationsClient";
import { Label } from "../ui/LabelsValues/Label";
import { LabelValue } from "../ui/LabelsValues/LabelValue";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import XMark from "@/components/icons/XMark";
import AppointmentStatusColumn from "@/components/doctor/appointment/AppointmentStatusColumn";

const Overview = ({
  appointment,
}: {
  appointment?: Appointment | undefined;
  userType?: "admin" | "doctor";
}) => {
  const t = useTranslations("common.appointment.show");
  const appointmentCost = HandleCalcOffers(
    appointment?.offers ?? [],
    HandleCalcOffers(
      appointment?.system_offers ?? [],
      appointment?.clinic?.appointment_cost ?? 0,
      "system",
    ),
    "offer",
  );

  const handleTotalCost = (): number => {
    return (
      Number(appointment?.is_revision ? 0 : appointmentCost ?? 0) +
      Number(appointment?.extra_fees ?? 0) +
      Number(appointment?.is_revision ? 0 : appointment?.service?.price ?? 0) -
      Number(appointment?.discount ?? 0)
    );
  };

  return (
    <div className={"card bg-base-200 my-3 w-full"}>
      <Grid md={2} gap={8}>
        <Label label={t("status")}>
          <AppointmentStatusColumn
            userType={"doctor"}
            appointment={appointment}
          />
        </Label>

        <LabelValue
          label={t("type")}
          value={TranslateStatusOrTypeClient(appointment?.type)}
          color={"primary"}
        />

        <Label label={t("is_revision")}>
          {appointment?.is_revision ? (
            <CheckMarkIcon className={"h-6 w-6 text-success"} />
          ) : (
            <XMark className={"h-6 w-6 text-error"} />
          )}
        </Label>

        <LabelValue
          label={t("extraFees")}
          value={`${appointment?.extra_fees} ${t("iqd")}`}
          color={"info"}
        />

        <LabelValue
          label={t("totalCost")}
          value={`${appointment?.total_cost?.toLocaleString()} ${t("iqd")}`}
          color={"success"}
        />

        <LabelValue
          label={t("appointmentSequence")}
          value={appointment?.appointment_sequence?.toLocaleString()}
          color={"warning"}
        />

        <LabelValue
          label={t("date")}
          value={appointment?.date}
          color={"primary"}
        />
      </Grid>

      <div className={"w-full my-5"}>
        <Label label={t("note")} col>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={appointment?.note}
          />
        </Label>
      </div>
      {appointment?.cancellation_reason ? (
        <div className="w-full my-5">
          <Label label={t("cancellationReason")}>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              disabled={true}
              defaultValue={appointment?.cancellation_reason}
            />
          </Label>
        </div>
      ) : (
        ""
      )}

      <div className="overflow-x-auto border-2 rounded-2xl">
        <table className="table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("price")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("cost")}</td>
              <td>
                {appointment?.is_revision
                  ? 0
                  : appointment?.clinic?.appointment_cost.toLocaleString() ??
                    0}{" "}
                {t("iqd")}
              </td>
            </tr>
            <tr>
              <td>{t("service")}</td>
              <td>
                {appointment?.is_revision
                  ? 0
                  : appointment?.service?.price.toLocaleString() ?? 0}{" "}
                {t("iqd")}
              </td>
            </tr>
            <tr>
              <td>{t("extraFees")}</td>
              <td>
                {Number(appointment?.extra_fees).toLocaleString() ?? 0}{" "}
                {t("iqd")}
              </td>
            </tr>
            <tr>
              <td>{t("discount")}</td>
              <td>
                {Number(appointment?.discount).toLocaleString() ?? 0} {t("iqd")}
              </td>
            </tr>
            {appointment?.offers?.length != 0
              ? appointment?.offers?.map((e: Offers, index) => (
                  <tr key={index}>
                    <td>
                      {t("offers")} [{TranslateClient(e.title)}]
                    </td>
                    <td>
                      {e?.value.toLocaleString() ?? 0}{" "}
                      {e?.type == "fixed" ? t("iqd") : "%"}
                    </td>
                  </tr>
                ))
              : ""}
            {appointment?.system_offers?.length != 0
              ? appointment?.system_offers?.map((e: SystemOffers, index) => (
                  <tr key={index}>
                    <td>
                      {t("systemOffer")} [{TranslateClient(e.title)}]
                    </td>
                    <td>
                      {e?.amount.toLocaleString() ?? 0}{" "}
                      {e?.type == "fixed" ? t("iqd") : "%"}
                    </td>
                  </tr>
                ))
              : ""}
            <tr>
              <td className="text-lg">{t("totalCost")}</td>
              <td className="text-lg text-primary">
                {handleTotalCost().toLocaleString()} {t("iqd")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
