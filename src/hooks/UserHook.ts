import { UserContext } from "@/components/providers/UserProvider";
import { useContext } from "react";

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw "Cannot Use User Hook Outside Of User Provider";
  }

  return {
    user: context?.user,
    setUser: context?.setUser,
    role: context?.role,
  };
};

export default useUser;
