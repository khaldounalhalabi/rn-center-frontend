"use server";
import { getRole, getUser } from "@/actions/HelperActions";
import ShowMedicineSheet from "@/components/common/medicine/ShowMedicineSheet";
import Grid from "@/components/common/ui/Grid";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { RoleEnum } from "@/enums/RoleEnum";
import { Appointment } from "@/models/Appointment";
import { Prescription } from "@/models/Prescriptions";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

interface PrescriptionDetailsProps {
  prescription?: Prescription;
  appointment?: Appointment;
  customerId?: number;
}

const PrescriptionDetails: React.FC<PrescriptionDetailsProps> = async ({
  prescription,
  appointment = undefined,
  customerId,
}) => {
  const t = await getTranslations("common.prescription");
  const role = await getRole();
  const user = await getUser();

  if (!prescription) {
    return (
      <div className="text-center text-gray-500">
        {role == RoleEnum.DOCTOR ? (
          <Link
            href={
              appointment
                ? `/doctor/appointment/${appointment?.id}/prescriptions/create`
                : `/doctor/patients/${customerId}/prescriptions/create`
            }
          >
            <Button>{t("create.addPrescription")}</Button>
          </Link>
        ) : (
          t("no_prescription")
        )}
      </div>
    );
  }

  return (
    <div className={"flex flex-col w-full gap-2"}>
      {role == RoleEnum.DOCTOR &&
        user?.clinic?.id == prescription?.clinic_id && (
          <div className={"flex justify-end w-full"}>
            <Link
              href={
                appointment
                  ? `/doctor/appointment/${appointment?.id}/prescriptions/${prescription?.id}`
                  : `/doctor/patients/${customerId}/prescriptions/${prescription?.id}/edit`
              }
            >
              <Button size={"icon"}>
                <Pencil />
              </Button>
            </Link>
          </div>
        )}
      <Grid>
        <LabelValue label={t("next_visit")} value={prescription?.next_visit} />
        <LabelValue
          label={t("prescribed_at")}
          value={prescription?.created_at}
        />
        {prescription?.clinic && (
          <Label label={t("doctor")}>
            {role == RoleEnum.ADMIN ? (
              <Link
                href={`/admin/clinics/${prescription?.clinic_id}`}
                className={"btn btn-sm"}
              >
                {prescription?.clinic?.user?.full_name}
              </Link>
            ) : (
              prescription?.clinic?.user?.full_name
            )}
          </Label>
        )}

        {prescription?.customer && (
          <Label label={t("patient")}>
            <Link
              href={`/${role}/patients/${prescription?.customer_id}`}
              className={"btn btn-sm"}
            >
              {prescription?.customer?.user?.full_name}
            </Link>
          </Label>
        )}

        {prescription?.appointment && role == RoleEnum.ADMIN ? (
          <Label label={t("appointment_date")}>
            <Link
              href={`/admin/appointment/${prescription?.appointment_id}`}
              className={"btn btn-sm"}
            >
              {prescription?.appointment?.date_time}
            </Link>
          </Label>
        ) : (
          <LabelValue
            label={t("appointment_date")}
            value={prescription?.appointment?.date_time ?? appointment?.date_time}
          />
        )}

        {prescription?.other_data?.map((item, index) => (
          <div className={"md:col-span-2"} key={index}>
            <LabelValue label={item.key} value={item.value} col />
          </div>
        ))}

        <div className={"md:col-span-2"}>
          <Label label={t("medicines")} col>
            <Table className="table w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className={"text-start"}>id</TableHead>
                  <TableHead className={"text-start"}>
                    {t("medicine_name")}
                  </TableHead>
                  <TableHead className={"text-start"}>{t("dosage")}</TableHead>
                  <TableHead className={"text-start"}>
                    {t("dosage_interval")}
                  </TableHead>
                  <TableHead className={"text-start"}>{t("comment")}</TableHead>
                  <TableHead className={"text-start"}>{t("status")}</TableHead>
                  <TableHead className={"text-start"}>{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescription?.medicines?.map((medicineData, index) => (
                  <TableRow key={index}>
                    <TableCell>{medicineData?.medicine_id}</TableCell>
                    <TableCell>{medicineData?.medicine?.name}</TableCell>
                    <TableCell>{medicineData?.dosage}</TableCell>
                    <TableCell>{medicineData?.dose_interval}</TableCell>
                    <TableCell>{medicineData?.comment}</TableCell>
                    <TableCell>
                      <TranslatableEnum value={medicineData?.status} />
                    </TableCell>
                    <TableCell>
                      <ShowMedicineSheet medicine={medicineData?.medicine} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Label>
        </div>
      </Grid>
    </div>
  );
};

export default PrescriptionDetails;
