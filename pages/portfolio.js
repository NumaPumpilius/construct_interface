import React, { useContext } from 'react';
import { NavContext } from '../context/navContext';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

const style = {
    wrapper: /*tw*/ "flex flex-col items-center h-full w-full",
    summaryContainer: /*tw*/ "flex flex-row flex-wrap w-5/6 justify-between rounded-2xl bg-[#222831] p-2",
    summaryBlock: /*tw*/ "flex flex-col basis-1/4 px-2",
    summaryText: /*tw*/ " text-white py-2",
    summaryNumber: /*tw*/ "text-2xl font-bold text-white py-2",
    vaultsContainer: /*tw*/ "w-5/6 flex flex-row flex-wrap justify-between rounded-2xl bg-[#222831] p-2 m-6",
    vaultsHeader: /*tw*/ "flex justify-start text-white font-semibold text-xl p-2",
}

const Portfolio = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.summaryContainer}>
                <div className={style.summaryBlock}>
                    <div className={style.summaryText}>
                        Total net worth
                    </div>
                    <div className={style.summaryNumber}>
                        $1,000,000
                    </div>
                </div>
                <div className={style.summaryBlock}>
                    <div className={style.summaryText}>
                        Available After Deposit
                    </div>
                    <div className={style.summaryNumber}>
                        $1,000,000
                    </div>
                </div>
                <div className={style.summaryBlock}>
                    <div className={style.summaryText}>
                        Vaults earnings
                    </div>
                    <div className={style.summaryNumber}>
                        $1,000,000
                    </div>
                </div>
                <div className={style.summaryBlock}>
                    <div className={style.summaryText}>
                        Vaults est. yearly yield
                    </div>
                    <div className={style.summaryNumber}>
                        $1,000,000
                    </div>
                </div>
            </div>
            <div className={style.vaultsContainer}>
                <div className={style.vaultsHeader}>
                    Vaults
                </div>
            </div >
        </div >
    )
}

export default Portfolio;