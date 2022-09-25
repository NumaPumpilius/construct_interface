import React from 'react'

const style = {
    buttonContainer: /*tw*/ "bg-[#D65A31] rounded-2xl text-white items-center flex justify-center font-semibold",
}

const DepositButton = () => {
    return (
        <div className={style.buttonContainer}>Deposit/Withdraw</div>
    );
}

export default DepositButton