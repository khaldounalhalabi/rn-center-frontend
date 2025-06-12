import { UserContext } from "@/components/providers/UserProvider";
import { useContext } from "react";

const useUser = () => {
  const context = useContext(UserContext);
  return {
    user: context?.user,
    setUser: context?.setUser,
    role: context?.role,
  };
};

export default useUser;
