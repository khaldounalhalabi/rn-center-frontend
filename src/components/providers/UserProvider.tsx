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

const USER_KEY = "app_user";
const USER_TIMESTAMP_KEY = "app_user_timestamp";
const USER_VALIDITY_MS = 5 * 60 * 1000; // 5 minutes

function storeUserWithTimestamp(user: User | undefined) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(USER_TIMESTAMP_KEY, Date.now().toString());
  } else {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_TIMESTAMP_KEY);
  }
}

function getUserWithTimestamp(): User | undefined {
  const userStr = localStorage.getItem(USER_KEY);
  const timestampStr = localStorage.getItem(USER_TIMESTAMP_KEY);
  if (userStr && timestampStr) {
    const timestamp = parseInt(timestampStr, 10);
    if (Date.now() - timestamp < USER_VALIDITY_MS) {
      return JSON.parse(userStr) as User;
    }
  }
  return undefined;
}

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
      storeUserWithTimestamp(newUser);
      serverSetUser(newUser).then(() => {
        updateUser(newUser);
      });
    } else {
      storeUserWithTimestamp(undefined);
      updateUser(undefined);
    }
  }, []);

  const initializeUser = async () => {
    // Try to get user from localStorage and check validity
    const storedUser = getUserWithTimestamp();
    setUser(storedUser);

    if (!storedUser) {
      // If not valid, revalidate with AuthService
      return await AuthService.make()
        .me()
        .then((res) => {
          setUser(res.data);
          return res.data;
        });
    }
    return storedUser;
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
