const Features = () => {
  return (
    <div
      id={"features"}
      className={"w-full my-6 flex flex-col items-center gap-12"}
    >
      <div className={"w-full flex flex-col gap-2 items-center"}>
        <p
          className={
            "opacity-60 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]"
          }
        >
          Introducing some
        </p>
        <div
          className={
            "text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px] flex gap-1"
          }
        >
          <h2 className={"font-bold marker"}>POM</h2>
          <h3>Features</h3>
        </div>
      </div>
      <div className="flex justify-center items-center w-[65%]">
        <div
          className={
            "w-full flex flex-col gap-12 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]"
          }
        >
          <div className={"flex flex-col md:flex-row items-center gap-8 md:gap-16"}>
            <img
              src={"/tab2.png"}
              alt={".."}
              className={"block object-contain w-full md:w-[40%]"}
            />
            <div className={"flex flex-col items-start gap-6 w-full  md:w-[60%]"}>
              <img
                src={"/nots.png"}
                alt={".."}
                className={"w-[50px] h-[50px] "}
              />
              <h2 className="ml-3 font-bold">Full patient record</h2>
              <p className={"ml-3 text-[15px] text-[#6685A3] opacity-80 font-extralight"}>
                Access detailed patient histories, treatment plans, and notes
                all in one place for better care and quicker decision-making.
              </p>
            </div>
          </div>
          <div className={"flex flex-col md:flex-row items-center gap-8 md:gap-16"}>
            <img
              src={"/tab1.png"}
              alt={".."}
              className={"block object-contain w-full md:w-[40%]"}
            />
            <div className={"flex flex-col gap-6 w-full md:w-[60%]"}>
              <img
                src={"/calender.png"}
                alt={".."}
                className={"w-[50px] h-[50px] "}
              />
              <h2 className="ml-3 font-bold">Control all appointments</h2>
              <p className={"ml-3 text-[15px] text-[#6685A3] opacity-80 font-extralight"}>
                Easily manage patient appointments, reduce wait times, and
                ensure a smooth schedule with just a few clicks.
              </p>
            </div>
          </div>
          <div className={"flex flex-col md:flex-row items-center gap-8 md:gap-16"}>
            <img
              src={"/tab3.png"}
              alt={".."}
              className={"block object-contain w-full md:w-[40%]"}
            />
            <div className={"flex flex-col gap-6 w-full md:w-[60%]"}>
              <img
                src={"/balanc.png"}
                alt={".."}
                className={"w-[50px] h-[50px] "}
              />
              <h2 className="font-bold">Financial transactions tracking</h2>
              <p className={"text-[15px] text-[#6685A3] opacity-80 font-extralight"}>
                Keep track of all clinic transactions, from billing to payments,
                in real-time to ensure financial clarity and control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
