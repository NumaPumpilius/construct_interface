import React, { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { IoConstructOutline } from "react-icons/io5";
import { BsSafe2 } from "react-icons/bs";
import { AiOutlinePieChart, AiOutlineStock } from "react-icons/ai";
import { NavContext } from "../context/navContext";
import construct_logo from "../assets/construct_logo.png";
import Link from 'next/link';

const style = {
    wrapper: /*tw*/ "bg-[#222831] h-full w-1/6 flex flex-col justify-start item-center fixed",
    header: /*tw*/ "flex flex-row items-center justify-center py-8 text-xl text-center cursor-pointer font-bold text-[#D65A31] border-b border-[#393E46] pb-4 w-full",
    border: /*tw*/ "my-4 border-b border-[#393E46] pb-4",
    navItem: /*tw*/ "flex mb-2 justify-start items-center gap-4 pl-5 text-[#EEEEEE] hover:bg-[#393E46] hover:text-[#D65A31] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto",
    navIcon: /*tw*/ "text-2xl",
    navText: /*tw*/ "text-base font-semibold",
    navItemActive: /*tw*/ "bg-[#D65A31] hover:bg-[#D65A31] hover:text-[#EEEEEE]",
}

function Navbar() {
    const [selectedNav, setSelectedNav] = useContext(NavContext);

    return (
        <div className={style.wrapper}>
            <h1 className={style.header}>
                <Image src={construct_logo} alt="construct_logo" width={30} height={30} />
                <div className="px-4">Construct Finance</div>
            </h1>
            <div className={style.border}>
                <Link href="/strategies">
                    <div
                        onClick={() => setSelectedNav('Strategies')}
                        className={`${style.navItem} ${selectedNav === 'Strategies' && style.navItemActive
                            }`}
                    >
                        <AiOutlineStock className={style.navIcon} />
                        <h3 className={style.navText}>
                            Strategies
                        </h3>
                    </div>
                </Link>
                <Link href="/factory">
                    <div
                        onClick={() => setSelectedNav('Factory')}
                        className={`${style.navItem} ${selectedNav === 'Factory' && style.navItemActive
                            }`}
                    >
                        <IoConstructOutline className={style.navIcon} />
                        <h3 className={style.navText}>
                            Factory
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
    );
}


export default Navbar;