"use client";
import React, { useEffect, useRef, useState } from "react";
import LanguageIcon from "@/components/icons/LanguageIcon";
import OpenAndClose from "@/hooks/OpenAndClose";
import useClickOutside from "@/hooks/UseClickOutside";
import IraqFlagIcon from "@/components/icons/IraqFlagIcon";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

const LanguagePopover = () => {
  const t = useTranslations("components");
  const [openPopLang, setOpenPopLang] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    useClickOutside(ref, setOpenPopLang);
  }, []);
  const pathname = usePathname();

  return (
    <div
      ref={ref}
      className={openPopLang ? " relative" : "overflow-clip relative"}
    >
      <LanguageIcon
        className={`h-6 w-6 cursor-pointer`}
        onClick={() => OpenAndClose(openPopLang, setOpenPopLang)}
      />
      <div
        className={
          openPopLang
            ? "absolute end-0 w-[180px] z-50 mt-2 top-10 divide-y divide-gray-100 rounded-2xl bg-white opacity-100  transition-x-0 ease-in-out  duration-500 "
            : "absolute transition-x-[-200px] opacity-0 ease-in-out duration-500 "
        }
        style={{
          boxShadow:
            " 0px 5px 5px -3px rgba(145, 158, 171, 0.2)" +
            ", 0px 8px 10px 1px rgba(145, 158, 171, 0.14)" +
            ", 0px 3px 14px 2px rgba(145, 158, 171, 0.12)",
        }}
        role="menu"
      >
        <div>
          <Link href={pathname} locale={"en"}>
            <button className="flex items-center text-start gap-2 w-full hover:bg-blue-200 px-4 py-2 rounded-xl cursor-pointer">
              <img
                className="w-7 h-7"
                src="https://img.icons8.com/color/48/usa.png"
                alt="usa"
              />
              <h3>{t("english")}</h3>
            </button>
          </Link>
          <Link href={pathname} locale={"ar"}>
            <button className="flex items-center text-start gap-2 w-full hover:bg-blue-200 px-4 py-2 rounded-xl cursor-pointer">
              <IraqFlagIcon className={"w-7 h-7"} />
              <h3>{t("arabic")}</h3>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopover;
