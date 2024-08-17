import React from "react";
import { Link } from "@/navigation";

const ListCards = ({
  image,
  info,
  children,
  containerClass = "",
  url = undefined,
}: {
  image: React.ReactNode;
  info?: React.ReactNode;
  children: React.ReactNode;
  containerClass?: string;
  url?: string;
}) => {
  return (
    <div
      className={`w-full border-b h-[18%] gap-2 flex justify-between items-center ${containerClass}`}
    >
      {url ? (
        <Link href={url} className={"flex items-center w-full"}>
          <div className={"w-[15%] h-full flex justify-center items-center"}>
            {image}
          </div>
          <div className={"w-[65%] h-full"}>{children}</div>
        </Link>
      ) : (
        <div className={"flex items-center w-full"}>
          <div className={"w-[15%] h-full flex justify-center items-center"}>
            {image}
          </div>
          <div className={"w-[65%] h-full"}>{children}</div>
        </div>
      )}
      <div className={"w-[15%] h-full"}>{info}</div>
    </div>
  );
};

export default ListCards;
