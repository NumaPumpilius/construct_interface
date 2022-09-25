import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import ReadStrategy from '../contract-reads/ReadStrategy';
import ReadAvailableToDeposit from '../contract-reads/ReadAvailableToDeposit';
import ReadStrategyAsset from '../contract-reads/ReadStrategyAsset';
import ReadStrategyAPY from '../contract-reads/ReadStrategyAPY';
import ReadTokenBalance from '../contract-reads/ReadTokenBalance';
import DepositButton from './DepositButton';
import ModuleFactory from '../abis/ModuleFactory.json';
import ConstructStrategy from '../abis/ConstructStrategy.json';

const style = {
    wrapper: /*tw*/ "mx-auto text-white bg-black items-center flex flex-col w-full",
    table: /*tw*/ "w-5/6 bg-[#222831] rounded-2xl table-auto p-10",
    tableHead: /*tw*/ "text-left p-4",
    tableBody: /*tw*/ "p-10",
    tableComponent: /*tw*/ "px-4 py-2",
    headerComponent: /*tw*/ "px-4 py-2 text-[#D65A31]",


}

const factoryContractConfig = {
    addressOrName: "0x00490A0c45D7e23f09CC9F36c0374F28E41579Dd",
    contractInterface: ModuleFactory.abi,
}

const strategyContractConfig = {
    contractInterface: ConstructStrategy.abi,
}



const VaultsTable = ({ setOpenModal, setSelectedStrategy }) => {

    const [strategyList, setStrategyList] = useState([]);

    const { data: strategiesRead } = useContractRead({
        ...factoryContractConfig,
        functionName: "getAllStrategies",
        watch: true,
    })

    const openDeposit = (a) => {
        setSelectedStrategy(a);
        setOpenModal(true);
        console.log("Open Deposit: ", a);
    }

    useEffect(() => {
        setStrategyList(strategiesRead);
    })


    return (
        <div className={style.wrapper}>
            <table className={style.table}>
                <thead>
                    <tr className={style.tableHead}>
                        <th className={style.headerComponent}>Id</th>
                        <th className={style.headerComponent}>Asset</th>
                        <th className={style.headerComponent}>TVL</th>
                        <th className={style.headerComponent}>Deposited</th>
                        <th className={style.headerComponent}>Available to deposit</th>
                        <th className={style.headerComponent}></th>
                    </tr>
                </thead>
                <tbody className={style.tableBody}>
                    {
                        strategyList.map((strategy, index) => (
                            <tr key={index}>
                                <td className={style.tableComponent}>
                                    {index + 1}
                                </td>
                                <td className={style.tableComponent}>
                                    <ReadStrategyAsset strategyAddress={strategy} />
                                </td>
                                <td className={style.tableComponent}>
                                    <ReadStrategy strategyAddress={strategy} />
                                </td>
                                <td>
                                    <ReadTokenBalance assetAddress={strategy} />
                                </td>
                                <td className={style.tableComponent}>
                                    <ReadAvailableToDeposit strategyAddress={strategy} />
                                </td>
                                <td
                                    className={style.tableComponent}
                                    onClick={() => openDeposit(strategy)}
                                >
                                    <DepositButton />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VaultsTable;