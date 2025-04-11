"use client";
import { User } from "@/Models/User";
import { useEffect, useState } from "react";

const useUser = () => {
  const [data, setData] = useState<User | undefined>(undefined);

  const setUser = (user?: User) => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  };

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("user");
    if (localStorageUser) {
      setData(JSON.parse(localStorageUser));
    }
  }, []);

  return {
    user: data,
    setUser: setUser,
  };
};

export default useUser;
