import React from "react";
import Nav from "@/components/landing/Nav";
import LandingIcon from "@/components/icons/landingIcon";
import LandingLinIcon from "@/components/icons/LandinLinIcon";
import Title from "@/components/landing/Title";
import SpecialityHomePageSection from "@/components/customer/Speciality/SpecialityHomePageSection";

import CenterFooter from "@/components/landing/CenterFooter";
import DownloadFooter from "@/components/landing/DownloadFooter";
import Footer from "@/components/landing/Footer";
import Pricing from "@/components/landing/Pricing";
import Features from "@/components/landing/Features";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("@/app/[locale]/providers"), {
  ssr: false,
});

const navItems = [
  {
    title: "Home",
    link: "/#home",
  },
  {
    link: "/#specialities",
    title: "Specialities",
  },
  {
    link: "/#features",
    title: "Features",
  },
  {
    link: "/#pricing",
    title: "Pricing",
  },
  {
    link: "/#start",
    title: "Get Started",
  },
  {
    link: "/check-appointment",
    title: "Check your booked appointment",
  },
];
const Page = async () => {
  return (
    <Providers>
      <div
        className={
          "kodchasan text-[#013567] relative overflow-x-hidden md:px-0 px-2"
        }
      >
        <Nav links={navItems} />
        <div className={"flex mt-4 md:px-[10%] relative"}>
          <LandingLinIcon className={"w-full absolute top-0 left-0 z-10"} />
          <div className={"md:w-1/2 w-full z-20"}>
            <Title />
          </div>
          <div className={"w-1/2 z-20 hidden md:block"}>
            <LandingIcon className={"w-full h-[65vh]"} />
          </div>
        </div>
        <SpecialityHomePageSection />
        <CenterFooter />
        <Features />
        <Pricing />
        <DownloadFooter />
        <Footer />
      </div>
    </Providers>
  );
};

export default Page;
