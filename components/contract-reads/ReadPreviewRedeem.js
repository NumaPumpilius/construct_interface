import React from 'react'
import { useContractRead } from "wagmi";
import ConstructStrategy from '../abis/ConstructStrategy.json';

const ReadPreviewRedeem = ({ strategyAddress, redeemValue }) => {
    const strategyContractConfig = {
        contractInterface: ConstructStrategy.abi,
    }

    const { data } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "previewRedeem",
        args: redeemValue,
        select: (data) => data.toString(),
    })

    return (
        <div>{data}</div>
    )
}

export default ReadPreviewRedeem