'use client'
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import {getCookieClient} from "@/Actions/clientCookies";

const Home =  () => {
   const path = HandleGetUserData()
    console.log(path)
    const permissions: string | undefined = getCookieClient("permissions");
    const permissionsArray = permissions?.split(",");
    console.log(permissionsArray)

    return <></>;
};

export default Home;