import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook to handle query parameter logic.
 * @param {string} param - The name of the query parameter to remove.
 * @param {string | undefined} targetValue - Optional: Target value to match before removal.
 * @returns {[boolean, (value: boolean) => void]} - State of the modal and a function to set it.
 */
const useOpenByQuery = (
  param: string | number,
  targetValue: string | number,
): [boolean, (val: boolean) => void] => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryValue = searchParams.get(`${param}`);
    if (`${queryValue}` == `${targetValue}`) {
      setOpen(true);
      const newSearchParams = new URLSearchParams(`${searchParams}`);
      newSearchParams.delete(`${param}`);
      router.replace(`?${newSearchParams.toString()}`, undefined);
    }
  }, [param, targetValue, searchParams, router]);

  return [open, setOpen];
};

export default useOpenByQuery;
