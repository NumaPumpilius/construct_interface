import React from 'react'
import { useContractRead } from "wagmi";
import ConstructStrategy from '../abis/ConstructStrategy.json';

const ReadStrategy = ({ strategyAddress }) => {
    const strategyContractConfig = {
        contractInterface: ConstructStrategy.abi,
    }

    const { data: decimals } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "decimals",
    });

    const { data } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "totalAssets",
        select: (data) => (Math.floor(((parseInt(data.toString()) / 10 ** decimals) * 100)) / 100).toString(),
    })

    return (
        <div>{data}</div>
    )
}

export default ReadStrategy