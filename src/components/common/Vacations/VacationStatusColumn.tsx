"use client";
import Select from "@/components/common/ui/selects/Select";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { RoleEnum } from "@/enums/RoleEnum";
import VacationStatusEnum from "@/enums/VacationStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import Vacation from "@/models/Vacation";
import VacationService from "@/services/VacationService";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";
import DialogPopup from "../ui/DialogPopup";
import Form from "../ui/Form";
import FormTextarea from "../ui/text-inputs/FormTextarea";

const VacationStatusColumn = ({
  vacation,
  role,
  revalidate,
}: {
  vacation?: Vacation;
  role: RoleEnum;
  revalidate?: () => void;
}) => {
  const t = useTranslations("vacations");
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = React.useState<VacationStatusEnum>(
    vacation?.status ?? VacationStatusEnum.DRAFT,
  );

  const onChange = (value: string | VacationStatusEnum) => {
    console.log(value, value == VacationStatusEnum.REJECTED);

    setLoading(true);
    if (value == VacationStatusEnum.REJECTED) {
      setOpen(true);
    } else {
      VacationService.make(role)
        .toggleStatus(vacation?.id ?? 0, value as VacationStatusEnum)
        .then((res) => {
          setLoading(false);
          if (res.ok()) {
            setStatus(res?.data ?? status);
            if (revalidate) {
              revalidate();
            }
            toast(res.message as string);
          } else {
            setStatus(vacation?.status ?? status);
            toast(t("error"), {
              description: res?.message as string,
              dismissible:true
            });          }
        });
    }
  };

  const reject = async (data: any) => {
    return await VacationService.make(role)
      .toggleStatus(
        vacation?.id ?? 0,
        VacationStatusEnum.REJECTED,
        data?.cancellation_reason,
      )
      .then((res) => {
        setLoading(false);
        if (res.ok()) {
          setStatus(res?.data ?? status);
          if (revalidate) {
            revalidate();
          }
          toast(res.message as string);
        } else {
          setStatus(vacation?.status ?? status);
          toast(res.message as string);
        }

        return res;
      });
  };

  return (
    <>
      <DialogPopup
        open={open}
        onClose={() => {
          setOpen(false);
          setLoading(false);
        }}
      >
        <Form
          handleSubmit={reject}
          onSuccess={() => {
            setOpen(false);
            setLoading(false);
          }}
        >
          <FormTextarea name="cancellation_reason" required label={t("cancellation_reason")}/>
        </Form>
      </DialogPopup>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <Select
          data={getEnumValues(VacationStatusEnum)}
          translated
          onChange={onChange}
          selected={status}
        />
      )}
    </>
  );
};

export default VacationStatusColumn;
