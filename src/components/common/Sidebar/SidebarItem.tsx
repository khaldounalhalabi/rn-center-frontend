"use client";
import React, { ReactNode } from "react";
import { Link, usePathname } from "@/navigation";

const SidebarItem = ({
  link = "#",
  children,
  onClick,
  className = undefined,
  openNavBar,
  setOpenNavBar,
}: {
  openNavBar: {
    sm: boolean;
    md: boolean;
  };
  setOpenNavBar: React.Dispatch<{
    sm: boolean;
    md: boolean;
  }>;
  link?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  className?: string;
}) => {
  const pathname = usePathname();
  let active: string;
  if (pathname === link) {
    active =
      "text-white bg-[#1fb8b9] border-l-4 border-[#013567] hover:text-gray-500 hover:bg-gray-200";
  } else {
    active = "text-gray-500 hover:bg-[#1fb8b9] hover:text-white";
  }
  return (
    <li
      className={`${className}}`}
      onClick={(e) => {
        if(openNavBar.sm) {
         setOpenNavBar({sm:!openNavBar.sm,md:false})
        }
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <Link
        href={link}
        className={`block rounded-lg px-4 py-4 my-1 text-sm font-medium ${active}`}
      >
        {children}
      </Link>
    </li>
  );
};

export default SidebarItem;