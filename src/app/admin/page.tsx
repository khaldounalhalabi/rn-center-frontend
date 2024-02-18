import React from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar/Sidebar";

const Home = () => {
  return (
    <main className={`grid grid-cols-4`}>
      <Sidebar />
      <Navbar />
    </main>
  );
};

export default Home;
