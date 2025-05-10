import React from "react";
import { Link, usePathname } from "@/navigation";

const SidebarIcon = ({
  link,
  title,
  children,
  className = undefined,
}: {
  link: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const path = usePathname();
  return (
    <>
      <div className={`my-1 h-12 w-full px-2 ${className}`}>
        <Link
          href={link}
          className={`h-full w-full ${path == link ? "bg-gray-200" : ""} flex cursor-pointer items-center justify-center rounded-2xl hover:bg-gray-200`}
        >
          {children}
        </Link>
      </div>
    </>
  );
};

export default SidebarIcon;
