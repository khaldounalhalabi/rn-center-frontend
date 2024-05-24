"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {Link} from "@/navigation";

const SidebarItem = ({
  link = "#",
  children,
  onClick,
}: {
  link?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  const pathname = usePathname();
  let active: string;
  if (pathname == link) {
    active = "bg-blue-100 text-blue-500 hover:text-blue-600 hover:bg-blue-200";
  } else {
    active = "text-gray-500 hover:bg-gray-100 hover:text-gray-700";
  }
  return (
    <li
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <Link
        href={link}
        className={`block rounded-lg px-4 py-4 text-sm font-medium ${active}`}
      >
        {children}
      </Link>
    </li>
  );
};

export default SidebarItem;
