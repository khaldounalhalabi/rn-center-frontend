import HomeIcon from "@/components/customer/footer/icon/HomeIcon";
import NotificationIcon from "@/components/customer/footer/icon/NotificationIcon";
import BloodIcon from "@/components/customer/footer/icon/BloodIcon";
import UserIcon from "@/components/customer/footer/icon/UserIcon";
import AppointmentIcon from "@/components/customer/footer/icon/AppointmentIcon";


const Footer = ()=>{




    return (
        <div className={' h-24 fixed bottom-0 flex items-end w-full z-10'}>

            <div className={'w-[70px] h-[70px] p-2 rounded-full bg-white absolute top-0 left-1/2 '} style={{transform:"translate(-50%,0)",boxShadow: "-1px -3.5px 7px -2px #dddddd"}}>
                <div className={'h-full rounded-full bg-[#1FB8B9] text-white flex justify-center items-center'}>
                      <AppointmentIcon className={'w-8 h-8'}/>
                </div>
            </div>

            <div className={'w-full h-[70%] shadow-gray-500 shadow-xl bg-white flex justify-between text-[12px] text-[#9eb3cf]'}
              style={{
                  boxShadow: "-1px -3.5px 7px -2px #dddddd"
              }}
            >
               <div className={'flex items-center justify-around w-[40%]'}>
                   <div className={'flex flex-col items-center'}>
                       <HomeIcon className={'w-8 h-8'}/>
                       <p>Home</p>
                   </div>
                   <div className={'flex flex-col items-center'}>
                       <NotificationIcon className={'w-8 h-8'}/>
                       <p>Notification</p>
                   </div>
               </div>
                <div className={'flex items-center justify-around w-[40%]'}>
                    <div className={'flex flex-col items-center'}>
                        <BloodIcon className={'w-8 h-8'}/>
                        <p>Blood Bank</p>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <UserIcon className={'w-8 h-8 fill-[#9eb3cf]'}/>
                        <p>Account</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer