"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import useFcmToken from "@/hooks/FirebaseNotificationHook";

interface ReFetchPhotoContextType {
  reFetch: boolean;
  setReFetch: Dispatch<SetStateAction<boolean>>;
}

// Define the default value for the context
const defaultReFetchPhotoValue: ReFetchPhotoContextType = {
  reFetch: false,
  setReFetch: () => {},
};
export const ReFetchPhoto = createContext(defaultReFetchPhotoValue);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [reFetch, setReFetch] = useState(false);


  return (
    <ReFetchPhoto.Provider value={{ reFetch, setReFetch }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer />
          {children}
        </LocalizationProvider>
      </QueryClientProvider>
    </ReFetchPhoto.Provider>
  );
};
export default Providers;