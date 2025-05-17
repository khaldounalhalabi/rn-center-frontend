"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Navigate } from "@/actions/Navigate";
import { User } from "@/models/User";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/UserHook";
import DialogPopup from "@/components/common/ui/DialogPopup";
import GenderEnum from "@/enums/GenderEnum";
import Radio from "@/components/common/ui/inputs/Radio";
import { getEnumValues } from "@/helpers/Enums";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";

const UserDetailsForm = ({ defaultValues }: { defaultValues: User }) => {
  const { role, setUser } = useUser();

  const handleSubmit = async (data: any) => {
    return await AuthService.make<AuthService>(role)
      .updateUserDetails(data)
      .then((res) => {
        if (res.ok()) {
          setUser(res.data.user);
        }
        return res;
      });
  };
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const onSuccess = () => {
    Navigate(`/${role}/user-details`);
  };

  const t = useTranslations("details");
  return (
    <>
      <DialogPopup
        open={isOpen}
        onClose={() => setIsOpen((prevState) => !prevState)}
      >
        <Form handleSubmit={handleSubmit} onSuccess={onSuccess}>
          <h1 className={"label"}>{t("resetPassword")}</h1>
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
        defaultValues={defaultValues}
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
          />
        </Grid>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          {t("resetPassword")}
        </button>
      </Form>
    </>
  );
};

export default UserDetailsForm;
