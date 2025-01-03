import Providers from "@/app/[locale]/providers";
import Nav from "@/components/landing/Nav";
import { getTranslations } from "next-intl/server";
import CheckAppointmentForm from "@/components/landing/CheckAppointmentForm";
import Footer from "@/components/landing/Footer";

const Page = async () => {
  const t = await getTranslations("landing");
  const navItems = [
    {
      title: t("home"),
      link: "/#home",
    },
    {
      link: "#footer",
      title: t("contact_us"),
    },
  ];
  return (
    <Providers>
      <div
        className={
          " text-[#013567] relative overflow-x-hidden md:px-0 px-2 h-screen"
        }
      >
        <Nav links={navItems} />
        <div
          className={"flex justify-center items-center w-full h-[80%] my-10"}
        >
          <div className={"flex flex-col items-center gap-10"}>
            <div
              className={
                "text-center text-[#013567] text-[20px] md:text-[40px] font-bold"
              }
            >
              <p>{t("stay_informed")}</p>
              <p>
                {t("appointments_with")}{" "}
                <span className={"text-[#1FB8B9]"}>{t("pom")}</span>
              </p>
              <p>{t("using_your_booking_code")}</p>
            </div>
            <p className={"text-center max-w-[75%] text-[20px] text-[#6685A3]"}>
              {t("enter_your_booking_code")}
            </p>
            <CheckAppointmentForm />
          </div>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};
export default Page;
