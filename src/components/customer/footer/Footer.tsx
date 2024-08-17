"use client";
import HomeIcon from "@/components/customer/footer/icon/HomeIcon";
import NotificationIcon from "@/components/customer/footer/icon/NotificationIcon";
import BloodIcon from "@/components/customer/footer/icon/BloodIcon";
import UserIcon from "@/components/customer/footer/icon/UserIcon";
import AppointmentIcon from "@/components/customer/footer/icon/AppointmentIcon";
import { Link, usePathname } from "@/navigation";

const Footer = () => {
  const router = usePathname();
  const isActive = (path: string) => router === path;

  return (
    <>
      <div
        className={"md:hidden h-24 fixed bottom-0 flex items-end w-full z-10"}
      >
        <div
          className={
            "w-[70px] h-[70px] p-2 rounded-full bg-white absolute top-0 left-1/2"
          }
          style={{
            transform: "translate(-50%,0)",
            boxShadow: "-1px -3.5px 7px -2px #dddddd",
          }}
        >
          <div
            className={
              "h-full rounded-full bg-[#1FB8B9] text-white flex justify-center items-center"
            }
          >
            <AppointmentIcon className={"w-8 h-8"} />
          </div>
        </div>

        <div
          className={
            "w-full h-[70%] shadow-gray-500 shadow-xl bg-white flex justify-between text-[12px] text-[#9eb3cf]"
          }
          style={{
            boxShadow: "-1px -3.5px 7px -2px #dddddd",
          }}
        >
          <div className={"flex items-center justify-around w-[40%]"}>
            <Link href={"/"} className={"flex flex-col h-full items-center"}>
              {isActive("/") && (
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#1FB8B9] "></div>
              )}
              <HomeIcon
                className={`w-8 h-8 ${!isActive("/") ? "mt-2" : "fill-[#1FB8B9]"} fill-[#9eb3cf]`}
              />
              <p>Home</p>
            </Link>
            <Link
              href={"/customer/notifications"}
              className={"flex h-full  flex-col items-center"}
            >
              {isActive("/customer/notifications") && (
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#1FB8B9] "></div>
              )}
              <NotificationIcon
                className={`w-8 h-8 ${!isActive("/customer/notifications") ? "mt-2" : "fill-[#1FB8B9]"} fill-[#9eb3cf]`}
              />
              <p>Notification</p>
            </Link>
          </div>
          <div className={"flex items-center justify-around w-[40%]"}>
            <Link
              href={"/customer/blood-bank"}
              className={"flex h-full flex-col items-center"}
            >
              {isActive("/customer/blood-bank") && (
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#1FB8B9] "></div>
              )}
              <BloodIcon
                className={`w-8 h-8 ${!isActive("/customer/blood-bank") ? "mt-2" : "fill-[#1FB8B9]"} fill-[#9eb3cf]`}
              />
              <p>Blood Bank</p>
            </Link>
            <Link
              href={"/account"}
              className={"flex flex-col h-full items-center"}
            >
              {isActive("/account") && (
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#1FB8B9] "></div>
              )}
              <UserIcon
                className={`w-8 h-8 ${!isActive("/account") ? "mt-2" : "fill-[#1FB8B9]"} fill-[#9eb3cf]`}
              />
              <p>Account</p>
            </Link>
          </div>
        </div>
      </div>


      <div
        className={
          "hidden md:flex h-24 fixed bottom-0 items-center justify-center w-full z-10"
        }
      >
        <div
          className={
            "h-[80%]  w-[70%] font-bold py-10 max-w-[600px] flex justify-around items-center bg-[#9d9d9d]  rounded-2xl"
          }
        >
          <div
            className={"flex  text-white items-center justify-around w-[40%]"}
          >
            <Link href={"/customer"} className={`flex  flex-col items-center `}>
              <HomeIcon
                className={`w-7 h-7 ${!isActive("/customer") ? "fill-white" : "fill-[#1FB8B9]"} `}
              />
              <p>Home</p>
            </Link>
            <Link
              href={"/customer/notifications"}
              className={`flex  flex-col items-center `}
            >
              <NotificationIcon
                className={`w-7 h-7 ${!isActive("/customer/notifications") ? "fill-white" : "fill-[#1FB8B9]"} `}
              />
              <p>Notification</p>
            </Link>
          </div>
          <Link
            href={"/"}
            className={
              "flex w-fit h-fit p-2  justify-center items-center bg-white rounded-full"
            }
          >
            <AppointmentIcon className={"w-10 h-10 fill-[#1FB8B9] "} />
          </Link>
          <div
            className={"flex text-white items-center justify-around w-[40%]"}
          >
            <Link
              href={"/customer/blood-bank"}
              className={`flex flex-col items-center  `}
            >
              {isActive("/blood-bank") && (
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#1FB8B9] "></div>
              )}
              <BloodIcon
                className={`w-7 h-7 ${!isActive("/customer/blood-bank") ? "fill-white" : "fill-[#1FB8B9]"}  `}
              />
              <p>Blood Bank</p>
            </Link>
            <Link href={"/"} className={`flex  flex-col items-center `}>
              <UserIcon
                className={`w-7 h-7 ${!isActive("/account") ? "fill-white" : "fill-[#1FB8B9]"} `}
              />
              <p>Account</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
