import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ModuleSelector from './ModuleSelector';
import AssetSelector from './AssetSelector';

const style = {
    modalBackground: /*tw*/ "fixed flex w-screen h-screen justify-center items-center bg-black bg-opacity-90 top-0 left-0",
    modalContainer: /*tw*/ "absoulute flex flex-col bg-[#222831] rounded-2xl justify-around items-center py-8 px-8",
    title:  /*tw*/ "",
    body:  /*tw*/ "flex justify-center",
    footer:  /*tw*/ "flex flex-row w-80 justify-between pt-4",
    overlay: /*tw*/ "absolute w-screen h-screen top-0 left-0",
}

const Modal = ({ setOpenModal, addPath, moduleType, }) => {
    const [selectedPath, setSelectedPath] = useState([]);

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <div className={style.body}>
                    {moduleType ? <ModuleSelector selectedPath={selectedPath} setSelectedPath={setSelectedPath} /> : <AssetSelector selectedPath={selectedPath} setSelectedPath={setSelectedPath} />}
                </div>
                <div className={style.footer}>
                    <div
                        className='rounded-2xl bg-[#393E46] w-2/5 h-10 flex items-center justify-around border-2 border-[#D65A31] hover:scale-105'
                        onClick={() => setOpenModal(false)}
                    >
                        Cancel
                    </div>
                    <div
                        className='rounded-2xl bg-[#D65A31] w-2/5 h-10 flex items-center justify-around border-2 border-[#D65A31] hover:scale-105'
                        onClick={() => {
                            addPath(selectedPath.address, selectedPath.name)
                            setOpenModal(false)
                        }}
                    >
                        Confirm
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal