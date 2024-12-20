import AppointmentLandingIcon from "@/components/icons/AppointmentLandingIcon";
import TrackLandingIcon from "@/components/icons/TrackLandingIcon";
import TimeLandingIcon from "@/components/icons/TimeLandingIcon";

const CenterFooter = async () => {
  return (
    <div
      className={
        "w-full py-16 flex flex-col gap-12 items-center bg-gradient-to-r from-[#e3f4f4] to-[#e0eff0]"
      }
    >
      <div
        className={"flex flex-col justify-center md:items-center h-1/2 w-full"}
      >
        <h2 className={"md:text-[35px] text-center text-[22px] font-bold "}>
          Features & Services
        </h2>
      </div>
      <div
        className={
          "justify-around items-center h-full mx-8 w-full flex flex-col gap-5 md:flex-row pb-6"
        }
      >
        <div className={"flex flex-col gap-5 h-full items-center"}>
          <AppointmentLandingIcon />
          <h2 className={"text-[20px] font-bold"}>Appointment Management</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>Easily schedule and track appointments</p>
            <p>to optimize patient flow.</p>
          </div>
        </div>
        <div className={"flex flex-col items-center gap-5 h-full"}>
          <TrackLandingIcon />
          <h2 className={"text-[20px] font-bold"}>Billing & Invoicing</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>Streamline your clinic’s financials with</p>
            <p>easy billing and invoicing.</p>
          </div>
        </div>
        <div className={"flex flex-col items-center gap-5 h-full"}>
          <TimeLandingIcon />
          <h2 className={"text-[20px] font-bold"}>Patient Records</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>Access and manage patient information</p>
            <p>securely in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterFooter;
