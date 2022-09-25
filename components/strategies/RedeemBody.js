import React, { useEffect, useState } from 'react';
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
import ReadPreviewRedeem from '../contract-reads/ReadPreviewRedeem';
import ConstructStrategy from '../abis/ConstructStrategy.json';
import ERC20 from '../abis/ERC20.json';

const style = {
    wrapper: /*tw*/ "",
    header: /*tw*/ "flex flex-row justify-start",
    headerElement: /*tw*/ "pr-4",
    form: /*tw*/ "w-80 bg-black rounded-xl p-2 my-4",
    preview: /*tw*/ "flex flex-row justify-start",
    footer: /*tw*/ "flex flex-row w-80 justify-center pt-4 pb-4 items-center",
    activeButton: /*tw*/ "rounded-2xl bg-[#D65A31] w-2/5 h-10 flex items-center justify-around border-2 border-[#D65A31] hover:scale-105",
}

const strategyContractConfig = {
    contractInterface: ConstructStrategy.abi,
}

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const RedeemBody = ({ selectedStrategy }) => {
    const [value, setValue] = useState(0); // integer state



    function useForceUpdate() {
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here 
        // is better than directly setting `value + 1`
    }

    const [redeemValue, setredeemValue] = useState(0);

    const [redeemedAmount, setRedeemedAmount] = useState(0);

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
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        eventName: "Withdraw",
        listener: (event) => {
            console.log("Redeem Event:", event);
            if (event[0] === address) {
                setRedeemedAmount(event[3]);
                useForceUpdate();
            }
        }
    })

    const { config: redeemConfig } = usePrepareContractWrite({
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        functionName: "redeem",
        args: [getBigNumberDeposit(redeemValue), address, address],
        overrides: {
            gasLimit: 1000000,
        }
    })

    const { data: redeemData, write: redeem, error: redeemError } = useContractWrite(redeemConfig);

    const { isLoading: isLoadingRedeem } = useWaitForTransaction({
        hash: redeemData?.hash,
    })

    const doRedeem = () => {
        redeem?.();
        console.log("Redeem Data: ", redeemData);
        if (redeemError) {
            console.log("Redeem Error: ", redeemError);
        }
    }

    const handleChange = e => {
        setredeemValue(e.target.value);
    }

    const { data: previewRedeemData } = useContractRead({
        ...strategyContractConfig,
        addressOrName: selectedStrategy,
        functionName: "previewRedeem",
        args: redeemValue,
        select: (data) => data.toString(),
    })

    useEffect(() => {
        console.log("Redeem Value: ", redeemedAmount)
    }, [redeemedAmount])

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerElement}>Your strategy balance:</div>
                <div className={style.headerElement}><ReadTokenBalance assetAddress={selectedStrategy} /></div>
                <div className={style.headerElement}><ReadTokenSymbol assetAddress={selectedStrategy} /></div>
            </div>
            <div className={style.header}>
                <div className={style.headerElement}>Your asset balance:</div>
                <div className={style.headerElement}><ReadTokenBalance assetAddress={assetAddress} /></div>
                <div className={style.headerElement}><ReadTokenSymbol assetAddress={assetAddress} /></div>
            </div>
            <form>
                <input
                    type="number"
                    name="redeemValue"
                    id="redeemValue"
                    onChange={handleChange}
                    value={redeemValue}
                    placeholder="0.00"
                    className={style.form}
                />
            </form>

            <div className={style.preview}>
                <div className={style.headerElement}>Preview Redeem:</div>
                <div className={style.headerElement}>{previewRedeemData}</div>
                <div className={style.headerElement}><ReadTokenSymbol assetAddress={assetAddress} /></div>
            </div>
            <div className={style.footer}>
                <div
                    className={style.activeButton}
                    onClick={() => doRedeem()}
                    disabled={!redeem}
                >
                    {isLoadingRedeem ? 'Redeeming...' : 'Redeem'}
                </div>
            </div>
        </div >
    )
}

export default RedeemBody