import React from 'react'
import { useContractRead } from "wagmi";
import ConstructStrategy from '../abis/ConstructStrategy.json';

const ReadStrategy = ({ strategyAddress }) => {
    const strategyContractConfig = {
        contractInterface: ConstructStrategy.abi,
    }


    const { data } = useContractRead({
        ...strategyContractConfig,
        addressOrName: strategyAddress,
        functionName: "name",
    })

    return (
        <div>{data}</div>
    )
}

export default ReadStrategy