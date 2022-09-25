import React, { useState, useEffect, useContext } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NavContext } from '../context/navContext';

const style = {
    wrapper: /*tw*/ "items-center justify-center flex mt-4 fixed right-0 ml-60 w-5/6",
    headerContainer: /*tw*/ "flex w-5/6 justify-between items-center bg-[#222831] px-4 py-2 rounded-2xl",
    buttonsContainer: /*tw*/ "",
    navItemContainer: /*tw*/ "flex text-white text-2xl font-bold",
}

const Header = () => {
    const [selectedNav, setSelectedNav] = useContext(NavContext);

    return (
        <div className={style.wrapper}>
            <div className={style.headerContainer}>
                <div className={style.navItemContainer}>
                    <h3>{selectedNav}</h3>
                </div>
                <div className={style.buttonsContainer}>
                    <ConnectButton accountStatus="address" />
                </div>
            </div>
        </div>
    )
};

export default Header;