import React, { useState, useEffect } from 'react';
import { BiUndo } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractEvent,
    useContractRead
} from 'wagmi';
import ModuleFactory from '../abis/ModuleFactory.json';

const style = {
    wrapper: /*tw*/ "flex flex-col items-end w-4/5 text-center justify-start static lef-0",
    summaryContainer: /*tw*/ "bg-[#222831] rounded-2xl w-3/4 p-2 pb-12",
    summaryHeader: /*tw*/ "text-xl font-semibold",
    summaryTableRow: /*tw*/ "grid grid-cols-3 gap-2 justify-items-center items-center m-2 w-full",
    summaryTableHeader: /*tw*/ "w-full text-center truncate border-b border-[#393e46] text-[#D65A31] p-2",
    summaryTableElement: /*tw*/ "w-full text-center truncate border-b border-[#393e46] pb-2 text-xs",
    summmaryNumbers: /*tw*/ "text-center items-center border-b border-[#393e46] text-[#D65A31] p-3",
    summaryButtons: /*tw*/ "flex flex-row justify-start items-center w-3/4 mt-4",
    summaryButtonUndo: /*tw*/ "bg-[#393E46] rounded-2xl border-2 border-[#D65A31] text-white p-2 mr-10 flex flex-row font-semibold w-1/2 items-center justify-center hover:scale-105",
    summaryButtonSubmit: /*tw*/ "bg-[#D65A31] rounded-2xl border-2 border-[#D65A31] text-white p-2 flex flex-row font-semibold w-1/2 items-center justify-center hover:scale-105",
    buttonIcons: /*tw*/ "text-xl ml-2",
}

const contractConfig = {
    addressOrName: "0x00490A0c45D7e23f09CC9F36c0374F28E41579Dd",
    contractInterface: ModuleFactory.abi,
}

const Summary = ({ pathName, pathAddress, undoPath }) => {

    const [strategyAddress, setStrategyAddress] = useState(null);
    const [strategyName, setStrategyName] = useState(null);
    const [strategyList, setStrategyList] = useState([]);

    useContractEvent({
        ...contractConfig,
        eventName: "CreateStrategy",
        listener: (event) => {
            console.log("Created Strategy Event:");
            console.log(event);
            setStrategyAddress(event[2]);
            setStrategyName(event[3]);
        }
    })

    const { config } = usePrepareContractWrite({
        ...contractConfig,
        functionName: 'createStrategy',
        args: [pathAddress],
        overrides: {
            gasLimit: 5000000,
        }
    });

    const { data: strategiesRead } = useContractRead({
        ...contractConfig,
        functionName: "getAllStrategies",
        watch: true,
        select: (data) => {
            console.log(data);
            console.log(typeof data);
            return [data[0], data[1], data[2]];
        }
    })

    const { data, write, error } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const summaryUndoPath = () => {
        undoPath();
        setStrategyAddress(null);
    }

    const summaryCreateStrategy = () => {
        write?.();
        if (error) {
            console.log("Error: ", error);
        }
    }

    React.useEffect(() => {
        if (strategiesRead) {
            setStrategyList(strategiesRead);
            console.log("Strategies Read: ", typeof strategiesRead[0]);
        }
    });

    return (
        <div className={style.wrapper}>
            <div className={style.summaryContainer}>
                <div className={style.summaryHeader}>
                    Strategy Summary
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col pl-2'>
                        <div className="text-center border-b border-[#393e46] text-[#D65A31] p-2 mt-2">#</div>
                        {
                            [...Array(parseInt(pathName.length === 1 ? 1 : pathName.length / 2))].map((e, i) => (
                                <div key={i} className={style.summmaryNumbers}>{i + 1}</div>
                            ))
                        }
                    </div>
                    <div className={style.summaryTableRow}>
                        <div className={style.summaryTableHeader}>Asset</div>
                        <div className={style.summaryTableHeader}>Module</div>
                        <div className={style.summaryTableHeader}>Product</div>
                        {
                            pathName.map((path, index) => (
                                (index === 0 || index % 2 === 1 || index === pathName.length - 1) ?
                                    <div className={style.summaryTableElement}>
                                        <div>
                                            {path}
                                        </div>
                                        <div>
                                            {
                                                pathAddress[index].split('').reduce((prev, curr, idx) => {
                                                    if (idx < 6 || idx > 37) {
                                                        return prev + curr;
                                                    } else if (idx < 9) {
                                                        return prev + '.';
                                                    } else {
                                                        return prev;
                                                    }

                                                }, '')
                                            }
                                        </div>
                                    </div>
                                    :
                                    [...Array(2)].map((e, i) => (
                                        <div className={style.summaryTableElement}>
                                            <div>
                                                {path}
                                            </div>
                                            <div>
                                                {
                                                    pathAddress[index].split('').reduce((prev, curr, idx) => {
                                                        if (idx < 6 || idx > 37) {
                                                            return prev + curr;
                                                        } else if (idx < 9) {
                                                            return prev + '.';
                                                        } else {
                                                            return prev;
                                                        }

                                                    }, '')
                                                }
                                            </div>
                                        </div>
                                    ))
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={style.summaryButtons}>
                <div
                    className={style.summaryButtonUndo}
                    onClick={() => summaryUndoPath()}
                >
                    Undo
                    <BiUndo className={style.buttonIcons} />
                </div>
                <div
                    className={style.summaryButtonSubmit}
                    onClick={() => summaryCreateStrategy()}
                >
                    {isLoading ? 'Submitting...' : 'Submit Strategy'}
                </div>
            </div>
            {error && console.log(error.message)}
            {isSuccess && console.log(data)}
            {strategyAddress !== null && (
                <div className=''>
                    Succesfully created strategy
                    <div>
                        {strategyName}
                    </div>
                    <div>
                        {strategyAddress}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Summary