import React from "react";
import { Link, usePathname } from "@/navigation";

const SidebarIcon = ({
  link,
  title,
  children,
    className = undefined
}: {
  link: string;
  title: string;
  children: React.ReactNode;
  className?:string
}) => {
  const path = usePathname();
  return (
    <>
      <div className={`w-full h-12 px-2 my-1 ${className}`}>
        <Link
          href={link}
          className={`w-full h-full ${path == link ? "bg-gray-200" : ""}  hover:bg-gray-200 rounded-2xl cursor-pointer flex justify-center items-center`}
        >
          {children}
        </Link>
      </div>
    </>
  );
};

export default SidebarIcon;