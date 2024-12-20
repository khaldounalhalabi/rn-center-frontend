"use client";
import { Link } from "@/navigation";
import Form from "@/components/common/ui/Form";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/instaIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { EnquiriesService } from "@/services/EnquiriesService";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("landing");
  const handleSubmit = async (data: any) => {
    return await EnquiriesService.make<EnquiriesService>("public")
      .store(data)
      .then((res) => {
        return res;
      });
  };
  return (
    <div className={"md:max-h-[530px]"} id={"#footer"}>
      <div
        className={
          "md:flex-row flex-col-reverse justify-center md:justify-around items-center md:items-start h-full flex px-10 md:px-36 py-10 gap-5"
        }
      >
        <div
          className={
            " w-full md:w-1/3 flex flex-col justify-center md:items-start h-full gap-4"
          }
        >
          <h2
            className={
              "text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px] font-bold"
            }
          >
            {t("pom")}
          </h2>
          <p className="text-[#013567]">{t("all_rights_reserved")}</p>
          <div className={"flex gap-3"}>
            <Link
              href={"https://www.facebook.com/share/7Eatuaim1iVt5wHP/"}
              target={"_blank"}
            >
              <FacebookIcon />
            </Link>
            <Link
              target={"_blank"}
              href={
                "https://www.instagram.com/planetofmedicine/profilecard/?igsh=MWQyMjFsamExcXYwZg=="
              }
            >
              <InstagramIcon />
            </Link>
            <Link
              target={"_blank"}
              href={"https://wa.me/message/4LFLCAM2QQYNL1"}
            >
              <WhatsappIcon className={"h-7 w-7"} />
            </Link>
          </div>
        </div>
        <div
          className={
            " md:w-1/3 w-full h-full flex flex-col justify-center md:items-start"
          }
        >
          <div className={"flex flex-col gap-6"}>
            <h2 className={"card-title text-[#013567]"}>{t("quick_links")}</h2>
            <div className={"grid md:grid-cols-1 grid-cols-2 gap-6"}>
              <p
                className={"hover:text-[#1FB8B9] text-[#013567] cursor-pointer"}
              >
                <Link href={"/#specialities"}>{t("specialities")}</Link>
              </p>
              <p
                className={"hover:text-[#1FB8B9] cursor-pointer text-[#013567]"}
              >
                <Link href={"/#features"}>{t("features")}</Link>
              </p>
              <p
                className={"hover:text-[#1FB8B9] cursor-pointer text-[#013567]"}
              >
                <Link href={"/#pricing"}>{t("pricing")}</Link>
              </p>
              <p
                className={"hover:text-[#1FB8B9] cursor-pointer text-[#013567]"}
              >
                <Link href={"/#start"}>{t("get_started")}</Link>
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            " md:w-1/3 w-full flex flex-col justify-center md:items-start items-start"
          }
        >
          <Form
            className={"w-full max-w-[650px]"}
            handleSubmit={handleSubmit}
            submitButtonClasses="justify-start"
            otherSubmitButton={(isSubmitting) => (
              <AuthSubmitButton
                isSubmitting={isSubmitting}
                className={"py-2 px-8"}
                disabled={isSubmitting}
              >
                {t("submit")}
              </AuthSubmitButton>
            )}
            defaultButton={false}
          >
            <h2 className={"card-title"}>{t("contact_us")}</h2>
            <div className={"relative z-40 flex flex-col gap-4"}>
              <InputLoginCustomer
                type={"text"}
                name={"name"}
                label={t("name")}
              />
              <InputLoginCustomer
                type={"text"}
                name={"email"}
                label={t("email")}
              />
              <InputLoginCustomer
                type={"text"}
                name={"message"}
                label={t("message")}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
