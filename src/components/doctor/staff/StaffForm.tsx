"use client";
import Form from "@/components/common/ui/Form";
import React, { Fragment, useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Input from "@/components/common/ui/Inputs/Input";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import ImageUploader from "@/components/common/ui/ImageUploader";
import Gallery from "@/components/common/ui/Gallery";
import { StaffService } from "@/services/StaffService";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { CityService } from "@/services/CityService";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { User } from "@/Models/User";
import { Dialog, Transition } from "@headlessui/react";
import PermissionsDoctorArray, { PermissionsDoctor } from "@/enum/Permissions";
import { getCookieClient, setCookieClient } from "@/Actions/clientCookies";
import { useTranslations } from "next-intl";

interface PermissionsType {
  "edit-clinic-profile": boolean;
  "manage-medicines": boolean;
  "manage-patients": boolean;
  "manage-offers": boolean;
  "manage-services": boolean;
  "manage-schedules": boolean;
  "manage-holidays": boolean;
  "manage-employees": boolean;
  "show-clinic-profile"?: boolean;
  "manage-appointments": boolean;
  "accountant-management": boolean;
}

function comparePermissions(a: string[], b: string[]): PermissionsType {
  const permissions: PermissionsType = {
    "manage-schedules": false,
    "manage-holidays": false,
    "manage-services": false,
    "manage-offers": false,
    "manage-patients": false,
    "manage-medicines": false,
    "manage-appointments": false,
    "edit-clinic-profile": false,
    "show-clinic-profile": false,
    "manage-employees": false,
    "accountant-management": false,
  };
  a.forEach((item: string) => {
    if (b.includes(item)) {
      // @ts-ignore
      permissions[item] = true;
    }
  });
  b.forEach((item) => {
    if (a.includes(item)) {
      // @ts-ignore
      permissions[item] = true;
    }
  });

  return permissions;
}

const StaffForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: { user?: User; phone_numbers?: string[] };
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("doctor.staff.create");
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.user?.id != undefined || id != undefined)
    ) {
      return StaffService.make<StaffService>("doctor").update(id, data);
    } else {
      return await StaffService.make<StaffService>("doctor").store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/doctor/staff`);
  };
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [errorPermissions, setErrorPermissions] = useState("");
  const handleSubmitPermissions = async (data: PermissionsType) => {
    // @ts-ignore
    const permissions = Object.keys(data).filter((key) => data[key]);
    const dataSend = {
      permissions: permissions,
    };
    return await StaffService.make<StaffService>("doctor")
      .updateEmployeePermissions(id ?? 0, dataSend)
      .then((res) => {
        if (res.code == 405) {
          // @ts-ignore
          setErrorPermissions(res?.message?.errors?.permissions);
        }
        setCookieClient("permissions", permissions.toString());
        return res;
      });
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { image, ...res } = defaultValues?.user ?? { image: "" };
  const role = getCookieClient("role");
  const defPermissions = comparePermissions(
    PermissionsDoctorArray(),
    defaultValues?.user?.permissions ?? [""]
  );
  const formValues = {
    phone_numbers: defaultValues?.phone_numbers ?? [],
    ...res,
  };

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
                  <Form
                    handleSubmit={handleSubmitPermissions}
                    onSuccess={() => closeModal()}
                    defaultValues={defPermissions}
                  >
                    <h1 className={"card-title"}>{t("setPermissions")} : </h1>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>
                        {t("editClinicProfile")}
                      </label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.EDIT_CLINIC_PROFILE}
                          type="checkbox"
                          className="checkbox checkbox-info "
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("manageMedicines")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_MEDICINES}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("managePatients")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_PATIENTS}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("manageOffers")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_OFFERS}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("manageServices")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_SERVICE}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("manageSchedules")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANGE_SCHEDULES}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("manageHolidays")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_HOLIDAYS}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>{t("manageEmployees")}</label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_EMPLOYEES}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>
                        {t("manageAppointments")}
                      </label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.MANAGE_APPOINTMENTS}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    <div className={"flex w-full pl-2 my-3 justify-between text-start"}>
                      <label className={"w-2/3"}>
                        {t("accountantManagement")}
                      </label>
                      <div className={"w-1/3"}>
                        <Input
                          name={PermissionsDoctor.ACCOUNTANT_MANAGEMENT}
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                      </div>
                    </div>
                    {errorPermissions ? (
                      <p className={"p-4 text-error"}>{errorPermissions}</p>
                    ) : (
                      ""
                    )}
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
        defaultValues={formValues}
        setLocale={setLocale}
      >
        <Grid md={"2"}>
          <TranslatableInput
            required={true}
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("first-Name")}
            name={"first_name"}
            locale={locale}
          />
          <TranslatableInput
            required={true}
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("middle-name")}
            name={"middle_name"}
            locale={locale}
          />
          <TranslatableInput
            required={true}
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("last-name")}
            name={"last_name"}
            locale={locale}
          />

          <Input
            required={true}
            name={"email"}
            type={"text"}
            step={"any"}
            placeholder={`Email ...`}
            label={t("email")}
          />
          <Input
            required={true}
            name={"password"}
            type={"text"}
            step={"any"}
            placeholder={"password : "}
            label={t("password")}
          />
          <Input
            required={true}
            name={"password_confirmation"}
            type={"text"}
            step={"any"}
            placeholder={"password confirmation : "}
            label={t("confirm-password")}
          />
          <Datepicker name={"birth_date"} label={t("birth-date")} />
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
                defaultValues?.user?.gender
                  ? defaultValues?.user?.gender == "male"
                  : true
              }
            />

            <Input
              name={"gender"}
              label={t("female")}
              type="radio"
              className="radio radio-info"
              value={"female"}
              defaultChecked={defaultValues?.user?.gender == "female"}
            />
          </div>
          <TranslatableInput
            locales={["en", "ar"]}
            type={"text"}
            placeholder={"John"}
            label={t("address")}
            name={"address.name"}
            locale={locale}
          />
          <ApiSelect
            name={"address.city_id"}
            label={t("city")}
            placeHolder={"Select City Name ..."}
            api={(page?: number | undefined, search?: string | undefined) =>
              CityService.make<CityService>().getAllCities(page, search)
            }
            getOptionLabel={(item) => TranslateClient(item.name)}
            optionValue={"id"}
            defaultValues={
              defaultValues?.user?.address?.city
                ? [defaultValues?.user?.address?.city]
                : []
            }
          />
        </Grid>

        <MultiInput
          type={"tel"}
          name={"phone_numbers"}
          placeholder={"Enter Clinic Phone Number"}
          label={t("phones")}
          required={true}
        />

        {type == "update" ? (
          defaultValues?.user?.image &&
          defaultValues?.user?.image?.length > 0 ? (
            <Gallery
              media={
                defaultValues?.user?.image ? defaultValues?.user?.image : [""]
              }
            />
          ) : (
            <div className="flex justify-between items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">{"No Image"}</span>
            </div>
          )
        ) : (
          ""
        )}
        <ImageUploader name={"image"} label={t("icon")} />
        {type == "update" && role != "clinic-employee" ? (
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            {t("setPermissions")}
          </button>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default StaffForm;
