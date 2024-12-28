"use client";
import Form from "@/components/common/ui/Form";
import React, { Fragment, useContext, useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { Navigate } from "@/Actions/navigate";
import { User } from "@/Models/User";
import { CityService } from "@/services/CityService";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import Textarea from "@/components/common/ui/textArea/Textarea";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { AuthService } from "@/services/AuthService";
import { Dialog, Transition } from "@headlessui/react";
import Gallery from "@/components/common/ui/Gallery";
import { ReFetchPhoto } from "@/app/[locale]/providers";
import { useTranslations } from "next-intl";

const UserDetailsForm = ({ defaultValues }: { defaultValues: User }) => {
  const { reFetch, setReFetch } = useContext(ReFetchPhoto);

  const handleSubmit = async (data: any) => {
    return await AuthService.make<AuthService>("admin")
      .UpdateUserDetails(data)
      .then((res) => {
        setReFetch(!reFetch);
        window.localStorage.setItem(
          "user",
          // @ts-ignore
          JSON.stringify(res?.data.user ?? undefined)
        );
        return res;
      });
  };
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSuccess = () => {
    Navigate(`/admin/user-details`);
  };
  const t = useTranslations("details");
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { image, ...rest } = defaultValues;
  // @ts-ignore
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={rest}
        setLocale={setLocale}
      >
        <Grid md={"2"}>
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("first-Name")}
            name={"first_name"}
            locale={locale}
          />
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("middle-name")}
            name={"middle_name"}
            locale={locale}
          />
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("last-name")}
            name={"last_name"}
            locale={locale}
          />
          <Datepicker name={"birth_date"} label={t("birthDate")} />
        </Grid>
        <Input
          placeholder={"email...  "}
          name={"email"}
          label={t("email")}
          type="text"
        />
        <MultiInput
          type={"tel"}
          name={"phone_numbers"}
          placeholder={"Enter Clinic Phone Number"}
          label={t("phone")}
        />
        <Grid md={"2"}>
          <div className={`flex gap-5 p-2 items-center`}>
            <label className={`bg-pom p-2 rounded-md text-white`}>
              {t("gender")}:
            </label>
            <Input
              name={"gender"}
              label={t("male")}
              type="radio"
              className="radio radio-info"
              value={"male"}
              defaultChecked={
                defaultValues?.gender ? defaultValues?.gender == "male" : true
              }
            />

            <Input
              name={"gender"}
              label={t("female")}
              type="radio"
              className="radio radio-info"
              value={"female"}
              defaultChecked={defaultValues?.gender == "female"}
            />
          </div>
        </Grid>
        <div className={"col-span-2"}>
          {defaultValues?.image?.length != 0 ? (
            <Gallery
              media={defaultValues?.image ? defaultValues?.image : [""]}
            />
          ) : (
            <div className="flex items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">
                {t("noImage")}
              </span>
            </div>
          )}
        </div>
        <ImageUploader name={"image"} label={t("image")} />
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
