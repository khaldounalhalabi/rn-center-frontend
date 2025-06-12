import {
  deleteClientCookie,
  getClientCookie,
  setClientCookie,
} from "@/actions/ClientCookies";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";
import { useCallback, useEffect, useState } from "react";

const USER_COOKIES_KEY = "user_cookies_key";

const useUser = () => {
  const [user, updateUser] = useState<User | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = getClientCookie(USER_COOKIES_KEY);
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);

  const setUser = useCallback((newUser: User | undefined) => {
    if (newUser) {
      setClientCookie(USER_COOKIES_KEY, JSON.stringify(newUser));
    } else {
      deleteClientCookie(USER_COOKIES_KEY);
    }
    updateUser(newUser);
  }, []);

  const role = isInitialized ? user?.role ?? RoleEnum.PUBLIC : undefined;

  return { user, setUser, role };
};

export default useUser;
