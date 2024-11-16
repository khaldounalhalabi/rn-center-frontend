"use client";

import AuthSubmitButton from "../common/Auth/Customer/AuthSubmitButton";
import FeaturedBadgeIcon from "../icons/FeaturedBadgeIcon";

const Pricing = () => {
  const data = [
    {
      title: "1 Month",
      price: "35,000",
      discount: undefined,
      features: [
        "Full access to all clinics management tools",
        "Unlimited appointments and billing",
        "24/7 Support",
      ],
      featured: false,
    },
    {
      title: "3 Month",
      price: "95,000",
      discount: "-10,000",
      features: [
        "Full access to all clinics management tools",
        "Unlimited appointments and billing",
        "24/7 Support",
      ],
      featured: true,
    },
    {
      title: "6 Month",
      price: "180,000",
      discount: "-30,000",
      features: [
        "Full access to all clinics management tools",
        "Unlimited appointments and billing",
        "24/7 Support",
      ],
      featured: false,
    },
  ];
  return (
    <div className="w-full my-5 flex justify-center pricing-curv">
      <div className={"w-[68%]"}>
        <h1 className={"text-[24px] font-bold mb-10 text-center"}>Pricing</h1>
        <div className={"flex flex-col md:flex-row items-centerv gap-2 justify-around w-full"}>
          {data.map((item, index) => (
            <div
              key={index}
              className="md:w-[25%] flex flex-col justify-center items-center rounded-md shadow-md p-10 bg-white"
            >
              <h1 className="text-center font-bold text-[20px] my-3 text-[#013567]">
                {item.title}{" "}
                {item.discount ? (
                  <span className="text-[8px] text-gray-400">
                    {item.discount} IQD
                  </span>
                ) : (
                  ""
                )}
              </h1>
              <h2 className="text-[20px] text-[#013567] font-thin">
                {item.price} IQD{" "}
                <span className="text-[#D9D9D9] text-[14px]">/ mo</span>
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
                <AuthSubmitButton type="button">Start</AuthSubmitButton>
              ) : (
                <button
                  type="button"
                  className="rounded-full text-[#2ECBCC] border border-[#2ECBCC] text-[14px] px-12 py-3 hover:bg-gradient-to-r hover:from-[#5DE8E9] hover:to-[#2CCACB] hover:text-white"
                >
                  Start
                </button>
              )}

              {item.featured ? (
                <div className="mt-3 flex items-center justify-center">
                  <FeaturedBadgeIcon />
                  <span className="text-gray-400 text-[8px]">Recommended</span>
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
