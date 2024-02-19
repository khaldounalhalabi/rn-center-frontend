"use client";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/NavBar/Navbar";
import { useState} from "react";
import {OpenMenuContext} from '@/hooks/OpenMenu'


export const Header = () => {

    const [open, setOpen] = useState<boolean>(false);
  return (
    <header className={`md:grid md:grid-cols-4 max-h-20`}>
      <OpenMenuContext.Provider value={{ open, setOpen }}>
        <Sidebar />
        <Navbar />
      </OpenMenuContext.Provider>
    </header>
  );
};
