import React from "react";
import Nav from "@/components/landing/Nav";
import LandingIcon from "@/components/icons/landingIcon";
import LandingLinIcon from "@/components/icons/LandinLinIcon";

const Page = () => {
  return (
      <div className={'kodchasan text-[#013567]'}>
        <Nav />
          <div className={'flex lg:h-[65vh] mt-4 px-4 relative'}>
              <LandingLinIcon className={'w-full absolute top-0 z-10'}/>
              <div className={'w-1/2'}></div>
              <div className={'w-1/2 z-20'}>
                  <LandingIcon className={'w-full h-full '}/>
              </div>
          </div>
      </div>

  );
};

export default Page;