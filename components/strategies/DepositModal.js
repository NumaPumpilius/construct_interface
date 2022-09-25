import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import DepositBody from './DepositBody';
import RedeemBody from './RedeemBody';
import { AiOutlineClose } from 'react-icons/ai';
import ReadStrategyName from '../contract-reads/ReadStrategyName';

const style = {
    modalBackground: /*tw*/ "fixed flex w-screen h-screen justify-center items-center bg-black bg-opacity-90 top-0 left-0",
    modalContainer: /*tw*/ "absoulute flex flex-col bg-[#222831] rounded-2xl justify-around items-center p-2 w-2/5",
    modalHeader: /*tw*/ "py-2 flex flex-row justify-between",
    stategyName: /*tw*/ "font-bold text-[#D65A31]",
    closeButton: /*tw*/ "text-xl static ml-20 hover:text-[#D65A31]",
    modalSelector: /*tw*/ "flex flex-row py-4",
    selectorElement: /*tw*/  "text-xl px-4 border-b-2",
    selectedSelector: /*tw*/ "text-xl px-4 border-b-2 border-[#D65A31] text-[#D65A31]",
    modalBody: /*tw*/ "",
}

const DepositModal = ({ selectedStrategy, setOpenModal }) => {
    const [selectDeposit, setSelectDeposit] = useState(true);
    const [approved, setApproved] = useState(false);


    const { address } = useAccount();

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <div className={style.stategyName}>
                        <ReadStrategyName strategyAddress={selectedStrategy} />
                    </div>
                    <div className={style.closeButton} onClick={() => setOpenModal(false)}>
                        <AiOutlineClose />
                    </div>
                </div>
                <div className={style.modalSelector}>
                    <div
                        onClick={() => setSelectDeposit(true)}
                        className={`${style.selectorElement} ${selectDeposit ? style.selectedSelector : ''}`}
                    >
                        Deposit
                    </div>
                    <div
                        onClick={() => setSelectDeposit(false)}
                        className={`${style.selectorElement} ${selectDeposit ? '' : style.selectedSelector}`}
                    >
                        Redeem
                    </div>
                </div>
                <div className={style.modalBody}>
                    {selectDeposit ? <DepositBody selectedStrategy={selectedStrategy} /> : <RedeemBody addess={address} selectedStrategy={selectedStrategy} />}
                </div>
            </div>
        </div>
    )
}

export default DepositModal