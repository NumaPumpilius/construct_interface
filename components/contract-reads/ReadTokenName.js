import React from 'react'
import { useContractRead } from 'wagmi';
import ERC20 from '../abis/ERC20.json';

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const ReadTokenName = ({ address }) => {
    const { data } = useContractRead({
        ...tokenContractConfig,
        addressOrName: address,
        functionName: "name",
    })

    return (
        <div>{data}</div>
    )
}

export default ReadTokenName