"use client";
import React, { useState} from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import SearchForm from "@/components/common/NavBar/SearchForm";
import NotificationsPopover from "@/components/common/NavBar/NotificationsPopover";
import ProfileOptionsPopover from "@/components/common/NavBar/ProfileOptionsPopover";
import LanguagePopover from "@/components/common/NavBar/languagePopover";

const Navbar = ({open,setOpen}:{open:any,setOpen:any}) => {


  const [showSearchForm,setShowSerchForm] = useState<boolean>(false)
  const handleShowSearch = ()=>{
    showSearchForm?setShowSerchForm(false):setShowSerchForm(true)
  }

  const handleShowMenu = ()=>{
    open?setOpen(false):setOpen(true)
  }


  return (
    <nav
        className={`w-full h-[72px]   overflow-clip  shadow-md flex justify-between max-h-20 items-center px-10 py-4 col-span-4 md:col-span-3`}
    >


      <div className={showSearchForm?
          'w-full h-[72px] md:w-[75%] md:right-0 md:left-auto left-0  absolute z-30 top-0   translate-y-0 ease-in-out duration-500'
          :'w-0 h-full  translate-y-[-200px] ease-in-out duration-300'}>
        <SearchForm  show={setShowSerchForm}/>
      </div>
      <div className={`flex w-[inherit] justify-start gap-3 items-center`}>
        <MenuIcon className={`h-6 w-6 md:hidden`} onClick={handleShowMenu} />
        <SearchIcon className={`h-6 w-6 cursor-pointer`}  onClick={handleShowSearch}/>
      </div>
      <div className={`flex justify-between items-center gap-2`}>
        <LanguagePopover/>
        <NotificationsPopover/>
        <ProfileOptionsPopover  />
      </div>
    </nav>
  );
};

export default Navbar;





//
//
// "use client";
// import React, {useContext, useState} from "react";
// import SearchIcon from "@/components/icons/SearchIcon";
// import LanguageIcon from "@/components/icons/LanguageIcon";
// import NotificationsIcon from "@/components/icons/NotificationsIcon";
// import RoundedImage from "@/components/common/NavBar/RoundedImage";
// import MenuIcon from "@/components/icons/MenuIcon";
// import { OpenMenuContext } from "@/hooks/OpenMenu";
// import SearchForm from "@/components/common/NavBar/SearchForm";
// import {OpenSearchContext} from "@/hooks/OpenSearchForm";
//
// const Navbar = () => {
//   const contextNav = useContext(OpenMenuContext);
//   const contextSearch = useContext(OpenSearchContext)
//
//   function handleMenuClick(data:any) {
//     if(data){
//       data.open?data.setOpen(false):data.setOpen(true)
//     }
//   }
//
//
//
//
//   return (
//       <nav
//           className={`w-full relative overflow-y-clip bg-transparent opacity-50 shadow-md flex justify-between max-h-20 items-center px-10 py-4 col-span-4 md:col-span-3`}
//       >
//         <SearchForm  showSearchForm={contextSearch?.open}/>
//         <div className={`flex justify-between gap-3 items-center`}>
//           <MenuIcon className={`h-6 w-6 md:hidden`} onClick={()=>{handleMenuClick(contextNav)}} />
//           <SearchIcon className={`h-6 w-6 cursor-pointer`}  onClick={()=>{handleMenuClick(contextSearch)}}/>
//         </div>
//         <div className={`flex justify-between items-center gap-2`}>
//           <LanguageIcon className={`h-6 w-6 cursor-pointer`} />
//           <NotificationsIcon
//               className={`h-6 w-6 cursor-pointer text-[#909CA6] fill-[#909CA6]`}
//           />
//           <RoundedImage src={"/user.png"} alt={"user-profile"} />
//         </div>
//       </nav>
//   );
// };
//
// export default Navbar;
