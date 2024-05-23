import {Link} from "@/navigation";
import React from "react";

const Page = () => {
  return <div>
    <div className="w-full h-12 px-2 my-1 group tooltip" data-tip="hello">
      <Link
          href={'s'}
          className={`btn w-1/2 h-full dark:bg-red-300  hover:bg-gray-200 rounded-2xl cursor-pointer flex justify-center items-center`}
      >
        fgfd
      </Link>
    </div>

  </div>;
};

export default Page;
