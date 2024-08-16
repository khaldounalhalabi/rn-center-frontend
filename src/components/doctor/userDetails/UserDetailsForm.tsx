"use client";
import Form from "@/components/common/ui/Form";
import React, {Fragment, useContext, useState} from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { Navigate } from "@/Actions/navigate";
import { User } from "@/Models/User";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { AuthService } from "@/services/AuthService";
import { Dialog, Transition } from "@headlessui/react";
import Gallery from "@/components/common/ui/Gallery";
import {ReFetchPhoto} from "@/app/[locale]/providers";

const UserDetailsForm = ({ defaultValues }: { defaultValues: User }) => {
  const {reFetch,setReFetch} = useContext(ReFetchPhoto)

  const handleSubmit = async (data: any) => {
    console.log(data);
    return await AuthService.make<AuthService>("doctor")
      .UpdateUserDetails(data)
      .then((res) => {
        setReFetch(!reFetch)
        console.log(res);
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
    Navigate(`/doctor/user-details`);
  };

  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { image, ...rest } = defaultValues ?? { image: "" };
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
                    <h1 className={"label"}>Reset Password</h1>
                    <Input
                      placeholder={"Password...  "}
                      name={"password"}
                      label={"Password"}
                      type="password"
                    />
                    <Input
                      placeholder={"Confirmation...  "}
                      name={"password_confirmation"}
                      label={"Password Confirmation"}
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
            label={`First Name :`}
            name={"first_name"}
            locale={locale}
          />
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={`Middle Name :`}
            name={"middle_name"}
            locale={locale}
          />
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={`Last Name :`}
            name={"last_name"}
            locale={locale}
          />
          <Datepicker name={"birth_date"} label={"Birth Date"} />
        </Grid>
        <Input
          placeholder={"email...  "}
          name={"email"}
          label={"Email"}
          type="text"
        />

        <Grid md={"2"}>
          <div className={`flex gap-5 p-2 items-center`}>
            <label className={`bg-pom p-2 rounded-md text-white`}>
              Gender:
            </label>
            <Input
              name={"gender"}
              label={"Male"}
              type="radio"
              className="radio radio-info"
              value={"male"}
              defaultChecked={
                defaultValues?.gender ? defaultValues?.gender == "male" : true
              }
            />

            <Input
              name={"gender"}
              label={"Female"}
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
                  media={defaultValues?.image ? defaultValues?.image : []}
              />
          ) : (
              <div className="flex items-center">
                <label className="label"> Image : </label>
                <span className="text-lg badge badge-neutral">No Data</span>
              </div>
          )}
        </div>
        <ImageUploader name={"image"} label={'Image'}/>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Reset Password
        </button>
      </Form>
    </>
  );
};

export default UserDetailsForm;