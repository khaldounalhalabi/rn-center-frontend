"use client";
const HandleGetUserData = () => {
    const data = window.localStorage.getItem("user");
    return data ? JSON.parse(data) : undefined;

};

export default HandleGetUserData;