import React from "react";
import { Link, usePathname } from "@/navigation";

const SidebarIcon = ({
  link,
  title,
  children,
}: {
  link: string;
  title: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();
  return (
    <>
      <div className="w-full h-12 px-2 my-1 group">
        <p className="absolute hidden  whitespace-nowrap  w-fit text-sm group-hover:!block ltr:left-[90%] rtl:right-[90%] bg-black/70 text-white rounded-2xl z-[1000] p-2">
          {title}
        </p>
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