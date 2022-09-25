import React from 'react'
import { useContractRead } from 'wagmi';
import ERC20 from '../abis/ERC20.json';

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const ReadTokenSymbol = ({ assetAddress }) => {
    const { data } = useContractRead({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "symbol",
    })

    return (
        <div>{data}</div>
    )
}

export default ReadTokenSymbol