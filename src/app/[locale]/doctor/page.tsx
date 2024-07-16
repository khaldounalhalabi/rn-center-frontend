'use client'
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import dayjs from "dayjs";

const Home =  () => {
   const path = HandleGetUserData()
    console.log(dayjs().startOf('month').format("YYYY-MM-DD"))
    console.log(path)
  return <></>;
};

export default Home;