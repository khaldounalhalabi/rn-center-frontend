import React, { createContext } from "react";

interface OpenMenuContextType {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const OpenSearchContext = createContext<OpenMenuContextType | null>(null);
