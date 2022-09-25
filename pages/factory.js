import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Modal from '../components/factory/Modal';
import UnselectedCog from '../components/factory/UnselectedCog';
import SelectedCog from '../components/factory/SelectedCog';
import Summary from '../components/factory/Summary';
import { BiUndo } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';


const style = {
    wrapper: /*tw*/ "flex flex-row w-5/6 justify-between",
    constructor: /*tw*/ "flex flex-col overflow-auto items-end justify-start w-1/3 text-center mb-28",
    constructorHeader: /*tw*/ "font-semibold text-[#D65A31]",
}



const Factory = () => {

    const { address } = useAccount();
    const [openModal, setOpenModal] = useState(false);
    const [moduleType, setModuleType] = useState(false); // false = asset, true = module
    const [pathAddress, setPathAddress] = useState([]);
    const [pathName, setPathName] = useState([]);

    const addPath = (eAddress, eName) => {
        const newPathAddress = [...pathAddress, eAddress];
        const newPathName = [...pathName, eName];
        setPathAddress(newPathAddress);
        setPathName(newPathName);
        setModuleType(!moduleType);
        console.log(newPathAddress);
    }

    const undoPath = () => {
        if (pathAddress.length > 0) {
            const newPathAddress = [...pathAddress].filter((path, idx) => idx !== pathAddress.length - 1);
            const newPathName = [...pathName].filter((path, idx) => idx !== pathName.length - 1);
            setPathAddress(newPathAddress);
            setPathName(newPathName);
            setModuleType(!moduleType);
            console.log(newPathAddress);
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.constructor}>
                <div className="items-center">
                    <div className={style.constructorHeader}>
                        {moduleType ? "Select Module" : "Select Asset"}
                    </div>
                    <div>
                        <div>
                            {pathName.map((path, index) => (
                                <SelectedCog path={path} key={index} />
                            ))}
                        </div>
                        <UnselectedCog setOpenModal={setOpenModal} />
                    </div>
                    {openModal && <Modal setOpenModal={setOpenModal} setModuleType={setModuleType} moduleType={moduleType} addPath={addPath} />}
                </div>
            </div>
            <Summary pathName={pathName} pathAddress={pathAddress} undoPath={undoPath} setModuleType={setModuleType} />
        </div>
    )
}

export default Factory
