import React from "react";
import {Link} from "@/navigation";
import UsersIcon from "@/components/icons/UsersIcon";
import UserIcon from "@/components/icons/UserIcon";


const Nav= ()=>{


    return(
        <div className="navbar bg-base-100 justify-around">
            <div className="navbar-start pl-8">
                <div className="dropdown">
                    <img
                        src={"/pom.png"}
                        alt={".."}
                        className={"md:w-16 md:h-16 w-10 h-10"}
                    />
                </div>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 font-semibold text-[15px]">
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/'}>About</Link></li>
                    <li><Link href={'/'}>Services</Link></li>
                    <li><Link href={'/'}>Blood Bank</Link></li>
                    <li><Link href={'/'}>Contact</Link></li>
                </ul>
            </div>
            <div className="navbar-end pr-8">

                    <div><UserIcon className={'w-6 h-6 fill-[#013567]'}/></div>

            </div>
        </div>
    )
}

export default Nav