import { useCallback, useEffect, useState } from "react";
import { User } from "@/Models/User";
import { RoleEnum } from "@/enum/RoleEnum";

const USER_STORAGE_KEY = "user";

const useUser = () => {
  const [user, updateUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
  }, []);

  const setUser = useCallback((newUser: User) => {
    if (newUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    updateUser(newUser);
  }, []);

  return { user, setUser, role: user?.role ?? RoleEnum.CUSTOMER };
};

export default useUser;
