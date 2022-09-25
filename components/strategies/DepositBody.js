import React, { useState, useEffect } from 'react';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useContractEvent,
    useWaitForTransaction,
} from "wagmi";
import { BigNumber } from "ethers";
import ReadTokenSymbol from '../contract-reads/ReadTokenSymbol';
import ReadTokenBalance from '../contract-reads/ReadTokenBalance';
import ConstructStrategy from '../abis/ConstructStrategy.json';
import ERC20 from '../abis/ERC20.json';

const style = {
    wrapper: /*tw*/ "",
    header: /*tw*/ "flex flex-row justify-start",
    headerElement: /*tw*/ "pr-4",
    form: /*tw*/ "w-80 bg-black rounded-xl p-2 my-4",
    preview: /*tw*/ "flex flex-row justify-start",
    footer: /*tw*/ "flex flex-row w-80 justify-between pt-4 pb-4",
    activeButton: /*tw*/ "rounded-2xl bg-[#D65A31] w-2/5 h-10 flex items-center justify-around border-2 border-[#D65A31] hover:scale-105",
    inactiveButton: /*tw*/ "rounded-2xl bg-[#393E46] w-2/5 h-10 flex items-center justify-around border-2 border-[#393E46]",
}

const strategyContractConfig = {
    contractInterface: ConstructStrategy.abi,
}

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const DepositBody = ({ selectedStrategy }) => {
    const [value, setValue] = useState(0); // integer state

    function useForceUpdate() {
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here 
        // is better than directly setting `value + 1`
    }

    const [depositValue, setDepositValue] = useState(0);

    const [depositedAmount, setDepositedAmount] = useState(0);

    const [approved, setApproved] = useState(false);

    const { address } = useAccount();

    const { data: assetAddress } = useContractRead({
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        functionName: "asset",
    });

    const { data: assetDecimals } = useContractRead({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "decimals",
    })

    const { data: assetBalance } = useContractRead({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "balanceOf",
        args: address,
        select: (data) => {
            if (data == 0) {
                return parseInt(0);
            } else {
                return parseInt(data.toString().slice(0, -assetDecimals))
            }
        },
    })

    const { data: strategyBalance } = useContractRead({
        ...tokenContractConfig,
        addressOrName: selectedStrategy,
        functionName: "balanceOf",
        args: address,
        select: (data) => {
            if (data == 0) {
                return parseInt(0);
            } else {
                return parseInt(data.toString().slice(0, -assetDecimals))
            }
        },
    })

    const getBigNumberDeposit = (deposit) => {
        if (deposit == '') {
            return BigNumber.from(0);
        } else {
            let bnDeposit = BigNumber.from(deposit);
            let bnDecimals = BigNumber.from(assetDecimals);
            let bnMultiplier = BigNumber.from(10).pow(bnDecimals);
            return bnDeposit.mul(bnMultiplier);
        }
    }

    useContractEvent({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        eventName: "Approval",
        listener: (event) => {
            console.log("Approval Event:", event);
            if (event[0] === address && event[1] === selectedStrategy) {
                setApproved(true);
            }
        }
    })

    useContractEvent({
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        eventName: "Deposit",
        listener: (event) => {
            console.log("Deposit Event:", event);
            if (event[0] === address) {
                setDepositedAmount(event[2]);
                useForceUpdate();
            }
        }
    })


    const { config: approveConfig } = usePrepareContractWrite({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "approve",
        args: [selectedStrategy, BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")],
    })

    const { config: depositConfig } = usePrepareContractWrite({
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        functionName: "deposit",
        args: [getBigNumberDeposit(depositValue), address],
        overrides: {
            gasLimit: 1000000,
        }
    })

    const { data: approveData, write: approve, error: approveError } = useContractWrite(approveConfig);

    const { data: depositData, write: deposit, error: depositError } = useContractWrite(depositConfig);

    const { isLoading: isLoadingApprove } = useWaitForTransaction({
        hash: approveData?.hash,
    })

    const { isLoading: isLoadingDeposit } = useWaitForTransaction({
        hash: depositData?.hash,
    })

    const doApprove = () => {
        approve?.();
        if (approveError) {
            console.log("Approve Error: ", approveError);
        }
    }

    const doDeposit = () => {
        deposit?.();
        console.log("Deposit Data: ", depositData);
        if (depositError) {
            console.log("Deposit Error: ", depositError);
        }
    }

    const handleChange = e => {
        setDepositValue(e.target.value);
    }

    const { data: previewDepositData } = useContractRead({
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        functionName: "previewDeposit",
        args: depositValue,
        select: (data) => data.toString(),
    })

    useEffect(() => {
        console.log("Redeem Value: ", depositedAmount)
    }, [depositedAmount])

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerElement}>Your asset balance:</div>
                <div className={style.headerElement}>{assetBalance}</div>
                <div className={style.headerElement}><ReadTokenSymbol assetAddress={assetAddress} /></div>
            </div>
            <div className={style.header}>
                <div className={style.headerElement}>Your strategy balance:</div>
                <div className={style.headerElement}>{strategyBalance}</div>
                <div className={style.headerElement}><ReadTokenSymbol assetAddress={selectedStrategy} /></div>
            </div>
            <form>
                <input
                    type="number"
                    name="depositValue"
                    id="depositValue"
                    onChange={handleChange}
                    value={depositValue}
                    placeholder="0.00"
                    className={style.form}
                />
            </form>

            <div className={style.preview}>
                <div className={style.headerElement}>Preview Deposit:</div>
                <div className={style.headerElement}>{previewDepositData}</div>
                <div className={style.headerElement}><ReadTokenSymbol assetAddress={selectedStrategy} /></div>
            </div>
            <div className={style.footer}>
                <div
                    className={`${approved ? style.inactiveButton : style.activeButton}`}
                    onClick={() => doApprove()}
                    disabled={!approve || approved}
                >
                    {isLoadingApprove ? 'Approving...' : 'Approve'}
                </div>
                <div
                    className={`${approved ? style.activeButton : style.inactiveButton}`}
                    onClick={() => doDeposit()}
                    disabled={!deposit || !approved}
                >
                    {isLoadingDeposit ? 'Depositing...' : 'Deposit'}
                </div>
            </div>
            {depositedAmount > 0 && <div className={style.depositSuccess}>Deposit Successful!</div>}
        </div >
    )
}

export default DepositBody