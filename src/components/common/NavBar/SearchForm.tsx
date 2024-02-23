import React from "react";
import Close from "@/components/icons/Close";

const SearchForm: React.JSXElementConstructor<any> = ({
  setShowSerchForm,
}: {
  setShowSerchForm: React.Dispatch<boolean>;
}) => {
  return (
    <div className=" w-11/12 h-full flex bg-white justify-between mx-6 items-center">
      <div className="flex items-center h-full w-10/12">
        <Close
          className={`h-6 w-6 cursor-pointer `}
          onClick={() => {
            setShowSerchForm(false);
          }}
        />
        <input
          className="ml-3 rtl:mr-3 rtl:ml0 w-11/12 h-10/12 pl-4 focus:outline-0"
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
