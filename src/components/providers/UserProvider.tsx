import {
  deleteClientCookie,
  getClientCookie,
  setClientCookie,
} from "@/actions/ClientCookies";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";
import { createContext, useCallback, useEffect, useState } from "react";
import LoadingScreen from "../common/ui/LoadingScreen";

export const UserContext = createContext<{
  user: User | undefined;
  setUser: (newUser: User | undefined) => void;
  role?: RoleEnum;
} | null>(null);
const USER_COOKIES_KEY = "user_cookies_key";

const UserProvider = ({ children }: { children?: React.ReactNode }) => {
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

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        role: role,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
