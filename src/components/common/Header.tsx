"use client";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/Navbar";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface OpenMenuContextType {
  openMenu?: boolean;
  setOpenMenu?: (prevState: boolean) => Dispatch<SetStateAction<boolean>>;
}

export const OpenMenuContext: React.Context<OpenMenuContextType | undefined> =
  createContext<OpenMenuContextType | undefined>(undefined);

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className={`md:grid md:grid-cols-4 max-h-20`}>
      <OpenMenuContext.Provider value={{ openMenu, setOpenMenu }}>
        <Sidebar />
        <Navbar />
      </OpenMenuContext.Provider>
    </header>
  );
};
