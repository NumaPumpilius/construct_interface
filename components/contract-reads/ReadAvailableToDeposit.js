import React from 'react'
import { useContractRead, useAccount } from 'wagmi';
import ERC20 from '../abis/ERC20.json';
import ConstructStrategy from '../abis/ConstructStrategy.json';

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const strategyContractConfig = {
    contractInterface: ConstructStrategy.abi,
}

const ReadAvailableToDeposit = ({ strategyAddress }) => {
    const { address } = useAccount();

    const { data: decimals } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "decimals",
    });

    const { data: assetAddress } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "asset",
    })

    const { data } = useContractRead({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "balanceOf",
        args: address,
        select: (data) => (Math.floor(((parseInt(data.toString()) / 10 ** decimals) * 100)) / 100).toString(),
    })

    return (
        <div>{data}</div>
    )
}

export default ReadAvailableToDeposit