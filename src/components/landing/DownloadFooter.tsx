import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";


const DownloadFooter = ()=>{



    return (
        <div className={'my-4 hidden md:flex md:gap-2 lg:gap-6  flex-row justify-around items-center w-full h-[400px] bg-gradient-to-r from-[#d7eff6] to-[#e0efef]'}>
          <div className={' flex flex-col justify-center items-start gap-4'}>
              <h2 className={'md:text-[30px] lg:text-[35px] font-bold'}>Download App</h2>
              <p className={'font-extralight md:text-[15px] lg:text-[20px]'}>Lorem ipsum dolor sit amet conse
                  adipisicing elit. Expedita</p>
              <AuthSubmitButton className={"w-1/2 px-10 py-2"}>
                  Download
              </AuthSubmitButton>
          </div>
            <div className={' h-full md:py-12 lg:py-6'}>
                <img className={'w-full h-full'} src={'/download-app.png'} alt={'...'}/>
            </div>
        </div>
    )
}

export default DownloadFooter