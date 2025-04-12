import UserIcon from "@/components/icons/UserIcon";
import React from "react";
import { Link } from "@/navigation";

const CheckUserImg = () => {
  return (
    <Link className={"w-7 h-7 mx-2"} href={"/doctor"}>
      <UserIcon className={"w-6 h-6 fill-[#013567]  cursor-pointer"} />{" "}
    </Link>
  );
};

export default CheckUserImg;
