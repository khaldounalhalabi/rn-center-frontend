import { useCallback, useEffect, useState } from "react";
import { User } from "@/Models/User";
import { RoleEnum } from "@/enum/RoleEnum";

const USER_STORAGE_KEY = "user";

const useUser = () => {
  const [user, updateUser] = useState<User | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);

  const setUser = useCallback((newUser: User | undefined) => {
    if (newUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    updateUser(newUser);
  }, []);

  const role = isInitialized ? user?.role ?? RoleEnum.CUSTOMER : undefined;

  return { user, setUser, role };
};

export default useUser;
