import React from 'react'
import { useContractRead } from 'wagmi';
import ERC20 from '../abis/ERC20.json';
import ConstructStrategy from '../abis/ConstructStrategy.json';

const tokeContractConfig = {
    contractInterface: ERC20.abi,
}

const strategyContractConfig = {
    contractInterface: ConstructStrategy.abi,
}

const ReadStrategyAsset = ({ strategyAddress }) => {

    const { data: assetAddress } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "asset",
    })

    const { data } = useContractRead({
        ...tokeContractConfig,
        addressOrName: assetAddress,
        functionName: "symbol",
    })

    return (
        <div>{data}</div>
    )
}

export default ReadStrategyAsset