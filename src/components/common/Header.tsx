"use client";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/NavBar/Navbar";
import { useState} from "react";


export const Header = () => {

    const [open, setOpen] = useState<boolean>(false);
  return (
    <header className={`md:grid md:grid-cols-4 max-h-20`}>
        <Sidebar open={open} setOpen={setOpen}/>
        <Navbar open={open} setOpen={setOpen} />
    </header>
  );
};
