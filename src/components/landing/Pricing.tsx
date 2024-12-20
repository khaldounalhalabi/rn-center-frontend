import AuthSubmitButton from "../common/Auth/Customer/AuthSubmitButton";
import FeaturedBadgeIcon from "../icons/FeaturedBadgeIcon";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const Pricing = async () => {
  const t = await getTranslations("landing");
  const data = [
    {
      title: t("1_month"),
      price: "35,000",
      discount: undefined,
      features: [
        t("1_month_full_access"),
        t("1_month_unlimited_appointments"),
        t("1_month_support"),
      ],
      featured: false,
    },
    {
      title: t("3_month"),
      price: "95,000",
      discount: "-10,000",
      features: [
        t("3_month_full_access"),
        t("3_month_unlimited_appointments"),
        t("3_month_support"),
      ],
      featured: true,
    },
    {
      title: t("6_month"),
      price: "180,000",
      discount: "-30,000",
      features: [
        t("6_month_full_access"),
        t("6_month_unlimited_appointments"),
        t("6_month_support"),
      ],
      featured: false,
    },
  ];
  return (
    <div
      id={"pricing"}
      className="w-full my-5 flex justify-center pricing-curv"
    >
      <div className={"w-[65%] h-full"}>
        <h1 className={"text-[24px] font-bold mb-10 text-center"}>
          {t("pricing")}
        </h1>
        <div
          className={
            "flex h-[75%] flex-col md:flex-row items-center gap-[5%] justify-between w-full"
          }
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex h-full flex-col justify-center items-center rounded-md shadow-md p-10 bg-white pricing-card-shadow mt-5 md:mt-0"
            >
              <h1 className="text-center font-bold text-[20px] my-3 text-[#013567]">
                {item.title}{" "}
                {item.discount ? (
                  <span className="text-[8px] text-gray-400">
                    {item.discount} {t("iqd")}
                  </span>
                ) : (
                  ""
                )}
              </h1>
              <h2 className="text-[20px] text-[#013567] font-thin">
                {item.price} {t("iqd")}{" "}
                <span className="text-[#D9D9D9] text-[14px]">/ {t("mo")}</span>
              </h2>

              <ul className="my-5 list-disc">
                {item.features?.map((li, index) => (
                  <li
                    key={index}
                    className="font-extralight text-[14px] my-2 text-[#6685A3]"
                  >
                    {li}
                  </li>
                ))}
              </ul>

              {item.featured ? (
                <AuthSubmitButton type="button" className={"px-10 py-1"}>
                  {t("start")}
                </AuthSubmitButton>
              ) : (
                <Link href={"/#start"}>
                  <button
                    type="button"
                    className="rounded-full text-[#2ECBCC] border border-[#2ECBCC] text-[14px] px-10 py-1 hover:bg-gradient-to-r hover:from-[#5DE8E9] hover:to-[#2CCACB] hover:text-white"
                  >
                    {t("start")}
                  </button>
                </Link>
              )}

              {item.featured ? (
                <div className="mt-3 flex items-center justify-center">
                  <FeaturedBadgeIcon />
                  <span className="text-gray-400 text-[8px]">
                    {t("recommended")}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
