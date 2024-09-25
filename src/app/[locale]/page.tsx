import React from "react";
import Nav from "@/components/landing/Nav";
import LandingIcon from "@/components/icons/landingIcon";
import LandingLinIcon from "@/components/icons/LandinLinIcon";
import Title from "@/components/landing/Title";
import SpecialityHomePageSection from "@/components/customer/Speciality/SpecialityHomePageSection";
import Providers from "@/app/[locale]/providers";
import CenterFooter from "@/components/landing/CenterFooter";
import BloodBank from "@/components/landing/BloodBank";
import Hospital from "@/components/landing/Hospital";

const Page = () => {
  return (
    <Providers>
      <div className={"kodchasan text-[#013567] relative"}>
        <Nav />
        <div className={"flex lg:h-[65vh] mt-4 px-4 relative"}>
          <LandingLinIcon className={"w-full absolute top-0 z-10"} />
          <div
            className={
              "md:w-1/2 w-full flex gap-12 flex-col items-start ml-4 md:ml-0 justify-center md:items-center"
            }
          >
            <Title />
          </div>
          <div className={"w-1/2 z-20 hidden md:block"}>
            <LandingIcon className={"w-full h-full "} />
          </div>
        </div>
        <SpecialityHomePageSection />
        <CenterFooter />
        <BloodBank />
        <Hospital />
      </div>
    </Providers>
  );
};

export default Page;
