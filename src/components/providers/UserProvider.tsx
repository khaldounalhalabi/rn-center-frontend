import {
  deleteClientCookie,
  getClientCookie,
  setClientCookie,
} from "@/actions/ClientCookies";
import { RoleEnum } from "@/enums/RoleEnum";
import { ApiResponse } from "@/http/Response";
import { User } from "@/models/User";
import { AuthService } from "@/services/AuthService";
import { createContext, useCallback, useEffect, useState } from "react";
import LoadingScreen from "../common/ui/LoadingScreen";

export const UserContext = createContext<{
  user: User | undefined;
  setUser: (newUser: User | undefined) => void;
  role?: RoleEnum;
  initializeUser: () => Promise<ApiResponse<User>>;
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

  const initializeUser = () => {
    if (user?.role) {
      return AuthService.make(user?.role)
        .userDetails()
        .then((response) => {
          setUser(response?.data);
          return response;
        });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        role: role,
        initializeUser: initializeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
