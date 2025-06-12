"use client";
import React, { useState } from "react";
import PayrunService from "@/services/PayrunService";
import { ApiResponse } from "@/http/Response";
import Payrun from "@/models/Payrun";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/shadcn/button";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { toast } from "sonner";
import Grid from "@/components/common/ui/Grid";
import { Label } from "@/components/ui/shadcn/label";
import LoadingSpin from "@/components/icons/LoadingSpin";

const PayrunForm = ({revalidate}:{revalidate?:() => void}) => {
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
    if (!data?.force_create){
      data.force_create = 0;
    }
    
    const response = await PayrunService.make().store(data);
    if (response.code == 410) {
      setOverlap(true);
      setFormData({ ...data, force_create: 0 });
    }

    return response;
  };

  const onSuccess = async (response: ApiResponse<Payrun>) => {
    if (response.ok()) {
      if (revalidate){
        revalidate();
      }
      await Navigate("/admin/payruns");
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
