import UserIcon from "@/components/icons/UserIcon";
import React from "react";
import { Link } from "@/navigation";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import RoundedImage from "@/components/common/RoundedImage";

const CheckUserImg = () => {
  const user = HandleGetUserData();
  return (
    <>
      {user && user.image.length != 0 ? (
        <Link className={"w-7 h-7 mx-2"} href={"/doctor"}>
          <RoundedImage src={user?.image?.[0]?.file_url} alt={"user-profile"} />
        </Link>
      ) : (
        <Link
          href={
            user && user.image.length == 0 ? "/doctor" : "/auth/doctor/login"
          }
        >
          <UserIcon className={"w-6 h-6 fill-[#013567]  cursor-pointer"} />
        </Link>
      )}
    </>
  );
};

export default CheckUserImg;
