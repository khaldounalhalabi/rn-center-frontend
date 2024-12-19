import { AppointmentService } from "@/services/AppointmentService";
import { Navigate } from "@/Actions/navigate";
import Nav from "@/components/landing/Nav";
import Providers from "@/app/[locale]/providers";
import TranslateServer from "@/Helpers/TranslationsServer";
import { getLocale, getTranslations } from "next-intl/server";
import dayjs from "dayjs";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatus";
import { Link } from "@/navigation";
import ArrowRight from "@/components/icons/ArrowRight";
import Footer from "@/components/landing/Footer";
import React from "react";

const Page = async ({ params: { code } }: { params: { code: string } }) => {
  const navItems = [
    {
      title: "Home",
      link: "/#home",
    },
    {
      link: `/check-appointment/${code}/#footer`,
      title: "Contact us",
    },
  ];
  const t = await getTranslations("landing");
  const locale = await getLocale();
  const appointment = (
    await AppointmentService.make<AppointmentService>("public").getByCode(code)
  ).data;
  if (!appointment) {
    await Navigate("404");
  }
  return (
    <Providers>
      <div
        className={
          "kodchasan text-[#013567] relative overflow-x-hidden md:px-0 px-2 h-screen"
        }
      >
        <Nav links={navItems} />
        <div className={"flex justify-center items-center w-full my-10"}>
          <div className={"w-[80%] md:w-[60%]"}>
            <p className={"text-[#013567] text-[16px] text-start w-full"}>
              {`#${appointment.appointment_unique_code}`}
            </p>
            <p className="text-start text-[20px] text-[#013567] font-bold">
              {t("appointment_from")} {locale == "ar" && t("clinic")}{" "}
              {await TranslateServer(appointment?.clinic?.name)}{" "}
              {locale == "en" && t("clinic")}
              <span className={"!text-[#6685A3] text-[14px] font-thin"}>
                {" "}
                {t("dr")}
                {await TranslateServer(
                  appointment?.clinic?.user?.first_name,
                )}{" "}
                {await TranslateServer(appointment?.clinic?.user?.last_name)}
              </span>
            </p>
            <div
              className={
                "flex md:w-[74%] flex-col md:flex-row items-center my-10"
              }
            >
              <div
                className={`w-1/2 md:w-[18.75%] aspect-square rounded-full mx-auto ${appointment?.last_booked_log ? "active-circle" : "inactive-circle"} flex items-center justify-center`}
              >
                {appointment?.last_booked_log ? (
                  <div className={"flex flex-col items-center gap-2"}>
                    <p className={"text-[20px] font-bold "}>{t("booked")}</p>
                    <p className={"text-[#6685A3] text-[12px]"}>
                      {dayjs(appointment.last_booked_log?.happen_in).format(
                        "DD/MM/YYYY",
                      )}
                    </p>
                    <p className={"text-[#6685A3] text-[12px]"}>
                      {dayjs(appointment.last_booked_log?.happen_in).format(
                        "hh:mm A",
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={"flex flex-col items-center gap-2"}>
                    <p className={"text-[20px] text-gray-300 font-bold"}>
                      {t("booked")}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex h-10 md:h-0.5 md:flex-1 border-l-2 border-t-0 md:border-t-2 md:border-l-0 border-dashed border-gray-500"></div>

              <div
                className={`w-1/2 md:w-[18.75%] aspect-square rounded-full mx-auto ${appointment?.last_check_in_log && appointment.status != AppointmentStatusEnum.BOOKED ? "active-circle" : "inactive-circle"} flex items-center justify-center`}
              >
                {appointment?.last_check_in_log &&
                appointment.status != AppointmentStatusEnum.BOOKED ? (
                  <div className={"flex flex-col items-center gap-2"}>
                    <p className={"text-[20px] font-bold "}>{t("checkin")}</p>
                    <p className={"text-[#6685A3] text-[12px]"}>
                      {dayjs(appointment.last_check_in_log?.happen_in).format(
                        "DD/MM/YYYY",
                      )}
                    </p>
                    <p className={"text-[#6685A3] text-[12px]"}>
                      {dayjs(appointment.last_check_in_log?.happen_in).format(
                        "hh:mm A",
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={"flex flex-col items-center gap-2"}>
                    <p className={"text-[20px] text-gray-300 font-bold"}>
                      {t("checkin")}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex h-10 md:h-0.5 md:flex-1 border-l-2 border-t-0 md:border-t-2 md:border-l-0 border-dashed border-gray-500"></div>

              {appointment?.status != AppointmentStatusEnum.CANCELLED ? (
                <div
                  className={`w-1/2 md:w-[18.75%] aspect-square rounded-full mx-auto ${
                    appointment?.last_check_out_log &&
                    appointment.status != AppointmentStatusEnum.CHECKIN &&
                    appointment.status != AppointmentStatusEnum.BOOKED
                      ? "active-circle"
                      : "inactive-circle"
                  } flex items-center justify-center`}
                >
                  {appointment?.last_check_out_log &&
                  appointment.status != AppointmentStatusEnum.CHECKIN &&
                  appointment.status != AppointmentStatusEnum.BOOKED ? (
                    <div className={"flex flex-col items-center gap-2"}>
                      <p className={"text-[20px] font-bold "}>
                        {t("completed")}
                      </p>
                      <p className={"text-[#6685A3] text-[12px]"}>
                        {dayjs(
                          appointment.last_check_out_log?.happen_in,
                        ).format("DD/MM/YYYY")}
                      </p>
                      <p className={"text-[#6685A3] text-[12px]"}>
                        {dayjs(
                          appointment.last_check_out_log?.happen_in,
                        ).format("hh:mm A")}
                      </p>
                    </div>
                  ) : (
                    <div className={"flex flex-col items-center gap-2"}>
                      <p className={"text-[20px] text-gray-300 font-bold"}>
                        {t("completed")}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`w-1/2 md:w-[18.75%] aspect-square rounded-full mx-auto cancelled-circle flex items-center justify-center`}
                >
                  <div className={"flex flex-col items-center gap-2"}>
                    <p className={"text-[20px] font-bold "}>{t("cancelled")}</p>
                    <p className={"text-[#6685A3] text-[12px]"}>
                      {dayjs(appointment.last_cancelled_log?.happen_in).format(
                        "DD/MM/YYYY",
                      )}
                    </p>
                    <p className={"text-[#6685A3] text-[12px]"}>
                      {dayjs(appointment.last_cancelled_log?.happen_in).format(
                        "hh:mm A",
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`flex flex-col items-center my-10 border border-[#F2F1F9] rounded-xl w-full py-8 gap-2 ${locale == "ar" ? "pl-2" : "pr-2"}`}
            >
              {(appointment.status == AppointmentStatusEnum.CHECKOUT ||
                appointment.status == AppointmentStatusEnum.CANCELLED) && (
                <div className={`flex items-center gap-2 w-full justify-start`}>
                  <div
                    className={`border-r-4 border-[#1FB8B9] rounded-r-3xl ${appointment.status == AppointmentStatusEnum.CHECKOUT ? "h-6" : "h-8"}`}
                  ></div>
                  <p className={"text-[16px] text-[#013567] font-semibold"}>
                    {appointment.status == AppointmentStatusEnum.CHECKOUT
                      ? t("appointment_completed")
                      : t("appointment_cancelled")}
                    <span className={"text-red-600"}>❤</span>
                  </p>
                </div>
              )}
              <div className={`flex items-center gap-2 w-full justify-start`}>
                <div
                  className={"border-r-4 border-[#1FB8B9] rounded-r-3xl h-6"}
                ></div>
                <p className={"text-[12px] md:text-[16px] text-[#013567]"}>
                  {t("appointment_date")} : {appointment.date ?? 0}
                </p>
              </div>
              <div className={`flex items-center gap-2 w-full justify-start`}>
                <div
                  className={"border-r-4 border-[#1FB8B9] rounded-r-3xl h-6"}
                ></div>
                <p className={"text-[12px] md:text-[16px] text-[#013567]"}>
                  {t("booking_serial_number")} :{" "}
                  {appointment.appointment_sequence ?? 0}
                </p>
              </div>
              {appointment.status != AppointmentStatusEnum.CHECKOUT &&
                appointment.status != AppointmentStatusEnum.CANCELLED && (
                  <div
                    className={`flex items-center gap-2 w-full justify-start`}
                  >
                    <div
                      className={
                        "border-r-4 border-[#1FB8B9] rounded-r-3xl h-6"
                      }
                    ></div>
                    <p className={"text-[12px] md:text-[16px] text-[#013567]"}>
                      {t("appointments_left_until_yours")} :{" "}
                      {appointment.before_appointments_count ?? 0}
                    </p>
                  </div>
                )}
              <div className={`flex items-center gap-2 w-full justify-start`}>
                <div
                  className={"border-r-4 border-[#1FB8B9] rounded-r-3xl h-6"}
                ></div>
                <p className={"text-[12px] md:text-[16px] text-[#013567]"}>
                  {appointment.status == AppointmentStatusEnum.CANCELLED ? (
                    <>
                      {t("cancellation_reason")}
                      {": "}
                      {appointment.last_cancelled_log?.cancellation_reason ??
                        ""}
                    </>
                  ) : (
                    <>
                      {" "}
                      {t("approximate_waiting_time")}
                      {": "}
                      {appointment.remaining_time?.split(",")?.[0] ?? ""}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className={"my-10"}>
              <Link href={"/check-appointment"}>
                <p
                  className={
                    "text-[#1FB8B9] text-[14px] hover:underline flex items-center gap-2"
                  }
                >
                  {t("track_another_appointment")}{" "}
                  <ArrowRight className={"h-3 w-3"} />
                </p>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};
export default Page;
