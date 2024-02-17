import React from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import LanguageIcon from "@/components/icons/LanguageIcon";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

const Home = () => {
  return (
    <main className={`grid grid-cols-4`}>
      <Sidebar />
      <Navbar />
    </main>
  );
};

export default Home;
