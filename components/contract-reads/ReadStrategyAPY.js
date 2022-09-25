import React from 'react'
import { useContractRead } from "wagmi";
import ConstructStrategy from '../abis/ConstructStrategy.json';
import ERC20 from '../abis/ERC20.json';

const strategyContractConfig = {
    contractInterface: ConstructStrategy.abi,
}

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const ReadStrategyAPY = ({ strategyAddress }) => {

    const { data: decimals } = useContractRead({
        ...tokenContractConfig,
        addressOrName: strategyAddress,
        functionName: "decimals",
    });

    const { data } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "getStrategyApr",
        select: (data) => (Math.floor(parseInt(data.toString()) / 10 ** decimals) / 100).toString() + "%",
    })
    return (
        <div>{data}</div>
    )
}

export default ReadStrategyAPY