import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <h1 className={`w-full bg-green-950`}>
      <Link
        href="/testApi"
        type="button"
        className="w-[70px] h-[36] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  py-2.5   focus:outline-none "
      >
        Admin
      </Link>
    </h1>
  );
};

export default Home;
