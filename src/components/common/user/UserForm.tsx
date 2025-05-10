"use client";
import React, { useState } from "react";
import { Navigate } from "@/actions/navigate";
import { useTranslations } from "next-intl";
import Dialog from "@/components/common/ui/Dialog";
import Form from "@/components/common/ui/Form";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Grid from "@/components/common/ui/Grid";
import GenderEnum from "@/enum/GenderEnum";
import { UserService } from "@/services/UserService";
import { User } from "@/Models/User";

const UserForm = ({
  type,
  user = undefined,
}: {
  type: "store" | "update";
  user?: User;
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

  const onSuccess = () => {
    Navigate(`/admin/secretaries`);
  };

  const t = useTranslations("details");
  return (
    <>
      <Dialog open={isOpen}>
        <Form
          handleSubmit={handleSubmit}
          onSuccess={onSuccess}
          defaultValues={user}
        >
          <h1 className={"label"}>{t("resetPassword")}</h1>
          <FormInput
            placeholder={"Password...  "}
            name={"password"}
            label={t("password")}
            type="password"
          />
          <FormInput
            placeholder={"Confirmation...  "}
            name={"password_confirmation"}
            label={t("confirm-password")}
            type="password"
          />
        </Form>
      </Dialog>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={user}
      >
        <Grid md={"2"}>
          <FormInput
            type={"text"}
            placeholder={"John"}
            label={t("first-Name")}
            name={"first_name"}
          />

          <FormInput
            type={"text"}
            placeholder={"John"}
            label={t("last-name")}
            name={"last_name"}
          />
          <FormInput
            placeholder={"0912345678"}
            name={"phone"}
            label={t("phone")}
            type="tel"
          />
          <div
            className={`flex flex-col md:flex-row gap-5 py-11 px-2 md:items-center`}
          >
            <label className={`bg-pom p-2 rounded-md text-white`}>
              {t("gender")}:
            </label>
            <FormInput
              name={"gender"}
              label={t("male")}
              type="radio"
              className="radio radio-info"
              value={GenderEnum.MALE}
              defaultChecked={user?.gender == GenderEnum.MALE}
            />

            <FormInput
              name={"gender"}
              label={t("female")}
              type="radio"
              className="radio radio-info"
              value={GenderEnum.FEMALE}
              defaultChecked={user?.gender == GenderEnum.FEMALE}
            />
          </div>
          {type == "update" ? (
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              {t("resetPassword")}
            </button>
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
          )}
        </Grid>
      </Form>
    </>
  );
};

export default UserForm;
