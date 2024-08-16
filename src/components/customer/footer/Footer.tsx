import HomeIcon from "@/components/customer/footer/icon/HomeIcon";
import NotificationIcon from "@/components/customer/footer/icon/NotificationIcon";
import BloodIcon from "@/components/customer/footer/icon/BloodIcon";
import UserIcon from "@/components/customer/footer/icon/UserIcon";
import AppointmentIcon from "@/components/customer/footer/icon/AppointmentIcon";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={
          "h-1/12 p-2 fixed bottom-0 flex items-end w-full z-10 md:bg-[#5B5B5B] md:w-1/3 md:rounded-full md:bottom-5 md:bg-opacity-65"
        }
      >
        <div
          className={
            "md:!shadow-none w-[70px] h-[70px] p-2 rounded-full absolute -top-1/2 md:-top-1 left-1/2"
          }
          style={{
            transform: "translate(-50%,0)",
          }}
        >
          <div
            className={
              "h-full rounded-full bg-[#1FB8B9] md:bg-white shadow-lg text-white flex justify-center items-center"
            }
          >
            <AppointmentIcon className={"w-8 h-8 md:fill-[#1FB8B9]"} />
          </div>
        </div>

        <div
          className={
            "w-full h-[70%]  flex justify-between text-[12px] text-[#9eb3cf] md:text-white"
          }
        >
          <div className={"flex items-center justify-around w-[40%]"}>
            <div className={"flex flex-col items-center"}>
              <HomeIcon className={"w-8 h-8 md:fill-white md:text-white"} />
              <p>Home</p>
            </div>
            <div className={"flex flex-col items-center"}>
              <NotificationIcon
                className={"w-8 h-8  md:fill-white md:text-white"}
              />
              <p>Notification</p>
            </div>
          </div>
          <div className={"flex items-center justify-around w-[40%]"}>
            <div className={"flex flex-col items-center"}>
              <BloodIcon className={"w-8 h-8  md:fill-white md:text-white"} />
              <p>Blood Bank</p>
            </div>
            <div className={"flex flex-col items-center"}>
              <UserIcon
                className={
                  "w-8 h-8 fill-[#9eb3cf]  md:fill-white md:text-white"
                }
              />
              <p>Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
