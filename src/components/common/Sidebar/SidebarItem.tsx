"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {Link} from "@/i18Router";

const SidebarItem = ({
  link = "#",
  children,
}: {
  link?: string;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  let active: string;
  if (pathname == link) {
    active = "bg-blue-100 text-blue-500 hover:text-blue-600 hover:bg-blue-200";
  } else {
    active = "text-gray-500 hover:bg-gray-100 hover:text-gray-700";
  }
  return (
    <li>
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
