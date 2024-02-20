import React, { createContext, ReactNode, useState } from "react";

interface OpenMenuContextType {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const OpenMenuContext = createContext<OpenMenuContextType | null>(null);
