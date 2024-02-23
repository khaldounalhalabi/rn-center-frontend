"use client";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/Navbar/Navbar";
import { useState } from "react";

export const Header = () => {
  const [openNavBar, setOpenNavBar] = useState<boolean>(false);
  return (
    <header className={`md:grid md:grid-cols-4 max-h-20`}>
      <Sidebar openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
      <Navbar openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
    </header>
  );
};
