'use client'
import React, {useState} from "react";
import { Header } from "@/components/common/Header";
import {OpenSearchContext} from "@/hooks/OpenSearchForm";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const [open,setOpen] = useState<boolean>(false)

    return (
    <>
        <OpenSearchContext.Provider value={{open, setOpen}}>
            <Header />
            <main className={`grid grid-cols-4`} onClick={()=>setOpen(false)}>
                <div className={`col-start-1 md:col-start-2 col-end-5`}>{children}</div>
            </main>
        </OpenSearchContext.Provider>
    </>
  );
};

export default Layout;
