"use client";
import { useEffect, useState } from "react";

const HandleGetUserData = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    setData(window.localStorage.getItem("user"));
  }, []);

  return data ? JSON.parse(data) : undefined;
};

export default HandleGetUserData;
