import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiOutlineSelector } from 'react-icons/hi';

const assets = [
    { name: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { name: 'WBTC', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
    { name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
    { name: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
    { name: 'CRV', address: '0xD533a949740bb3306d119CC777fa900bA034cd52' },
    { name: 'cvxcrv-f', address: '0x9D0464996170c6B9e75eED71c68B99dDEDf279e8' },
    { name: 'Other', address: '' },
];

const AssetSelector = ({ selectedPath, setSelectedPath }) => {
    const [selectedAddress, setSelectedAddress] = useState("");

    const handleChange = e => {
        setSelectedAddress(e.target.value);
        setSelectedPath({ name: "Other", address: e.target.value });
    }

    return (
        <div>
            <div className='text-xl font-semibold'>
                Select Asset
            </div>
            <div className="w-80 h-12 border-[#D65A31] rounded-2xl border-2 my-4">
                <Listbox value={selectedPath} onChange={setSelectedPath}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg text-center h-9 font-semibold">
                            <span className="block truncate">{selectedPath.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiOutlineSelector
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#393E46] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                                {assets.map((asset, assetIdx) => (
                                    <Listbox.Option
                                        key={assetIdx}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 ${active ? 'bg-[#D65A31] text-white' : 'text-white'
                                            }`
                                        }
                                        value={asset}
                                    >
                                        {({ selectedPath }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selectedPath ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {asset.name}
                                                </span>
                                                {selectedPath ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                        <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            {
                selectedPath.name === 'Other' &&
                <form className="flex justify-center items-center">
                    <input
                        type="text"
                        name="address"
                        id="address"
                        onChange={handleChange}
                        value={selectedAddress}
                        placeholder="0x..."
                        className="w-80 bg-black rounded-xl p-2 my-4"
                    />
                </form>
            }
        </div>
    )
}

export default AssetSelector;
