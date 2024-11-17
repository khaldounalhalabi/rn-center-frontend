import UserIcon from "@/components/icons/UserIcon";
import React from "react";
import { Link } from "@/navigation";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import RoundedImage from "@/components/common/RoundedImage";

const CheckUserImg = () => {
  const user = HandleGetUserData();
  return (
    <Link className={"w-7 h-7 mx-2"} href={"/doctor"}>
      {user && user?.image?.[0]?.file_url ? (
        <RoundedImage src={user?.image?.[0]?.file_url} alt={"user-profile"} />
      ) : (
        <UserIcon className={"w-6 h-6 fill-[#013567]  cursor-pointer"} />
      )}
    </Link>
  );
};

export default CheckUserImg;
