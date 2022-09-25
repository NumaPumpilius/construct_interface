import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiOutlineSelector } from 'react-icons/hi';

const modules = [
    { name: 'Aave Biasset Module', address: '0x0B92A873B45767e1c77A6b82C2d0E9E8F0FC3656' },
    { name: 'Curve Plain Pool Module', address: '0x432b5185255eBeBfDDbEF768dC156181FdC26f5d' },
    { name: 'Yearn Convex Module', address: '0x40CeA07BFD50327c1bc8ab4E5198875ce6766799' },
    { name: 'Other', address: '' },
];

const ModuleSelector = ({ selectedPath, setSelectedPath }) => {
    const [selectedAddress, setSelectedAddress] = useState("");

    const handleChange = e => {
        setSelectedAddress(e.target.value);
        setSelectedPath({ name: "Other", address: e.target.value });
    }

    return (
        <div>
            <div className='text-xl font-semibold'>
                Select Module
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
                                {modules.map((asset, assetIdx) => (
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

export default ModuleSelector;