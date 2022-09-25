import React from 'react'
import { useContractRead, useAccount } from 'wagmi';
import ERC20 from '../abis/ERC20.json';

const tokenContractConfig = {
    contractInterface: ERC20.abi,
}

const ReadTokenBalance = ({ assetAddress }) => {

    const { address } = useAccount();

    const { data: decimals } = useContractRead({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "decimals",
    });

    const { data: balance } = useContractRead({
        ...tokenContractConfig,
        addressOrName: assetAddress,
        functionName: "balanceOf",
        args: address,
        select: (data) => (Math.floor(((parseInt(data.toString()) / 10 ** decimals) * 100)) / 100).toString(),
    })

    return (
        <div>{balance}</div>
    )
}

export default ReadTokenBalance