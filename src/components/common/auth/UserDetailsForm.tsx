"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/inputs/Input";
import { Navigate } from "@/Actions/navigate";
import { User } from "@/Models/User";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/UserHook";
import Dialog from "@/components/common/ui/Dialog";
import GenderEnum from "@/enum/GenderEnum";

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
      <Dialog open={isOpen}>
        <Form handleSubmit={handleSubmit} onSuccess={onSuccess}>
          <h1 className={"label"}>{t("resetPassword")}</h1>
          <Input
            placeholder={"Password...  "}
            name={"password"}
            label={t("password")}
            type="password"
          />
          <Input
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
        defaultValues={defaultValues}
      >
        <Grid md={"2"}>
          <Input
            type={"text"}
            placeholder={"John"}
            label={t("first-Name")}
            name={"first_name"}
          />

          <Input
            type={"text"}
            placeholder={"John"}
            label={t("last-name")}
            name={"last_name"}
          />
          <Input
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
            <Input
              name={"gender"}
              label={t("male")}
              type="radio"
              className="radio radio-info"
              value={GenderEnum.MALE}
              defaultChecked={defaultValues?.gender == GenderEnum.MALE}
            />

            <Input
              name={"gender"}
              label={t("female")}
              type="radio"
              className="radio radio-info"
              value={GenderEnum.FEMALE}
              defaultChecked={defaultValues?.gender == GenderEnum.FEMALE}
            />
          </div>
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
