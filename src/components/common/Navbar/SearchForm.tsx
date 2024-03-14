import React from "react";
import Close from "@/components/icons/Close";
import XMark from "@/components/icons/XMark";

const SearchForm = ({
  setShowSearchForm,
}: {
  setShowSearchForm: React.Dispatch<boolean>;
}) => {
  return (
    <div className=" w-full h-full flex bg-white justify-between px-6 items-center">
      <div className="flex items-center h-full w-10/12">
        <XMark
          className={`h-6 w-6 cursor-pointer `}
          onClick={() => {
            setShowSearchForm(false);
          }}
        />
        <input
          className="ml-3 rtl:mr-3 rtl:ml0 w-11/12 !h-[60%] pl-4 bg-gray-100 rounded-2xl focus:outline-0"
          type="text"
          id="search"
          placeholder="Search..."
        />
      </div>
      <button
        type="button"
        className="w-20 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm  py-2.5   focus:outline-none "
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;
