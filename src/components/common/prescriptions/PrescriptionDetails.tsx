"use server";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { Link } from "@/navigation";
import Eye from "@/components/icons/Eye";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import { Prescription } from "@/Models/Prescriptions";
import { getTranslations } from "next-intl/server";

interface PrescriptionDetailsProps {
  prescription?: Prescription;
}

const PrescriptionDetails: React.FC<PrescriptionDetailsProps> = async ({
  prescription,
}) => {
  const t = await getTranslations("common.prescription");

  if (!prescription) {
    return (
      <div className="text-center text-gray-500">{t("no_prescription")}</div>
    );
  }

  return (
    <div className={"w-full flex gap-2"}>
      <Grid>
        <LabelValue label={t("next_visit")} value={prescription?.next_visit} />
        <LabelValue
          label={t("prescribed_at")}
          value={prescription?.created_at}
        />
        {prescription?.clinic && (
          <Label label={t("doctor")}>
            <Link
              href={`/admin/clinics/${prescription?.clinic_id}`}
              className={"btn btn-sm"}
            >
              {prescription?.clinic?.user?.full_name}
            </Link>
          </Label>
        )}

        {prescription?.customer && (
          <Label label={t("patient")}>
            <Link
              href={`/admin/patients/${prescription?.customer_id}`}
              className={"btn btn-sm"}
            >
              {prescription?.customer?.user?.full_name}
            </Link>
          </Label>
        )}
        {prescription?.appointment && (
          <Label label={t("appointment_date")}>
            <Link
              href={`/admin/appointment/${prescription?.appointment_id}`}
              className={"btn btn-sm"}
            >
              {prescription?.appointment?.date_time}
            </Link>
          </Label>
        )}
        {prescription?.other_data?.map((item, index) => (
          <div className={"md:col-span-2"} key={index}>
            <LabelValue label={item.key} value={item.value} col />
          </div>
        ))}
        <div className={"md:col-span-2"}>
          <Label label={t("medicines")} col>
            <table className="table table-auto w-full">
              <thead>
                <tr>
                  <th>id</th>
                  <th>{t("medicine_name")}</th>
                  <th>{t("dosage")}</th>
                  <th>{t("dosage_interval")}</th>
                  <th>{t("comment")}</th>
                  <th>{t("status")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {prescription?.medicines?.map((medicineData, index) => (
                  <tr key={index}>
                    <th>{medicineData?.medicine_id}</th>
                    <td>
                      <Link
                        className={"btn"}
                        href={`/admin/medicines/${medicineData?.medicine_id}`}
                      >
                        {medicineData?.medicine?.name}
                      </Link>
                    </td>
                    <td>{medicineData?.dosage}</td>
                    <td>{medicineData?.dose_interval}</td>
                    <td>{medicineData?.comment}</td>
                    <td>
                      <TranslatableEnum value={medicineData?.status} />
                    </td>
                    <td>
                      <Link
                        href={`/admin/medicines/${medicineData?.medicine_id}`}
                        className={"btn btn-square btn-sm"}
                      >
                        <Eye className={"text-primary"} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Label>
        </div>
      </Grid>
    </div>
  );
};

export default PrescriptionDetails;
