import React, { useState } from 'react'
import VaultsTable from '../components/strategies/VaultsTable'
import DepositModal from '../components/strategies/DepositModal'

const style = {
    wrapper: /*tw*/ "mx-auto text-white bg-black items-center flex flex-col w-full",
}

const strategies = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState(null);

    return (
        <div className={style.wrapper}>
            <VaultsTable setOpenModal={setOpenModal} setSelectedStrategy={setSelectedStrategy} />
            {openModal && <DepositModal selectedStrategy={selectedStrategy} setOpenModal={setOpenModal} />}
        </div>
    )
}

export default strategies