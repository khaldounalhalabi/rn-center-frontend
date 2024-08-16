import React from "react";

const CardPages = ({
  image,
  info,
  children,
}: {
  image: React.ReactNode;
  info?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={"w-full h-[108px] gap-2 flex justify-between my-4 "}
      style={{ boxShadow: "0 14.5px 5.5px -10px #dddddd" }}
    >
      <div className={"w-[15%] h-full flex justify-center items-center"}>
        {image}
      </div>
      <div className={"w-[65%] h-full "}>{children}</div>
      <div className={"w-[15%] h-full "}>{info}</div>
    </div>
  );
};

export default CardPages;
