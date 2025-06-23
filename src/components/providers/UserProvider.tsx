import { getUser, setUser as serverSetUser } from "@/actions/HelperActions";
import { RoleEnum } from "@/enums/RoleEnum";
import { User } from "@/models/User";
import { AuthService } from "@/services/AuthService";
import { createContext, useCallback, useEffect, useState } from "react";
import LoadingScreen from "../common/ui/LoadingScreen";

export const UserContext = createContext<{
  user: User | undefined;
  setUser: (newUser: User | undefined) => void;
  role?: RoleEnum;
  initializeUser: () => Promise<User | undefined> | undefined;
} | null>(null);

const UserProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, updateUser] = useState<User | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);
  const [role, setRole] = useState<RoleEnum | undefined>(undefined);

  useEffect(() => {
    initializeUser().then(() => {
      setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    setRole(user?.role ?? RoleEnum.PUBLIC);
  }, [user]);

  const setUser = useCallback((newUser: User | undefined) => {
    if (newUser) {
      setRole(newUser?.role ?? RoleEnum.PUBLIC);
      serverSetUser(newUser).then(() => {
        updateUser(newUser);
      });
    }
  }, []);

  const initializeUser = async () => {
    const response = await getUser();
    setUser(response);

    if (!response) {
      return await AuthService.make()
        .me()
        .then((res) => {
          setUser(res.data);
          return res.data;
        });
    }
    return response;
  };

  if (!isInitialized) {
    return <LoadingScreen />;
  }

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
