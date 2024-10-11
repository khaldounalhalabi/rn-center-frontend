const Footer = () => {
  return (
    <div className={"max-h-[530px]"}>
      <div className={"flex justify-around items-center h-full"}>
        <div
          className={
            "w-1/3 flex flex-col justify-center items-center p-6 h-full"
          }
        >
          <img
            className={"w-full max-w-[250px] h-full max-h-[340px]"}
            src={"/footer-logo.png"}
            alt={"..."}
          />
        </div>
        <div
          className={
            "w-1/3 flex flex-col justify-center md:items-start items-center"
          }
        ></div>
        <div
          className={
            "w-1/3 flex flex-col justify-center md:items-start items-center"
          }
        ></div>
      </div>
    </div>
  );
};

export default Footer;
