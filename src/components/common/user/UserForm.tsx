"use client";
import React, { useState } from "react";
import { Navigate } from "@/actions/Navigate";
import { useTranslations } from "next-intl";
import DialogPopup from "@/components/common/ui/DialogPopup";
import Form from "@/components/common/ui/Form";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Grid from "@/components/common/ui/Grid";
import GenderEnum from "@/enums/GenderEnum";
import { UserService } from "@/services/UserService";
import { User } from "@/models/User";
import Radio from "@/components/common/ui/inputs/Radio";
import { getEnumValues } from "@/helpers/Enums";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Button } from "@/components/ui/shadcn/button";
import { ApiResponse } from "@/http/Response";
import { RoleEnum } from "@/enums/RoleEnum";
import FormulaService from "@/services/FormulaService";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";

const UserForm = ({
  type,
  user = undefined,
  role = undefined,
}: {
  type: "store" | "update";
  user?: User;
  role?: RoleEnum;
}) => {
  const handleSubmit = async (data: any) => {
    const service = UserService.make();
    if (type == "update") {
      return await service.update(user?.id, data);
    }
    return await service.storeSecretary(data);
  };

  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const onSuccess = async (res: ApiResponse<User>) => {
    if (res.ok()) {
      await Navigate(`/admin/secretaries`);
    }
  };

  const t = useTranslations("details");
  return (
    <>
      <DialogPopup open={isOpen} title={t("resetPassword")} onClose={()=> setIsOpen(false)}>
        <Form
          handleSubmit={handleSubmit}
          onSuccess={onSuccess}
          defaultValues={user}
        >
          <FormInput name={"password"} label={t("password")} type="password" />
          <FormInput
            name={"password_confirmation"}
            label={t("confirm-password")}
            type="password"
          />
        </Form>
      </DialogPopup>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={user}
      >
        <Grid md={"2"}>
          <FormInput
            type={"text"}
            label={t("first-Name")}
            name={"first_name"}
          />

          <FormInput type={"text"} label={t("last-name")} name={"last_name"} />
          <FormInput name={"phone"} label={t("phone")} type="tel" />
          <Radio
            name={"gender"}
            options={getEnumValues(GenderEnum).map((i) => ({
              label: <TranslatableEnum value={i} />,
              value: i,
            }))}
            label={t("gender")}
            defaultChecked={user?.gender ?? GenderEnum.MALE}
          />
          {role == RoleEnum.SECRETARY && (
            <ApiSelect
              api={(page, search) =>
                FormulaService.make().indexWithPagination(page, search)
              }
              name={"formula_id"}
              label={t("formula")}
              optionLabel={"name"}
              optionValue={"id"}
              defaultValues={user?.formula ? [user?.formula] : []}
            />
          )}
        </Grid>
        <div className={"flex justify-end"}>{type == "update" ? (
          <Button type="button" onClick={openModal}>
            {t("resetPassword")}
          </Button>
        ) : (
          <>
            <FormInput
              type={"password"}
              name={"password"}
              label={t("password")}
            />
            <FormInput
              type={"password"}
              name={"password_confirmation"}
              label={t("confirm-password")}
            />
          </>
        )}</div>
      </Form>
    </>
  );
};

export default UserForm;
