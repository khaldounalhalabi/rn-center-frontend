"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { RoleEnum } from "@/enums/RoleEnum";
import { ApiResponse } from "@/http/Response";
import Payrun from "@/models/Payrun";
import PayrunService from "@/services/PayrunService";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const PayrunForm = ({
  revalidate,
  role,
}: {
  revalidate?: () => void;
  role: RoleEnum;
}) => {
  const t = useTranslations("payruns");
  const [isOverlap, setOverlap] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    from?: string;
    to?: string;
    force_create: 1 | 0;
  }>();
  const onSubmit = async (data: {
    from?: string;
    to?: string;
    force_create?: 1 | 0;
  }) => {
    if (!data?.force_create) {
      data.force_create = 0;
    }

    const response = await PayrunService.make(role).store(data);
    if (response.code == 410) {
      setOverlap(true);
      setFormData({ ...data, force_create: 0 });
    }

    return response;
  };

  const onSuccess = async (response: ApiResponse<Payrun>) => {
    if (response.ok()) {
      if (revalidate) {
        await revalidate();
      }
      await Navigate(`/${role}/payruns`);
    }
  };
  return isOverlap ? (
    <div className={"flex-co flex w-full items-start"}>
      <Label>{t("pay_run_overlap_error")}</Label>
      <div
        className={
          "my-10 flex items-center justify-end gap-5 rtl:flex-row-reverse"
        }
      >
        <Button
          type={"button"}
          onClick={() => {
            setLoading(true);
            onSubmit({ ...formData, force_create: 1 }).then((res) => {
              if (res.ok()) {
                onSuccess(res).then(() => {
                  setLoading(false);
                  setOverlap(false);
                  toast.success(res.message as string);
                });
              }
            });
          }}
        >
          {isLoading ? <LoadingSpin /> : <TranslatableEnum value={"yes"} />}
        </Button>
        <Button
          type={"button"}
          variant={"destructive"}
          onClick={() => {
            setOverlap(false);
          }}
        >
          <TranslatableEnum value={"no"} />
        </Button>
      </div>
    </div>
  ) : (
    <Form handleSubmit={onSubmit} onSuccess={onSuccess}>
      <Grid md={2}>
        <FormDatepicker name={"from"} label={t("from")} required={true} />
        <FormDatepicker name={"to"} label={t("to")} required={true} />
      </Grid>
    </Form>
  );
};

export default PayrunForm;
