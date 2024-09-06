"use client";
import { useEffect, useState } from "react";

const HandleGetUserData = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    const data = window.localStorage.getItem("user");
    return data ? JSON.parse(data) : undefined;
  } else {
    return { data: "" };
  }
};

export default HandleGetUserData;
