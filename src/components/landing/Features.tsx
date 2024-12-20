"use client";
import { InView } from "react-intersection-observer";

const Features = () => {
  const features = [
    {
      imgSrc: "/tab2.png",
      iconSrc: "/nots.png",
      title: "Full patient record",
      description:
        "Access detailed patient histories, treatment plans, and notes all in one place for better care and quicker decision-making.",
    },
    {
      imgSrc: "/tab1.png",
      iconSrc: "/calender.png",
      title: "Control all appointments",
      description:
        "Easily manage patient appointments, reduce wait times, and ensure a smooth schedule with just a few clicks.",
    },
    {
      imgSrc: "/tab3.png",
      iconSrc: "/balanc.png",
      title: "Financial transactions tracking",
      description:
        "Keep track of all clinic transactions, from billing to payments, in real-time to ensure financial clarity and control.",
    },
  ];
  return (
    <div
      id="features"
      className="w-full my-6 flex flex-col items-center gap-12"
    >
      <div className="w-full flex flex-col gap-2 items-center">
        <p className="opacity-60 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]">
          Introducing some
        </p>
        <div className="text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px] flex gap-1">
          <h2 className="font-bold marker">POM</h2>
          <h3>Features</h3>
        </div>
      </div>
      <div className="flex justify-center items-center w-[65%]">
        <div className="w-full flex flex-col gap-12 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]">
          {features.map((feature, index) => (
            <InView key={index} triggerOnce={true} threshold={0.8}>
              {({ inView, ref, entry }) => (
                <div
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  ref={ref}
                >
                  <img
                    src={feature.imgSrc}
                    alt=".."
                    className={`block object-contain w-full md:w-[40%] transition-transform duration-700 ease-out ${
                      inView
                        ? "animate-fade-in-right"
                        : "opacity-0 rtl:translate-x-[20px] ltr:translate-x-[-20px]"
                    }`}
                  />
                  <div className="flex flex-col items-start gap-6 w-full md:w-[60%]">
                    <img
                      src={feature.iconSrc}
                      alt=".."
                      className="w-[50px] h-[50px]"
                    />
                    <h2 className="ml-3 font-bold">{feature.title}</h2>
                    <p className="ml-3 text-[15px] text-[#6685A3] opacity-80 font-extralight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )}
            </InView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
