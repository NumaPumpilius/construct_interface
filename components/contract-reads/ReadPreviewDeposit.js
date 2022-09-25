import React from 'react'
import { useContractRead } from "wagmi";
import ConstructStrategy from '../abis/ConstructStrategy.json';

const ReadPreviewDeposit = ({ strategyAddress, depositValue }) => {
    const strategyContractConfig = {
        contractInterface: ConstructStrategy.abi,
    }

    const { data } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "previewDeposit",
        args: depositValue,
        select: (data) => data.toString(),
    })

    return (
        <div>{data}</div>
    )
}

export default ReadPreviewDeposit