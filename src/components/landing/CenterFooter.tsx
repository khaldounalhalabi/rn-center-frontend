import AppointmentLandingIcon from "@/components/icons/AppointmentLandingIcon";
import TrackLandingIcon from "@/components/icons/TrackLandingIcon";
import TimeLandingIcon from "@/components/icons/TimeLandingIcon";
import { getTranslations } from "next-intl/server";

const CenterFooter = async () => {
  const t = await getTranslations("landing");
  return (
    <div
      className={
        "w-full py-16 flex flex-col gap-12 items-center bg-gradient-to-r from-[#e3f4f4] to-[#e0eff0]"
      }
    >
      <div
        className={"flex flex-col justify-center md:items-center h-1/2 w-full"}
      >
        <h2 className={"md:text-[35px] text-center text-[22px] font-bold "}>
          {t("features_services")}
        </h2>
      </div>
      <div
        className={
          "justify-around items-center h-full mx-8 w-full flex flex-col gap-5 md:flex-row pb-6"
        }
      >
        <div className={"flex flex-col gap-5 h-full items-center"}>
          <AppointmentLandingIcon />
          <h2 className={"text-[20px] font-bold"}>
            {t("appointment_management")}
          </h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>{t("easley_schedule")}</p>
            <p>{t("optimize_your_patients")}</p>
          </div>
        </div>
        <div className={"flex flex-col items-center gap-5 h-full"}>
          <TrackLandingIcon />
          <h2 className={"text-[20px] font-bold"}>{t("billing_invoicing")}</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>{t("streamline_financials")}</p>
            <p>{t("easy_billing")}</p>
          </div>
        </div>
        <div className={"flex flex-col items-center gap-5 h-full"}>
          <TimeLandingIcon />
          <h2 className={"text-[20px] font-bold"}>{t("patient_records")}</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>{t("access_records")}</p>
            <p>{t("securely")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterFooter;
